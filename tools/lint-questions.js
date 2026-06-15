#!/usr/bin/env node
/*
 * tools/lint-questions.js — Linter de conventions pour assets/data/questions.json
 * Plateforme HEC (Histoire et éducation à la citoyenneté).
 *
 * Usage :
 *   node tools/lint-questions.js [chemin/vers/questions.json]
 *
 * Le linter distingue :
 *   - ERREURS       : violations structurelles → code de sortie 1 (fait échouer le commit/CI).
 *   - AVERTISSEMENTS: écarts de qualité ou de style → n'échouent pas (code 0), mais signalés.
 *   - INFO          : métriques de cohérence (apostrophes, libellés de sources, etc.).
 *
 * Aucune dépendance externe (fs/path natifs). Calibré sur les conventions RÉELLES
 * du corpus HEC : apostrophe droite ('), guillemets français (« »), virgule décimale.
 * Pour faire respecter l'apostrophe COURBE (convention HQC), voir APOSTROPHE_CIBLE.
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ----------------------------------------------------------------------------
// Conventions
// ----------------------------------------------------------------------------
const CANON_PREFIXES = ['Source du texte : ', "Source de l'image : ", 'Source des données : '];
const LAYOUTS = ['text-only', 'image-only', 'text-image'];

// 'auto'   : signale le style minoritaire d'apostrophe (cohérence interne).
// 'droite' : exige l'apostrophe droite ('), signale les courbes (’).
// 'courbe' : exige l'apostrophe courbe (’), signale les droites (') — convention HQC.
const APOSTROPHE_CIBLE = 'auto';

const MAX_LISTE = 25; // nb max d'exemples affichés par type d'avertissement

// ----------------------------------------------------------------------------
// Collecte des problèmes
// ----------------------------------------------------------------------------
const errors = [];
const warns = [];
const info = [];
const e = (code, where, msg) => errors.push({ code, where, msg });
const w = (code, where, msg) => warns.push({ code, where, msg });

// Champs de PROSE française à analyser pour le style (hors sources, ids, urls).
function* proseStrings(q) {
  const qb = q.questionBody || {};
  if (typeof qb.prompt === 'string') yield ['prompt', q.id, qb.prompt];
  for (const b of qb.bullets || []) if (typeof b === 'string') yield ['bullet', q.id, b];
  for (const ins of qb.instructions || []) if (ins && typeof ins.text === 'string') yield ['instruction', q.id, ins.text];
  for (const d of q.documents || []) {
    if (typeof d.text === 'string' && d.text) yield ['text', d.id, d.text];
    if (typeof d.title === 'string') yield ['title', d.id, d.title];
  }
}

// ----------------------------------------------------------------------------
// Programme principal
// ----------------------------------------------------------------------------
function main() {
  const file = process.argv[2] || path.join(__dirname, '..', 'assets', 'data', 'questions.json');
  let raw, data;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (err) {
    console.error(`✗ Impossible de lire le fichier : ${file}\n  ${err.message}`);
    process.exit(2);
  }
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`✗ JSON invalide : ${err.message}`);
    process.exit(2);
  }
  if (!data || !Array.isArray(data.questions)) {
    console.error('✗ Racine invalide : clé « questions » (tableau) attendue.');
    process.exit(2);
  }

  const questions = data.questions;
  const repoRoot = path.resolve(path.dirname(file), '..', '..');
  const imgDir = path.join(repoRoot, 'assets', 'img');
  const checkImages = fs.existsSync(imgDir);

  const seenQ = new Map();
  let nDocs = 0, nSources = 0;
  let apoDroite = 0, apoCourbe = 0;

  for (const q of questions) {
    const qid = q.id || '(sans id)';

    // --- Question : champs requis & unicité ---
    if (typeof q.id !== 'string' || !q.id) e('E-QID', qid, 'identifiant de question manquant ou vide');
    else if (seenQ.has(q.id)) e('E-QDUP', qid, `identifiant de question dupliqué (déjà vu pour « ${seenQ.get(q.id)} »)`);
    else seenQ.set(q.id, q.operation || '?');

    if (!q.questionBody || typeof q.questionBody !== 'object') e('E-QBODY', qid, 'questionBody manquant');
    if (!Array.isArray(q.documents)) { e('E-QDOCS', qid, 'champ « documents » manquant ou non-tableau'); continue; }

    // --- Documents ---
    const seenD = new Set();
    for (const d of q.documents) {
      nDocs++;
      const did = d.id || '(sans id)';
      const where = `${qid} / ${did}`;

      if (typeof d.id !== 'string' || !d.id) e('E-DID', where, 'identifiant de document manquant');
      else if (seenD.has(d.id)) e('E-DDUP', where, 'identifiant de document dupliqué dans la même question');
      else seenD.add(d.id);

      if (typeof d.title !== 'string' || !d.title) e('E-DTITLE', where, 'titre de document manquant');
      if (!LAYOUTS.includes(d.layout)) e('E-LAYOUT', where, `layout invalide : ${JSON.stringify(d.layout)} (attendu : ${LAYOUTS.join(' | ')})`);

      // Cohérence layout ↔ contenu
      const hasText = typeof d.text === 'string' && d.text.trim().length > 0;
      const hasImg = typeof d.imageUrl === 'string' && d.imageUrl.trim().length > 0;
      if (d.layout === 'text-only' && (!hasText || hasImg)) e('E-LAYTXT', where, 'text-only doit avoir du texte et aucune image');
      if (d.layout === 'image-only' && (!hasImg || hasText)) e('E-LAYIMG', where, 'image-only doit avoir une image et aucun texte');
      if (d.layout === 'text-image' && (!hasText || !hasImg)) e('E-LAYBOTH', where, 'text-image doit avoir à la fois du texte et une image');

      // Image existante sur disque (avertissement)
      if (checkImages && hasImg) {
        const p = path.join(repoRoot, d.imageUrl);
        if (!fs.existsSync(p)) w('W-IMG', where, `image introuvable : ${d.imageUrl}`);
      }

      // --- Sources ---
      const srcs = d.sources;
      if (!Array.isArray(srcs) || srcs.length === 0) { e('E-SRCEMPTY', where, 'aucune source'); continue; }
      let hasTxtSrc = false, hasImgSrc = false;
      for (const s of srcs) {
        nSources++;
        if (typeof s !== 'string' || !s.trim()) { e('E-SRCSTR', where, 'source vide ou non-textuelle'); continue; }
        const prefix = CANON_PREFIXES.find(p => s.startsWith(p));
        if (!prefix) e('E-SRCPREFIX', where, `libellé non canonique : ${JSON.stringify(s.slice(0, 40))}…`);
        if (s.startsWith('Source du texte : ')) hasTxtSrc = true;
        if (s.startsWith("Source de l'image : ")) hasImgSrc = true;
      }
      // Complétude des crédits pour les documents mixtes
      if (d.layout === 'text-image' && !hasTxtSrc) w('W-NOTXTSRC', where, 'text-image sans « Source du texte » (texte non crédité)');
      if (d.layout === 'text-image' && !hasImgSrc) w('W-NOIMGSRC', where, 'text-image sans « Source de l\'image »');
    }

    // --- Style de la prose ---
    for (const [field, owner, str] of proseStrings(q)) {
      apoDroite += (str.match(/'/g) || []).length;
      apoCourbe += (str.match(/\u2019/g) || []).length;
      if (str.includes('"')) w('W-GUILL', `${qid} (${field})`, 'guillemets droits " — utiliser « »');
      const dec = str.match(/\d+\.\d+\s*(?:%|millions?|milliards?|habitants?|km|°C?)/);
      if (dec) w('W-DECIMALE', `${qid} (${field})`, `point décimal au lieu d'une virgule : « ${dec[0]} »`);
    }
  }

  // Apostrophes : déterminer la cible et signaler les écarts
  const dominante = apoDroite >= apoCourbe ? 'droite' : 'courbe';
  const cible = APOSTROPHE_CIBLE === 'auto' ? dominante : APOSTROPHE_CIBLE;
  const mauvaiseApo = cible === 'droite' ? '\u2019' : "'";
  const labelMauvaise = cible === 'droite' ? 'courbe (’)' : "droite (')";
  for (const q of questions) {
    for (const [field, owner, str] of proseStrings(q)) {
      if (str.includes(mauvaiseApo)) {
        const n = (str.match(new RegExp(mauvaiseApo === "'" ? "'" : '\\u2019', 'g')) || []).length;
        w('W-APOS', `${q.id} (${field})`, `apostrophe ${labelMauvaise} ×${n} — cible : ${cible}`);
      }
    }
  }

  // --------------------------------------------------------------------------
  // Rapport
  // --------------------------------------------------------------------------
  const report = (title, items) => {
    console.log(`\n${title} (${items.length})`);
    const byCode = {};
    for (const it of items) (byCode[it.code] ||= []).push(it);
    for (const code of Object.keys(byCode).sort()) {
      const list = byCode[code];
      const shown = list.slice(0, MAX_LISTE);
      for (const it of shown) console.log(`  [${it.code}] ${it.where} : ${it.msg}`);
      if (list.length > shown.length) console.log(`  … +${list.length - shown.length} autre(s) [${code}]`);
    }
  };

  console.log('Linter — questions.json (HEC)');
  console.log(`Fichier : ${file}`);
  console.log(`${questions.length} questions · ${nDocs} documents · ${nSources} sources`);

  if (errors.length) report('❌ ERREURS', errors); else console.log('\n❌ ERREURS (0)');
  if (warns.length) report('⚠️  AVERTISSEMENTS', warns); else console.log('\n⚠️  AVERTISSEMENTS (0)');

  console.log('\nℹ️  INFO');
  console.log(`  Apostrophes (prose) : ${apoDroite} droites / ${apoCourbe} courbes — dominante : ${dominante}, cible : ${cible}`);
  console.log(`  Vérification des images sur disque : ${checkImages ? 'activée' : 'désactivée (assets/img absent)'}`);

  if (errors.length) {
    console.log(`\n✗ ${errors.length} erreur(s). Le fichier ne respecte pas toutes les conventions.`);
    process.exit(1);
  }
  console.log(`\n✓ Aucune erreur structurelle.${warns.length ? ` (${warns.length} avertissement(s) à examiner)` : ''}`);
  process.exit(0);
}

main();
