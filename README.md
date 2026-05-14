# HEC · Premier cycle — Composition de cahier (v2.3)

Outil web pour composer un cahier d'élève à la pièce — sortie en `.docx` éditable.

## ✨ Quoi de neuf (v2.3)

- 🌍 **Nouvelle réalité sociale** : *L'expansion européenne dans le monde* (Secondaire 2) avec 35 questions atomiques couvrant les 8 opérations intellectuelles.
- 📚 **Catalogue total** : 70 questions réparties sur 2 réalités sociales (Le renouvellement de la vision de l'Homme + L'expansion européenne dans le monde).

## ✨ Quoi de neuf (v2.2)

- 🎯 **Carte du catalogue refondue** : niveau (Secondaire X), opération intellectuelle, numéro, réalité sociale et points par question affichés en étiquettes. La question elle-même est mise en avant comme texte principal.
- 🖱 **Sélection en un clic** : un seul clic sur la carte ajoute toute la question au cahier (plus de sous-cases à cocher).
- 🧮 **Compteur de points** dans le panneau « Cahier en construction » qui s'actualise en temps réel selon les questions ajoutées.
- 👁 **Prévisualisation authentique** : remplace mammoth.js par [docx-preview](https://github.com/VolodymyrBaydalka/docxjs) qui rend le .docx avec ses bordures, couleurs et mises en page exactes (le « vrai » rendu du fichier téléchargeable).
- 📚 **Deuxième question câblée** (Établir des liens de causalité #2 sur le Concile de Trente et la contre-réforme) — permet de tester le rendu multi-questions.
- 🎓 **Niveaux Secondaire 1 à 4** dans le filtre (extensible aux deuxièmes cycle pour plus tard).

## 📐 Format du cahier généré

- Pas d'en-tête sur les pages
- Titre par question : « Établir des liens de causalité  #1 » avec trait d'accent burgundy
- Espace de réponse textuelle : 8 lignes continues gris fin
- Réglette : tableau d'évaluation
- Documents : encadrés alignés à gauche, ajustés à leur contenu, ne se coupent jamais entre deux pages

## 📁 Structure du projet

```
v2/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── data.js          # Pièces atomiques composables
│   │   └── app.js           # Logique + générateur .docx + prévisualisation
│   └── img/
│       ├── q1/              # Images de la question 1
│       └── q2/              # Images de la question 2
├── .nojekyll
└── README.md
```

## 🚀 Test local

```bash
cd v2
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

## 🌐 Déploiement sur GitHub Pages

1. Supprime tout le contenu actuel de ton dépôt
2. Dézippe l'archive et **entre dans le dossier `v2/`**
3. Sélectionne TOUT son contenu (pas le dossier `v2/` lui-même)
4. Sur GitHub : « Add file → Upload files » → glisse ta sélection → Commit
5. Settings → Pages → branche `main` / `(root)` → Save

## 🛠️ Technologies

- HTML/CSS/JS pur (aucun framework)
- [SortableJS](https://github.com/SortableJS/Sortable) — glisser-déposer
- [docx-js](https://docx.js.org/) — génération .docx côté client
- [docx-preview](https://github.com/VolodymyrBaydalka/docxjs) + [JSZip](https://stuk.github.io/jszip/) — rendu fidèle du .docx pour la prévisualisation
- Hébergement statique sur GitHub Pages

## ⏳ Statut

Questions #1 et #2 entièrement câblées. Les 17 autres seront ajoutées au fichier `data.js` une fois ce comportement final approuvé.


