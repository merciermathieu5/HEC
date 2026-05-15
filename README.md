# HEC · Premier cycle — Composition de cahier (v2.8)

Outil web pour composer un cahier d'élève à la pièce — sortie en `.docx` éditable.

## ✨ Quoi de neuf (v2.8)

- 🌾 **Nouvelle réalité sociale (Secondaire 1)** : *La sédentarisation* avec 35 questions atomiques couvrant les 8 opérations intellectuelles. **Deuxième ajout de niveau 1** dans l'app, aux côtés de la christianisation de l'Occident. Couvre la révolution néolithique : Croissant fertile, irrigation, premiers villages, agriculture et élevage, poterie, sépultures, Çatal Höyük.
- 📚 **Catalogue total** : 246 questions réparties sur 7 réalités sociales (Le renouvellement de la vision de l'Homme + L'expansion européenne dans le monde + La Révolution américaine + La christianisation de l'Occident + L'industrialisation + L'expansion du monde industriel + La sédentarisation).
- 🟠 Couleur **sienne brûlée** dédiée pour la 7ᵉ réalité — teinte argile/terre cuite évocatrice du Néolithique, en cohérence avec la palette de design (vert / terre cuite / pourpre / ocre / bleu ardoise / bordeaux / sienne).

## ✨ Quoi de neuf (v2.7)

- 🌍 **Nouvelle réalité sociale (Secondaire 2)** : *L'expansion du monde industriel* avec 35 questions atomiques couvrant les 8 opérations intellectuelles. Pendant impérial et colonial de l'industrialisation : Conférence de Berlin, partage de l'Afrique, canal de Suez, génocide des Herero, exploitation du caoutchouc au Congo belge.
- 📚 **Catalogue total** : 211 questions réparties sur 6 réalités sociales (Le renouvellement de la vision de l'Homme + L'expansion européenne dans le monde + La Révolution américaine + La christianisation de l'Occident + L'industrialisation + L'expansion du monde industriel).
- 🟥 Couleur bordeaux profond dédiée pour la 6ᵉ réalité, en cohérence avec la palette de design (vert / terre cuite / pourpre / ocre / bleu ardoise / bordeaux).

## ✨ Quoi de neuf (v2.6)

- 🏭 **Nouvelle réalité sociale (Secondaire 2)** : *L'industrialisation* avec 35 questions atomiques couvrant les 8 opérations intellectuelles. C'est la 4ᵉ réalité du programme Secondaire 2 — pendant économique et social aux trois précédentes.
- 📚 **Catalogue total** : 176 questions réparties sur 5 réalités sociales (Le renouvellement de la vision de l'Homme + L'expansion européenne dans le monde + La Révolution américaine + La christianisation de l'Occident + L'industrialisation).
- 🔵 Couleur bleu ardoise dédiée pour la 5ᵉ réalité, en cohérence avec la palette de design (vert / terre cuite / pourpre / ocre / bleu ardoise).

## ✨ Quoi de neuf (v2.5)

- ⛪ **Nouvelle réalité sociale (Secondaire 1)** : *La christianisation de l'Occident* avec 36 questions atomiques couvrant les 8 opérations intellectuelles. **Premier ajout de niveau 1** dans l'app.
- 📚 **Catalogue total** : 141 questions réparties sur 4 réalités sociales (Le renouvellement de la vision de l'Homme + L'expansion européenne dans le monde + La Révolution américaine + La christianisation de l'Occident).
- 🟫 Couleur ocre doré dédiée pour la 4e réalité, en cohérence avec la palette de design (vert / terre cuite / pourpre / ocre).

## ✨ Quoi de neuf (v2.4)

- 🇺🇸 **Nouvelle réalité sociale** : *La Révolution américaine* (Secondaire 2) avec 35 questions atomiques couvrant les 8 opérations intellectuelles.
- 📚 **Catalogue total** : 105 questions réparties sur 3 réalités sociales (Le renouvellement de la vision de l'Homme + L'expansion européenne dans le monde + La Révolution américaine).
- 🟣 Couleur pourpre dédiée pour la 3e réalité, en cohérence avec la palette de design (vert / terre cuite / pourpre).

## ✨ Quoi de neuf (v2.3)

- 🌍 **Nouvelle réalité sociale** : *L'expansion européenne dans le monde* (Secondaire 2) avec 35 questions atomiques couvrant les 8 opérations intellectuelles.
- 📚 **Catalogue v2.3** : 70 questions réparties sur 2 réalités sociales (Le renouvellement de la vision de l'Homme + L'expansion européenne dans le monde).

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


