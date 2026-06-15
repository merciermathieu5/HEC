# tools/ — Outils de validation

## lint-questions.js

Linter de conventions pour `assets/data/questions.json` (la source unique des questions).

### Exécution

```bash
node tools/lint-questions.js
# ou en ciblant un fichier précis :
node tools/lint-questions.js assets/data/questions.json
```

Code de sortie : **1** s'il y a au moins une erreur, **0** sinon. Idéal comme garde-fou
avant un commit ou dans une étape de CI (les avertissements n'échouent pas le build).

### Ce qui est vérifié

**Erreurs (font échouer le linter)**

- `E-QID` / `E-QDUP` — identifiant de question manquant ou dupliqué
- `E-QBODY` / `E-QDOCS` — `questionBody` ou `documents` manquant
- `E-DID` / `E-DDUP` / `E-DTITLE` — id de document manquant/dupliqué, titre manquant
- `E-LAYOUT` — `layout` hors de { `text-only`, `image-only`, `text-image` }
- `E-LAYTXT` / `E-LAYIMG` / `E-LAYBOTH` — incohérence entre `layout` et le contenu réel
  (texte/image présents ou non)
- `E-SRCEMPTY` / `E-SRCSTR` — document sans source, ou source vide
- `E-SRCPREFIX` — libellé de source non canonique. Les trois seuls préfixes admis :
  `Source du texte : `, `Source de l'image : `, `Source des données : `

**Avertissements (signalés, sans échec)**

- `W-NOTXTSRC` / `W-NOIMGSRC` — document `text-image` dont le texte ou l'image n'est pas crédité
- `W-IMG` — `imageUrl` introuvable sur le disque (vérifié seulement si `assets/img` existe)
- `W-GUILL` — guillemets droits `"` dans la prose (préférer « »)
- `W-APOS` — apostrophe du style minoritaire dans la prose (cohérence interne)
- `W-DECIMALE` — point décimal suivi d'une unité (préférer la virgule)

**Info** — métriques de cohérence (répartition des apostrophes, état de la vérification des images).

### Réglage de l'apostrophe

Le corpus HEC utilise massivement l'apostrophe **droite** (`'`). Par défaut le linter est en
mode `auto` : il signale simplement le style minoritaire pour garder le corpus cohérent.
Pour imposer une direction (par ex. migrer vers l'apostrophe **courbe** `’`, comme dans HQC),
modifier la constante `APOSTROPHE_CIBLE` en tête du script :

```js
const APOSTROPHE_CIBLE = 'auto';   // 'auto' | 'droite' | 'courbe'
```
