/* ============================================================
   HEC · Premier cycle — Métadonnées du programme
   ------------------------------------------------------------
   SOURCE UNIQUE DES QUESTIONS : assets/data/questions.json
   (format CMS, converti au chargement par cms-adapter.js).
   Ce fichier ne contient plus que les métadonnées stables du
   programme : réalités sociales (PFEQ) et opérations
   intellectuelles. Le tableau questions est volontairement
   vide — app.js le remplit depuis le JSON au démarrage.
   NB : l'ordre du tableau realites_sociales détermine les
   indices de couleur CSS (data-realite-idx) — ne pas réordonner.
   ============================================================ */

window.DATA = {

  realites_sociales: [
    { id: "renouvellement-vision-homme", titre: "Le renouvellement de la vision de l'Homme", niveau: 2 },
    { id: "expansion-europeenne", titre: "L'expansion européenne dans le monde", niveau: 2 },
    { id: "revolution-americaine", titre: "La Révolution américaine", niveau: 2 },
    { id: "sedentarisation", titre: "La sédentarisation", niveau: 1 },
    { id: "emergence-civilisation", titre: "L'émergence d'une civilisation", niveau: 1 },
    { id: "premiere-experience-democratie", titre: "Une première expérience de démocratie", niveau: 1 },
    { id: "romanisation", titre: "La romanisation", niveau: 1 },
    { id: "christianisation-occident", titre: "La christianisation de l'Occident", niveau: 1 },
    { id: "industrialisation", titre: "L'industrialisation", niveau: 2 },
    { id: "expansion-monde-industriel", titre: "L'expansion du monde industriel", niveau: 2 },
    { id: "reconnaissance-libertes-droits-civils", titre: "La reconnaissance des libertés et des droits civils", niveau: 2 },
    { id: "essor-urbain-commercial", titre: "L'essor urbain et commercial", niveau: 1 }
  ],

  operations_intellectuelles: [
    "Établir des faits",
    "Situer dans l'espace",
    "Situer dans le temps",
    "Établir des liens de causalité",
    "Mettre en relation des faits",
    "Déterminer des causes et des conséquences",
    "Dégager des différences et des similitudes",
    "Déterminer des changements et des continuités"
  ],

  questions: []
};
