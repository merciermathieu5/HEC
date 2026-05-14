/* ============================================================
   HEC · Premier cycle — Données complètes (35 questions)
   Réalité sociale : Le renouvellement de la vision de l'Homme
   Niveau : Secondaire 2
   ============================================================ */

(function () {

// ============ Réglettes-types factorisées ============
const RUBRIC_CAUSALITE_3PT = {
  type: "complex",
  rows: [
    { precise: "L'élève précise les trois éléments", condition: "et établit correctement deux liens de causalité.", points: "3 points" },
    { precise: null, condition: "et établit correctement un lien de causalité.", points: "2 points" },
    { precise: null, condition: "mais n'établit correctement aucun lien de causalité.", points: "1 point" },
    { precise: "L'élève précise deux éléments", condition: "et établit correctement un lien de causalité.", points: "2 points" },
    { precise: null, condition: "mais n'établit correctement aucun lien de causalité.", points: "1 point" },
    { precise: "L'élève précise un seul élément ou n'en précise pas.", condition: null, points: "0 point" }
  ]
};

function rubric3(opLabel, c2, c1, c0) {
  return { type: "simple", opLabel, maxPoints: 2,
    levels: [{ points: "2 points", condition: c2 }, { points: "1 point", condition: c1 }, { points: "0 point", condition: c0 }] };
}
function rubric2(opLabel, c1, c0) {
  return { type: "simple", opLabel, maxPoints: 1,
    levels: [{ points: "1 point", condition: c1 }, { points: "0 point", condition: c0 }] };
}

// Réglettes courantes
const R_FAITS_2PT_3 = rubric3("Établir des faits", "L'élève établit correctement les faits. (2 sur 2)", "L'élève établit partiellement les faits. (1 sur 2)", "L'élève n'établit pas les faits. (0 sur 2)");
const R_FAITS_2PT_3SUR3 = rubric3("Établir des faits", "L'élève établit correctement les faits. (3 sur 3)", "L'élève établit plus ou moins correctement les faits. (1 ou 2 sur 3)", "L'élève établit incorrectement les faits ou ne l'établit pas. (0 sur 3)");
const R_FAITS_1PT = rubric2("Établir des faits", "L'élève établit correctement le fait.", "L'élève établit incorrectement le fait ou ne l'établit pas.");
const R_FAITS_2PT_GEN = rubric3("Établir des faits", "L'élève établit correctement le fait.", "L'élève établit plus ou moins correctement le fait.", "L'élève établit incorrectement le fait ou ne l'établit pas.");
const R_SITUER_2PT_4 = rubric3("Situer dans le temps et dans l'espace", "L'élève situe tous les faits dans l'espace. (4 sur 4)", "L'élève situe certains faits dans l'espace. (2 ou 3 sur 4)", "L'élève ne situe pas les faits dans l'espace. (0 ou 1 sur 4)");
const R_SITUER_1PT_2 = rubric2("Situer dans le temps et dans l'espace", "L'élève situe tous les faits dans l'espace. (2 sur 2)", "L'élève ne situe pas les faits dans l'espace. (0 sur 2)");
const R_SITUER_2PT_2 = rubric3("Situer dans le temps et dans l'espace", "L'élève situe tous les faits dans l'espace. (2 sur 2)", "L'élève situe certains faits dans l'espace. (1 sur 2)", "L'élève ne situe pas les faits dans l'espace. (0 sur 2)");
const R_SITUER_3PT_GVILLES = { type: "simple", opLabel: "Situer dans le temps et dans l'espace", maxPoints: 3,
  levels: [
    { points: "3 points", condition: "L'élève situe tous les faits dans l'espace. (6 sur 6)" },
    { points: "2 points", condition: "L'élève situe certains faits dans l'espace. (4 ou 5 sur 6)" },
    { points: "1 point", condition: "L'élève situe certains faits dans l'espace. (2 ou 3 sur 6)" },
    { points: "0 point", condition: "L'élève ne situe pas les faits dans l'espace. (0 ou 1 sur 6)" }
  ]};
const R_SITUER_1PT_1 = rubric2("Situer dans le temps et dans l'espace", "L'élève situe le fait dans le temps. (1 sur 1)", "L'élève ne situe pas le fait dans le temps. (0 sur 1)");
const R_SITUER_1PT_T2 = rubric2("Situer dans le temps et dans l'espace", "L'élève situe tous les faits dans le temps. (2 sur 2)", "L'élève ne situe pas les faits dans l'espace. (0 sur 2)");
const R_SITUER_2PT_T3 = rubric3("Situer dans le temps et dans l'espace", "L'élève situe tous les faits dans le temps. (3 sur 3)", "L'élève situe certains faits dans le temps. (1 ou 2 sur 3)", "L'élève ne situe pas les faits dans le temps. (0 sur 3)");
const R_SITUER_1PT_T1 = rubric2("Situer dans le temps et dans l'espace", "L'élève situe le fait dans le temps.", "L'élève ne situe pas le fait dans l'espace.");
const R_RELATION_2PT_3 = rubric3("Mettre en relation des faits", "L'élève met en relation tous les faits. (3 sur 3)", "L'élève met en relation certains faits. (1 ou 2 sur 3)", "L'élève ne met pas en relation les faits. (0 sur 3)");
const R_RELATION_1PT = rubric2("Mettre en relation des faits", "L'élève met en relation le fait. (1 sur 1)", "L'élève ne met pas en relation le fait. (0 sur 1)");
const R_RELATION_2PT_2 = rubric3("Mettre en relation des faits", "L'élève met en relation tous les faits. (2 sur 2)", "L'élève met en relation certains faits. (1 sur 2)", "L'élève ne met pas en relation les faits. (0 sur 2)");
const R_CAUSES_2PT_CAUSE_CONS = rubric3("Déterminer des causes et des conséquences", "L'élève détermine correctement la cause et la conséquence.", "L'élève détermine la cause ou la conséquence.", "L'élève ne détermine ni la cause ni la conséquence.");
const R_CAUSES_2PT_CONSEQ = rubric3("Déterminer des causes et des conséquences", "L'élève détermine correctement la conséquence.", "L'élève détermine plus ou moins correctement la conséquence.", "L'élève détermine incorrectement la conséquence ou ne la détermine pas.");
const R_CAUSES_2PT_CAUSE = rubric3("Déterminer des causes et des conséquences", "L'élève détermine correctement la cause.", "L'élève détermine plus ou moins correctement la cause.", "L'élève détermine incorrectement la cause ou ne la détermine pas.");
const R_DIFFERENCES_2PT = rubric3("Dégager des différences et des similitudes", "L'élève dégage correctement la différence.", "L'élève dégage plus ou moins correctement la différence.", "L'élève dégage incorrectement la différence.");
const R_SIMILITUDES_2PT = rubric3("Dégager des différences et des similitudes", "L'élève dégage correctement la similitude.", "L'élève dégage plus ou moins correctement la similitude.", "L'élève ne dégage pas la similitude.");
const R_DIFFERENCES_4PT = { type: "simple", opLabel: "Dégager des différences et des similitudes", maxPoints: 4,
  levels: [
    { points: "4 points", condition: "L'élève dégage correctement les différences." },
    { points: "2 points", condition: "L'élève dégage plus ou moins correctement les différences ou les dégage partiellement (1 sur 2)" },
    { points: "0 point", condition: "L'élève ne dégage pas les différences." }
  ]};
const R_DIFFERENCES_2PT_GEN = rubric3("Dégager des différences et des similitudes", "L'élève dégage correctement la différence.", "L'élève dégage plus ou moins correctement la différence.", "L'élève ne dégage pas la différence.");
const R_CHGT_2PT_CHGT = rubric3("Déterminer des changements et des continuités", "L'élève détermine correctement le changement.", "L'élève détermine plus ou moins correctement le changement.", "L'élève ne détermine pas le changement.");
const R_CHGT_2PT_CONT = rubric3("Déterminer des changements et des continuités", "L'élève détermine correctement la continuité.", "L'élève détermine plus ou moins correctement la continuité.", "L'élève ne détermine pas la continuité.");
const R_CHGT_1PT_CONT = rubric2("Déterminer des changements et des continuités", "L'élève détermine correctement la continuité.", "L'élève ne détermine pas la continuité.");

const CAUSALITE_INSTRUCTIONS = {
  parts: [
    { text: "Fais des phrases complètes et utilise des marqueurs de relation de " },
    { text: "but", bold: true }, { text: ", de " },
    { text: "cause", bold: true }, { text: ", de " },
    { text: "conséquence", bold: true }, { text: " ou d'" },
    { text: "explication", bold: true },
    { text: " afin d'établir les liens entre les éléments." }
  ]
};

// ============ Documents partagés par section ============
const DOCS = {
  'causalite-1': [
    { id: "c1-d1", title: "Document 1 : Les 95 thèses", layout: "text-image",
      text: "Les 95 thèses de Martin Luther, critiquant notamment la vente d'indulgences par l'Église catholique, sont imprimées à plus de 300 000 exemplaires entre 1517 et 1520 grâce aux nouveaux procédés d'impression de Gutenberg. Les 95 thèses seront la base du protestantisme en Europe, mais également le début d'une vague de contestation de l'Église catholique romaine.",
      imageUrl: "assets/img/causalite-1/img000.png", imageWidthCm: 3.5,
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social.", "Source de l'image : Lucas Cranach the Elder, Martin Luther, 1528 (Veste Coburg), Wikimedia Commons, Domaine public."] },
    { id: "c1-d2", title: "Document 2 : Les indulgences", layout: "image-only",
      imageUrl: "assets/img/causalite-1/img001.png", imageWidthCm: 7,
      sources: ["Source de l'image : Lucas Cranach l'Ancien, L'Antéchrist, Wikimedia Commons. Domaine public."] },
    { id: "c1-d3", title: "Document 3 : Le protestantisme", layout: "text-only",
      text: "Le protestantisme gagne en importance dans le Saint-Empire romain germanique, en France et en Angleterre, favorisant l'apparition des Églises protestantes (luthérienne, presbytérienne, anglicane et calviniste).",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'causalite-2': [
    { id: "c2-d1", title: "Document 1 : Le Concile de Trente", layout: "image-only",
      imageUrl: "assets/img/causalite-2/img000.png", imageWidthCm: 9,
      sources: ["Source de l'image : Laurom, Une session du concile, musée du château du Bon-Conseil, Trente, Wikimedia Commons. CC BY-SA 3.0."] },
    { id: "c2-d2", title: "Document 2 : La contre-réforme", layout: "text-only",
      text: "Le Concile a souligné l'importance de l'éducation et de la formation du clergé, en exigeant la création de séminaires pour former les futurs prêtres et améliorer leur pratique. Afin de contrôler la diffusion des idées hérétiques, l'Église a établi l'Index librorum prohibitorum, une liste de livres interdits aux catholiques. Cette mesure visait à empêcher la lecture de textes jugés contraires à la foi et à la morale catholique.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "c2-d3", title: "Document 3 : Le protestantisme", layout: "text-only",
      text: "Le protestantisme gagne en importance dans le Saint-Empire romain germanique, en France et en Angleterre, favorisant l'apparition des Églises protestantes (luthérienne, presbytérienne, anglicane et calviniste).",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'causalite-3': [
    { id: "c3-d1", title: "Document 1 : Un atelier d'impression", layout: "image-only",
      imageUrl: "assets/img/causalite-3/img000.png", imageWidthCm: 9,
      sources: ["Source de l'image : Jan van der Straet, Gravure d'un atelier d'impression au XVIe siècle, Musée Plantin-Moretus, Wikimedia Commons."] },
    { id: "c3-d2", title: "Document 2 : La production de livres", layout: "text-only",
      text: "« Les chiffres de tirage vont de 500 à 1 000 exemplaires pour les ouvrages savants, 1 000 à 2 000 pour les livres d'intérêt général, plusieurs milliers pour les livres scolaires et surtout les livres d'heures (jusqu'à 10 000 exemplaires). [...] Dans l'atelier, le travail se fait en continu : les pressiers tirent 180 feuilles à l'heure, soit 1 300 à 1 500 feuilles imprimées recto et verso chaque jour. »",
      sources: ["Source : Jean Guillemain, Le marché européen, Bibliothèque nationale de France, en ligne, consulté le 21 août 2021."] },
    { id: "c3-d3", title: "Document 3 : Impact", layout: "text-only",
      text: "« [...] Une conséquence de la production massive de textes imprimés au cours du [16e siècle] fut de porter, en Europe, la proportion des lecteurs à 20% de la population adulte. Les Églises soutenaient cette évolution. Outre l'accès à la Bible [...], l'alphabétisation était en effet utile à la diffusion de la doctrine chrétienne, à la compréhension des textes de morale, au développement de la culture du peuple et à son éducation. »",
      sources: ["Source : Dictionnaire historique de la Suisse, Alphabétisation, en ligne, consulté le 21 août 2021."] }
  ],
  'faits-1': [
    { id: "f1-d1", title: "Document 1 : La naissance de Vénus", layout: "image-only",
      imageUrl: "assets/img/faits-1/img000.png", imageWidthCm: 11,
      sources: ["Source : Sandro Botticelli, La naissance de Vénus (vers 1485), Galerie des Offices, Florence, Wikimedia Commons. Domaine public."] },
    { id: "f1-d2", title: "Document 2 : Un nouveau modèle astronomique", layout: "text-image",
      text: "Ce modèle astronomique place le Soleil au centre de l'univers.",
      imageUrl: "assets/img/faits-1/img001.png", imageWidthCm: 6,
      sources: ["Source : Andreas Cellarius, Harmonia Macrocosmica (XVIIe siècle), Wikimedia Commons. Domaine public."] }
  ],
  'faits-2': [
    { id: "f2-d1", title: "Document 1 : Martin Luther", layout: "image-only",
      imageUrl: "assets/img/faits-2/img000.png", imageWidthCm: 5,
      sources: ["Source : Lucas Cranach l'Ancien, Martin Luther (1483-1546), Wikimedia Commons. Creative Commons."] },
    { id: "f2-d2", title: "Document 2 : Jean Calvin", layout: "image-only",
      imageUrl: "assets/img/faits-2/img001.png", imageWidthCm: 5,
      sources: ["Source : Auteur inconnu, Jean Calvin, Wikimedia Commons. Domaine public."] },
    { id: "f2-d3", title: "Document 3 : Henri VIII", layout: "image-only",
      imageUrl: "assets/img/faits-2/img002.png", imageWidthCm: 5,
      sources: ["Source : Hans Holbein le Jeune, Portrait du roi Henri VIII (1538), Wikimedia Commons. Domaine public."] },
    { id: "f2-d4", title: "Document 4 : La basilique Saint-Pierre", layout: "text-image",
      text: "La basilique Saint-Pierre possède de nombreuses colonnes ainsi qu'un dôme et un fronton central. Ces éléments architecturaux proviennent de la Grèce et de la Rome antique.",
      imageUrl: "assets/img/faits-2/img003.png", imageWidthCm: 6,
      sources: ["Source : Alvesgaspar, Vue de la basilique Saint-Pierre, Wikimedia Commons. CC BY-SA 4.0."] }
  ],
  'faits-3': [
    { id: "f3-d1", title: "Document 1 : De nouvelles connaissances", layout: "text-image",
      text: "Malgré l'opposition des autorités religieuses et les superstitions répandues, certains progrès sont réalisés. « [...] fait quelques progrès, particulièrement grâce à André Vésale (1514-1564), le plus grand anatomiste de son temps, qui n'hésite pas à disséquer des cadavres devant ses étudiants à l'université de Bologne et publie en 1543 une œuvre monumentale en sept volumes abondamment illustrés [...] »",
      imageUrl: "assets/img/faits-3/img000.png", imageWidthCm: 4,
      sources: ["Source du texte : G. Langlois et G. Villemure, Histoire de la civilisation occidentale, 5e éd., Beauchemin, 2012, p. 124.", "Source de l'image : Jan van Calcar, André Vésale, Wikimedia Commons. Domaine public."] },
    { id: "f3-d2", title: "Document 2 : La famille Médicis", layout: "text-only",
      text: "Plusieurs hommes influents ont subventionné des artistes de la Renaissance et agrémenter leur cité, principauté ou royaume. Cosme de Médicis, banquier florentin, a commandé de nombreuses œuvres d'art, notamment le David de Donatello. Son petit-fils, Laurent de Médicis, est également devenu le mécène de plusieurs artistes de la Renaissance, dont Le Verrocchio, Léonard de Vinci, Sandro Botticelli et Michel-Ange. Laurent de Médicis était aussi le dirigeant de la cité de Florence où il régnait sans partage.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'espace-1': [
    { id: "e1-d1", title: "Document 1 : L'Europe vers 1600", layout: "image-only",
      imageUrl: "assets/img/espace-1/img000.png", imageWidthCm: 12,
      sources: ["Source : Alain Houot."] },
    { id: "e1-d2", title: "Document 2 : Les foyers de diffusion de la Renaissance et de l'imprimerie", layout: "image-only",
      imageUrl: "assets/img/espace-1/img001.png", imageWidthCm: 12,
      sources: ["Source : D-Maps."] }
  ],
  'espace-2': [
    { id: "e2-d1", title: "Document 1 : Les grandes villes d'Europe vers 1600", layout: "image-only",
      imageUrl: "assets/img/espace-2/img000.png", imageWidthCm: 12,
      sources: ["Source : D-Maps."] },
    { id: "e2-d2", title: "Document 2 : L'émergence des religions protestantes", layout: "image-only",
      imageUrl: "assets/img/espace-2/img001.png", imageWidthCm: 12,
      sources: ["Source : Alain Houot."] }
  ],
  'temps-1': [
    { id: "t1-d1", title: "Document 1 : Ligne du temps", layout: "image-only",
      imageUrl: "assets/img/temps-1/img000.png", imageWidthCm: 12,
      sources: ["Source : Mathieu Mercier."] },
    { id: "t1-d2", title: "Document 2 : La contre-réforme", layout: "text-only",
      text: "Le Concile a souligné l'importance de l'éducation et de la formation du clergé, en exigeant la création de séminaires pour former les futurs prêtres et améliorer leur pratique. Afin de contrôler la diffusion des idées hérétiques, l'Église a établi l'Index librorum prohibitorum, une liste de livres interdits aux catholiques.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "t1-d3", title: "Document 3 : Les indulgences", layout: "image-only",
      imageUrl: "assets/img/temps-1/img002.png", imageWidthCm: 7,
      sources: ["Source : Lucas Cranach l'Ancien, L'Antéchrist, Wikimedia Commons. Domaine public."] }
  ],
  'temps-2': [
    { id: "t2-d1", title: "Document 1 : Les 95 thèses", layout: "text-only",
      text: "Les 95 thèses de Martin Luther, critiquant notamment la vente d'indulgences par l'Église catholique, sont imprimées à plus de 300 000 exemplaires entre 1517 et 1520 grâce aux nouveaux procédés d'impression de Gutenberg.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "t2-d2", title: "Document 2 : Le protestantisme", layout: "text-only",
      text: "Le protestantisme gagne en importance dans le Saint-Empire romain germanique, en France et en Angleterre, favorisant l'apparition des Églises protestantes (luthérienne, presbytérienne, anglicane et calviniste).",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "t2-d3", title: "Document 3 : Un atelier d'impression", layout: "image-only",
      imageUrl: "assets/img/temps-2/img000.png", imageWidthCm: 9,
      sources: ["Source : Jan van der Straet, Atelier d'impression XVIe siècle, Musée Plantin-Moretus, Wikimedia Commons."] }
  ],
  'relation-1': [
    { id: "r1-d1", title: "Document 1 : La Joconde", layout: "image-only",
      imageUrl: "assets/img/relation-1/img000.png", imageWidthCm: 6,
      sources: ["Source : Léonard de Vinci, La Joconde, Wikimedia Commons. Domaine public."] },
    { id: "r1-d2", title: "Document 2 : Le fronton", layout: "text-image",
      text: "Le fronton est un élément [...] qui prend la forme d'un triangle isocèle et est généralement placé au-dessus de l'entrée d'un bâtiment ou d'une porte. Il est utilisé comme décoration ou pour soutenir la façade du bâtiment. Les frontons triangulaires sont étroitement associés à l'Antiquité grecque et romaine.",
      imageUrl: "assets/img/relation-1/img001.png", imageWidthCm: 5,
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social.", "Source de l'image : Shahee, Église de la Madeleine, Wikimedia Commons. CC BY-SA 2.5."] },
    { id: "r1-d3", title: "Document 3 : La dissection", layout: "text-only",
      text: "Malgré l'opposition des autorités religieuses et les superstitions répandues, certains progrès sont réalisés. « La médecine fait quelques progrès, particulièrement grâce à André Vésale (1514-1564), le plus grand anatomiste de son temps, qui n'hésite pas à disséquer des cadavres devant ses étudiants à l'université de Bologne et publie en 1543 une œuvre monumentale en sept volumes [...] »",
      sources: ["Source : G. Langlois et G. Villemure, Histoire de la civilisation occidentale, 5e éd., Beauchemin, 2012, p. 124."] }
  ],
  'relation-2': [
    { id: "r2-d1", title: "Document 1 : L'Index", layout: "text-only",
      text: "Afin de contrôler la diffusion des idées hérétiques, l'Église a établi l'Index librorum prohibitorum, une liste de livres interdits aux catholiques. Cette mesure visait à empêcher la lecture de textes jugés contraires à la foi et à la morale catholique.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "r2-d2", title: "Document 2 : La formation", layout: "text-only",
      text: "Le Concile a souligné l'importance de l'éducation et de la formation du clergé, en exigeant la création de séminaires pour former les futurs prêtres et améliorer leur pratique.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "r2-d3", title: "Document 3 : La compagnie de Jésus", layout: "text-image",
      text: "L'ordre des Jésuites, également connu sous le nom de Compagnie de Jésus, est une société religieuse catholique fondée par Ignace de Loyola au 16e siècle. L'ordre a été créé pour répondre aux défis vécus par l'Église catholique face à l'émergence du protestantisme.",
      imageUrl: "assets/img/relation-2/img001.png", imageWidthCm: 4,
      sources: ["Source du texte : Service national du RÉCIT.", "Source de l'image : Moranski, Ihs-logo, Wikimedia Commons. Domaine public."] },
    { id: "r2-d4", title: "Document 4 : Modèle astronomique (héliocentrisme)", layout: "text-image",
      text: "Dans ce modèle astronomique, la Terre et les planètes tournent autour du Soleil.",
      imageUrl: "assets/img/relation-2/img002.png", imageWidthCm: 5,
      sources: ["Source : Andreas Cellarius, Harmonia Macrocosmica (XVIIe siècle), Wikimedia Commons. Domaine public."] },
    { id: "r2-d5", title: "Document 5 : Modèle astronomique (géocentrisme)", layout: "text-only",
      text: "Le [...] est un modèle astronomique selon lequel la Terre est immobile et située au centre de l'univers, tandis que les autres objets célestes, y compris les planètes, les étoiles et le Soleil, se déplacent en orbite autour d'elle.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'causes-1': [
    { id: "ca1-d1", title: "Document 1 : Les indulgences", layout: "image-only",
      imageUrl: "assets/img/causes-1/img000.png", imageWidthCm: 7,
      sources: ["Source : Lucas Cranach l'Ancien, L'Antéchrist, Wikimedia Commons. Domaine public."] },
    { id: "ca1-d2", title: "Document 2 : L'ordre des Jésuites", layout: "text-image",
      text: "L'ordre des Jésuites, également connu sous le nom de Compagnie de Jésus, est une société religieuse catholique fondée par Ignace de Loyola au 16e siècle. L'ordre a été créé pour répondre aux défis vécus par l'Église catholique.",
      imageUrl: "assets/img/causes-1/img001.png", imageWidthCm: 4,
      sources: ["Source du texte : Service national du RÉCIT.", "Source de l'image : Moranski, Ihs-logo, Wikimedia Commons. Domaine public."] },
    { id: "ca1-d3", title: "Document 3 : Les ateliers typographiques", layout: "text-only",
      text: "« [...] la diffusion de l'imprimerie dans toute l'Europe occidentale est très rapide, commençant par les villes allemandes proches de Mayence. Une Bible est imprimée à Strasbourg dès 1459, une imprimerie est établie à Paris en 1470. En 1480, des ateliers typographiques fonctionnent dans 110 villes d'Europe, en 1500, elles sont 236. L'impact de l'imprimerie [...] sera bien sûr immense [...]. »",
      sources: ["Source : Dominique Guellec, Gutenberg revisité, Revue d'économie politique, 2004."] }
  ],
  'causes-2': [
    { id: "ca2-d1", title: "Document 1 : Florence et la famille Médicis", layout: "text-image",
      text: "Les Médicis ont financé la construction et la rénovation de plusieurs bâtiments emblématiques de Florence, comme la Basilique San Lorenzo, le Palazzo Medici-Riccardi, la Biblioteca Medicea Laurenziana et la Chapelle des Princes. Ces réalisations ont contribué à l'embellissement de la ville et ont renforcé son statut de centre culturel. De plus, la famille Médicis a soutenu de nombreux artistes célèbres tels que Michel-Ange, Léonard de Vinci, Botticelli, Donatello et Brunelleschi.",
      imageUrl: "assets/img/causes-2/img000.png", imageWidthCm: 5,
      sources: ["Source du texte : Service national du RÉCIT.", "Source de l'image : Roland Geider, Palazzo Medici courtyard, Wikimedia Commons. CC BY-SA 3.0."] },
    { id: "ca2-d2", title: "Document 2 : La construction du savoir", layout: "text-only",
      text: "Les humanistes de la Renaissance ont une grande confiance dans les capacités intellectuelles de l'Homme. À leurs yeux, grâce à son intelligence et à son appétit de connaissances, l'Homme peut acquérir un savoir presque illimité. Dans les domaines scientifiques, ce savoir se base sur l'observation et l'expérimentation. Par ses sens, le scientifique examine les phénomènes naturels afin de les étudier, de les soumettre à l'épreuve des faits et de les comprendre. Ainsi se développe le savoir moderne dans des disciplines telles que les mathématiques, l'anatomie, les sciences naturelles ou l'astronomie.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'causes-3': [
    { id: "ca3-d1", title: "Document 1 : Invention de l'imprimerie", layout: "text-only",
      text: "L'invention de l'imprimerie (1454) par Gutenberg est la mise en commun de plusieurs savoirs et innovations techniques. En effet, Johannes Gutenberg perfectionne les caractères amovibles (un mélange d'étain, de fer, de plomb et d'antimoine), permettant de les utiliser indéfiniment. Il utilise également la presse à bas afin d'en faire une presse typographique. Activée grâce à un levier, elle permet l'application d'une feuille de papier sur des caractères amovibles. Finalement, l'encre d'impression, inventée par Gutenberg, permet non seulement de substituer l'encre de Chine, mais de ne pas abîmer le support.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "ca3-d2", title: "Document 2 : Un pouvoir centralisateur", layout: "text-only",
      text: "L'adoption du protestantisme par Henri VIII a renforcé le pouvoir centralisé de la monarchie anglaise, car le roi a désormais un contrôle direct sur l'Église et la religion. Cette situation lui a permis de consolider son autorité sur les nobles.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "ca3-d3", title: "Document 3 : La dissolution des monastères", layout: "text-only",
      text: "Entre 1536 et 1541, Henri VIII a ordonné la dissolution des monastères, abbayes et couvents en Angleterre. Cette situation a entraîné la confiscation de leurs terres et de leurs biens. La dissolution des ordres religieux a renforcé le pouvoir financier et politique de la couronne et a contribué à la redistribution des terres à la noblesse.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'differences-1': [
    { id: "di1-d1", title: "Document 1 : Modèle astronomique héliocentrique", layout: "text-image",
      text: "Dans ce modèle astronomique, la Terre et les planètes tournent autour du Soleil.",
      imageUrl: "assets/img/differences-1/img000.png", imageWidthCm: 5,
      sources: ["Source : Andreas Cellarius, Harmonia Macrocosmica (XVIIe siècle), Wikimedia Commons. Domaine public."] },
    { id: "di1-d2", title: "Document 2 : Modèle astronomique géocentrique", layout: "text-image",
      text: "Dans ce modèle astronomique, la Terre et les Hommes se trouvent au centre de l'univers.",
      imageUrl: "assets/img/differences-1/img001.png", imageWidthCm: 5,
      sources: ["Source : Johannes van Loon, Système géocentrique de Ptolémée (XVIIe siècle), Wikimedia Commons. Domaine public."] },
    { id: "di1-d3", title: "Document 3 : La Pietà", layout: "image-only",
      imageUrl: "assets/img/differences-1/img002.png", imageWidthCm: 5,
      sources: ["Source : Juan M Romero, Pietà van Michelangelo, 1498-1499, Wikimedia Commons. CC BY-SA 4.0."] },
    { id: "di1-d4", title: "Document 4 : La Cène", layout: "image-only",
      imageUrl: "assets/img/differences-1/img003.png", imageWidthCm: 10,
      sources: ["Source : Léonard de Vinci, La Cène, Wikimedia Commons. Domaine public."] }
  ],
  'differences-2': [
    { id: "di2-d1", title: "Document 1 : Les caractéristiques de la religion catholique", layout: "text-only",
      text: "L'autorité religieuse repose sur une hiérarchie : le pape à sa tête, suivi des évêques et des prêtres. L'Église catholique croit que le pape est le représentant de Dieu sur Terre. Le salut est obtenu par la foi en Jésus-Christ, les sacrements et les comportements charitables. Finalement, l'Église catholique reconnaît sept sacrements : le baptême, l'eucharistie, la confirmation, la confession, le mariage, l'ordination sacerdotale et l'onction des malades.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "di2-d2", title: "Document 2 : Les caractéristiques des religions protestantes", layout: "text-only",
      text: "L'autorité repose principalement sur la Bible, considérée comme la seule source de vérité divine. Les Églises protestantes n'ont pas de hiérarchie, comme l'Église catholique, et accordent une grande importance à l'interprétation individuelle de la foi. Les protestants croient que le salut est un don de Dieu accordé uniquement par la foi en Jésus-Christ. Finalement, la plupart des Églises protestantes reconnaissent deux sacrements : le baptême et l'eucharistie.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "di2-d3", title: "Document 3 : La Pietà (Renaissance)", layout: "image-only",
      imageUrl: "assets/img/differences-2/img000.png", imageWidthCm: 5,
      sources: ["Source : Juan M Romero, Pietà van Michelangelo, 1498-1499, Wikimedia Commons. CC BY-SA 4.0."] },
    { id: "di2-d4", title: "Document 4 : La Pietà (Moyen Âge)", layout: "image-only",
      imageUrl: "assets/img/differences-2/img001.png", imageWidthCm: 5,
      sources: ["Source : Factumquintus, 15th-century German wood Pietà from Cologne, Wikimedia Commons. CC BY-SA 3.0."] }
  ],
  'changements-1': [
    { id: "ch1-d1", title: "Document 1 : La Bible", layout: "text-image",
      text: "Grâce à l'imprimerie, l'accès à la Bible est facilité, puisque celle-ci est disponible dans différentes langues et non plus exclusivement en latin. Elle permet donc à plus de gens, bien qu'il s'agisse encore d'une infime minorité, d'avoir accès aux écrits de la Bible sans l'intermédiaire des religieux, ce qui mènera à des interprétations différentes de celle-ci.",
      imageUrl: "assets/img/changements-1/img000.png", imageWidthCm: 5,
      sources: ["Source du texte : Service national du RÉCIT.", "Source de l'image : Kreuzschnabel, B42-print (2018), Wikimedia Commons. Free Art License 1.3."] },
    { id: "ch1-d2", title: "Document 2 : La Pietà (Renaissance)", layout: "image-only",
      imageUrl: "assets/img/changements-1/img001.png", imageWidthCm: 5,
      sources: ["Source : Juan M Romero, Pietà van Michelangelo, 1498-1499, Wikimedia Commons. CC BY-SA 4.0."] },
    { id: "ch1-d3", title: "Document 3 : La Pietà (Moyen Âge)", layout: "image-only",
      imageUrl: "assets/img/changements-1/img002.png", imageWidthCm: 5,
      sources: ["Source : Factumquintus, 15th-century German wood Pietà from Cologne, Wikimedia Commons. CC BY-SA 3.0."] }
  ],
  'changements-2': [
    { id: "ch2-d1", title: "Document 1 : Giotto di Bondone", layout: "text-image",
      text: "Giotto di Bondone est un peintre, sculpteur et architecte italien du 13e siècle qui a bénéficié du soutien de plusieurs mécènes comme Enrico Scrovegni, pour qui il a peint les fresques de la chapelle Scrovegni à Padoue.",
      imageUrl: "assets/img/changements-2/img000.png", imageWidthCm: 6,
      sources: ["Source du texte : Service national du RÉCIT.", "Source de l'image : Zairon, Nave of the Scrovegni Chapel, Padua, Wikimedia Commons. CC BY-SA 4.0."] },
    { id: "ch2-d2", title: "Document 2 : La famille Médicis", layout: "text-only",
      text: "Plusieurs hommes influents ont subventionné des artistes de la Renaissance. Cosme de Médicis, banquier florentin, a commandé de nombreuses œuvres d'art. Son petit-fils, Laurent de Médicis, est également devenu le mécène de plusieurs artistes de la Renaissance, dont Le Verrocchio, Léonard de Vinci, Sandro Botticelli et Michel-Ange. Laurent de Médicis était aussi le dirigeant de la cité de Florence où il régnait sans partage.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "ch2-d3", title: "Document 3 : L'imprimerie et la diffusion de la connaissance", layout: "text-only",
      text: "L'imprimerie facilite l'accès aux savoirs de l'Antiquité, tels que les écrits de Platon, d'Aristote ou d'Hippocrate. L'idée selon laquelle l'être humain est en contrôle de son destin ainsi qu'une réflexion quant à sa place dans l'univers émerge et se diffuse rapidement. De plus, les savoirs s'émancipent peu à peu des pouvoirs politique et religieux. Les livres en circulation sont plus nombreux, sont produits plus rapidement et sont également plus abordables pour les universités.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] }
  ],

  // ============================================================
  // RÉALITÉ SOCIALE : L'expansion européenne dans le monde
  // ============================================================
  'exp-causalite-1': [
    { id: "exp-c1-d1", title: "Document 1 : Des morts par millions", layout: "text-only",
      text: "Des épidémies de petite vérole, de peste ou de rougeole tuent des millions d'Autochtones. Par exemple, en 1528, la variole tue 200 000 Incas en quelques mois. C'est ainsi qu'au Mexique, en 1600, il ne reste plus qu'un million d'Autochtones. À l'arrivée des Européens, 100 ans auparavant, la population était évaluée à 20 millions de personnes.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-c1-d2", title: "Document 2 : Débarquement de Christophe Colomb en 1492", layout: "image-only",
      imageUrl: "assets/img/exp-causalite-1/img001.png", imageWidthCm: 10,
      sources: ["Source de l'image : Dióscoro Teófilo de la Puebla Tolín, Desembarco de Colón de Dióscoro Puebla, Wikimedia Commons. Licence : Image du domaine public."] },
    { id: "exp-c1-d3", title: "Document 3 : La variole", layout: "text-image",
      text: "Involontairement, les Espagnols portent en eux plusieurs virus et bactéries contre lesquels les Autochtones n'ont aucune défense immunitaire.",
      imageUrl: "assets/img/exp-causalite-1/img002.png", imageWidthCm: 6,
      sources: ["Source de l'image : Codex Florentin (1540-1585), livre XII folio 54, Wikimedia Commons. Licence : Image du domaine public.", "Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-causalite-2': [
    { id: "exp-c2-d1", title: "Document 1 : Les besoins européens", layout: "text-only",
      text: "En Europe, on manque de métaux précieux (or, argent, etc.) dès le 14e siècle. L'augmentation de la population, le développement du commerce et le goût pour les produits de luxe des Indes entraînent une augmentation des besoins en métaux précieux. Les mines européennes ne suffisent plus et l'or en provenance d'Afrique n'est plus suffisant pour répondre à la demande des royaumes européens.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-c2-d2", title: "Document 2 : Les ressources naturelles de l'Amérique", layout: "text-only",
      text: "Suite à de nombreuses rencontres avec les Aztèques et les Incas, les conquérants européens ont appris que ces peuples étaient tous deux très riches en or. Les Espagnols ont rapidement conquis ces empires et ont pillé leurs réserves d'or pour financer la couronne espagnole et financer d'autres explorations. L'or a également été trouvé en Colombie, au Venezuela et au Brésil, qui sont devenus des sources importantes d'or pour les empires coloniaux européens.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-c2-d3", title: "Document 3 : Population de l'Empire aztèque", layout: "text-only",
      text: "Entre 1518 et 1618, la population du Mexique a chuté, selon les estimations, de 20 millions à seulement 1,6 million d'habitants. Il s'agit d'une baisse d'environ 90 %. Bien que les virus et les bactéries aient un impact significatif sur ce déclin, il faut mentionner qu'une part de cette baisse démographique est attribuée aux violences et aux mauvais traitements infligés par les Espagnols envers les Aztèques.",
      sources: ["Source : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-causalite-3': [
    { id: "exp-c3-d1", title: "Document 1 : La prise de Constantinople", layout: "text-only",
      text: "La prise de Constantinople par les Turcs ottomans marquent une rupture majeure dans le commerce entre l'Europe et l'Asie. Contrôlant ce point de convergence entre les routes commerciales asiatiques et européennes, les Ottomans n'hésitent pas à imposer des taxes sur les marchandises transitant par la ville. Cela explique, en partie du moins, pourquoi les royaumes européens se lancent dans la recherche d'une route maritime vers l'Asie.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-c3-d2", title: "Document 2 : Contourner l'Afrique", layout: "text-image",
      text: "Vasco de Gama a réussi à établir une route vers les Indes en contournant le continent africain (1497-1499).",
      imageUrl: "assets/img/exp-causalite-3/img001.png", imageWidthCm: 7,
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social.", "Source de l'image : Hégésippe Cormier, Gama route 1 FR, Wikimedia Commons. Licence : Creative Commons BY-SA 3.0."] },
    { id: "exp-c3-d3", title: "Document 3 : Les épices", layout: "text-only",
      text: "Liste d'épices prisées dans les royaumes européens : Originaire d'Inde, le poivre noir était extrêmement précieux et était souvent utilisé comme monnaie d'échange. Il était utilisé pour assaisonner les plats et conserver les aliments. Originaire du Sri Lanka, la cannelle était une épice très recherchée pour sa saveur douce et parfumée. Elle était utilisée dans les plats sucrés et salés ainsi que pour conserver les aliments. Originaire des îles Moluques en Indonésie, le clou de girofle était très apprécié pour sa saveur forte et piquante. Il était utilisé pour assaisonner les plats et comme antiseptique en médecine. Originaire d'Asie du Sud-Est, le gingembre était apprécié pour sa saveur piquante et ses propriétés médicinales. Il était utilisé pour traiter diverses affections, notamment les problèmes digestifs.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-faits-1': [
    { id: "exp-f1-d1", title: "Document 1 : Le partage du Nouveau-Monde", layout: "text-only",
      text: "En 1494, le traité de [...] partage le Nouveau-Monde entre les royaumes d'Espagne et de Portugal. Dès lors, toutes les terres qui se trouvent à l'est de la ligne de partage appartiennent au Portugal, c'est-à-dire les îles Madère, les Açores, Porto Santo et le Cap-Vert. La pointe de l'actuel Brésil, suite à sa découverte par Pedro Alvares Cabral, sera sous la sphère d'influence portugaise. L'Espagne, quant à elle, aura la mainmise sur toutes les nouvelles terres découvertes se trouvant à l'ouest de la ligne de partage de 1494.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-f1-d2", title: "Document 2 : Mercantilisme", layout: "text-image",
      text: "Le [...] se développe entre les colonies européennes en Amérique, les métropoles européennes et l'Afrique. En effet, les métropoles européennes exploitent, dans les colonies, plusieurs ressources naturelles de grande valeur : sucre, tabac, rhum, café, minéraux. L'Europe envoie des armes, des tissus et de l'alcool en Afrique en échange d'esclaves. Ces derniers sont alors expédiés dans les colonies afin d'y exploiter la canne à sucre, les métaux ainsi que le tabac. Il faut comprendre, dans ce [...], qu'il n'y a que la métropole européenne qui tire des profits. Elle cherche à augmenter sa puissance et son prestige face aux autres royaumes européens. C'est ce qu'on appelle le mercantilisme.",
      imageUrl: "assets/img/exp-faits-1/img001.png", imageWidthCm: 7,
      sources: ["Source de l'image : Sémhur, Schéma classique du commerce triangulaire entre l'Afrique, les Amériques et l'Europe, Wikimedia Commons. Licence : image du domaine public.", "Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-faits-2': [
    { id: "exp-f2-d1", title: "Document 1 : Vers le nord !", layout: "text-image",
      text: "Grâce à l'utilisation de cet outil, les marins peuvent s'orienter en tout temps vers le nord magnétique.",
      imageUrl: "assets/img/exp-faits-2/img000.png", imageWidthCm: 5,
      sources: ["Source de l'image : Caroline Léna Becker, Boussole directrice modèle déposé par la Maison Houlliot & Cie à Paris, collection personnelle (2012), Wikimedia Commons. Licence : Creative Commons BY 3.0.", "Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-f2-d2", title: "Document 2 : Se repérer grâce aux astres", layout: "text-image",
      text: "« S'éloigner des côtes pour s'aventurer sur l'océan représente une entreprise périlleuse. Les capitaines de caravelles doivent pouvoir s'orienter à l'aide des astres. Les Portugais adoptent des instruments arabes nouvellement arrivés sur le continent pour mesurer la latitude (position par rapport à l'Équateur). »",
      imageUrl: "assets/img/exp-faits-2/img001.png", imageWidthCm: 6,
      sources: ["Source de l'image : OpenClipart-Vectors, Titre inconnu (2013), Pixabay. Licence : libre de droits.", "Source du texte : François Hudon et Michel Vervais, Réalités. Histoire et éducation à la citoyenneté, Manuel de l'élève 2A, 1re cycle du secondaire, Saint-Laurent, ERPI, p.70."] },
    { id: "exp-f2-d3", title: "Document 3 : Tenochtitlan", layout: "text-image",
      text: "Tenochtitlan, capitale de l'empire. D'une population de 20 millions d'habitants, cet empire avait une organisation sociale et politique structurée ainsi que de nombreuses infrastructures (aqueducs, digues, écoles, marchés, routes, canaux et palais). L'agriculture était abondante, l'architecture et les arts étaient développés. Les [...] étaient polythéistes et vénéraient des dizaines de dieux. C'est à l'arrivée des Espagnols en 1519, avec Hernan Cortès à sa tête, que l'empire s'est effondré et que la population a adhéré rapidement aux croyances religieuses des conquérants. Le résultat de ce choc culturel est l'émergence d'une spiritualité provenant à la fois des croyances [...] et de la religion catholique des Espagnols.",
      imageUrl: "assets/img/exp-faits-2/img002.png", imageWidthCm: 6,
      sources: ["Source de l'image : Diego Rivera, Mural by Diego Rivera of the Aztec city of Tenochtitlan and life in Aztec times (1945), Wikimedia Commons. Licence : image du domaine public.", "Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-faits-3': [
    { id: "exp-f3-d1", title: "Document 1 : Le commerce triangulaire", layout: "text-image",
      text: "Les métropoles européennes exploitent, dans les colonies, plusieurs ressources naturelles de grande valeur : sucre, tabac, rhum, café, minéraux. L'Europe envoie des armes, des tissus et de l'alcool en Afrique en échange d'esclaves. Ces derniers sont alors expédiés dans les colonies afin d'y exploiter la canne à sucre, les métaux ainsi que le tabac.",
      imageUrl: "assets/img/exp-faits-3/img000.png", imageWidthCm: 5,
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social.", "Source de l'image : Quadell, Plan de « stockage » (≈stowage) type d'un navire [...] anglais (vers 1788), Wikimedia Commons. Licence : image du domaine public."] },
    { id: "exp-f3-d2", title: "Document 2 : Objectifs des souverains européens", layout: "text-only",
      text: "Les rois et les reines des royaumes européens cherchent sans cesse à étendre leur territoire. En effet, ceux-ci souhaitent exploiter davantage de ressources et dominer les populations locales, tout en s'assurant de les évangéliser. La recherche de prestige et de puissance, liée à la domination de nouveaux territoires et des populations du Nouveau-Monde, est l'une des raisons du financement des expéditions vers l'Amérique de la part des souverains européens. La recherche d'une route vers les Indes et la découverte de métaux précieux font également partie des causes de ce financement.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-espace-1': [
    { id: "exp-e1-d1", title: "Document 1 : Les métropoles européennes", layout: "image-only",
      imageUrl: "assets/img/exp-espace-1/img000.png", imageWidthCm: 11,
      sources: ["Source de l'image : D-Maps, adapté par Mathieu Mercier."] },
    { id: "exp-e1-d2", title: "Document 2 : Le traité de Tordesillas de 1494", layout: "image-only",
      imageUrl: "assets/img/exp-espace-1/img001.png", imageWidthCm: 12,
      sources: ["Source de l'image : Flappiefh, La ligne de partage selon la bulle Inter cætera (en pointillés), selon le traité de Tordesillas (en violet) (2013), Wikimedia Commons. Licence : Creative Commons BY-SA 3.0."] }
  ],
  'exp-espace-2': [
    { id: "exp-e2-d1", title: "Document 1 : Les trajets des explorateurs", layout: "image-only",
      imageUrl: "assets/img/exp-espace-2/img000.png", imageWidthCm: 12,
      sources: ["Source de l'image : Noël Meunier - Cartothèque Hatier (2018)."] },
    { id: "exp-e2-d2", title: "Document 2 : Le commerce triangulaire", layout: "image-only",
      imageUrl: "assets/img/exp-espace-2/img001.png", imageWidthCm: 10,
      sources: ["Source de l'image : D-Maps, adapté par Mathieu Mercier."] }
  ],
  'exp-temps-1': [
    { id: "exp-t1-d1", title: "Document 1 : Ligne du temps", layout: "image-only",
      imageUrl: "assets/img/exp-temps-1/img000.png", imageWidthCm: 13,
      sources: ["Source : Mathieu Mercier."] },
    { id: "exp-t1-d2", title: "Document 2 : Le partage du Nouveau-Monde", layout: "text-only",
      text: "En 1494, le traité de [...] partage le Nouveau-Monde entre les royaumes d'Espagne et de Portugal. Dès lors, toutes les terres qui se trouvent à l'est de la ligne de partage appartiennent au Portugal, c'est-à-dire les îles Madère, les Açores, Porto Santo et le Cap-Vert. La pointe de l'actuel Brésil, suite à sa découverte par Pedro Alvares Cabral, sera sous la sphère d'influence portugaise. L'Espagne, quant à elle, aura la mainmise sur toutes les nouvelles terres découvertes se trouvant à l'ouest de la ligne de partage de 1494.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-t1-d3", title: "Document 3 : La prise de Constantinople", layout: "text-only",
      text: "La prise de Constantinople par les Turcs ottomans marquent une rupture majeure dans le commerce entre l'Europe et l'Asie. Contrôlant ce point de convergence entre les routes commerciales asiatiques et européennes, les Ottomans n'hésitent pas à imposer des taxes sur les marchandises transitant par la ville. Cela explique, en partie du moins, pourquoi les royaumes européens se lancent dans la recherche d'une route maritime vers l'Asie.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-temps-2': [
    { id: "exp-t2-d1", title: "Document 1 : Les encomiendas", layout: "image-only",
      imageUrl: "assets/img/exp-temps-2/img000.png", imageWidthCm: 11,
      sources: ["Source de l'image : Théodore de Bry, Tumucua culture (1591), Bibliothèque nationale de France / Théodore de Bry, La mine d'argent de Potosí (1596), International Institute of Social History. Licences : images du domaine public."] },
    { id: "exp-t2-d2", title: "Document 2 : Christophe Colomb en Amérique", layout: "image-only",
      imageUrl: "assets/img/exp-temps-2/img001.png", imageWidthCm: 8,
      sources: ["Source de l'image : Dióscoro Teófilo de la Puebla Tolín, Desembarco de Colón de Dióscoro Puebla, Wikimedia Commons. Licence : image du domaine public."] },
    { id: "exp-t2-d3", title: "Document 3 : De nouvelles inventions", layout: "text-only",
      text: "« S'éloigner des côtes pour s'aventurer sur l'océan représente une entreprise périlleuse. Les capitaines de caravelles doivent pouvoir s'orienter à l'aide des astres. Les Portugais adoptent des instruments arabes nouvellement arrivés sur le continent pour mesurer la latitude (position par rapport à l'Équateur). »",
      sources: ["Source du texte : François Hudon et Michel Vervais, Réalités. Histoire et éducation à la citoyenneté, Manuel de l'élève 2A, 1re cycle du secondaire, Saint-Laurent, ERPI, p.70."] }
  ],
  'exp-relation-1': [
    { id: "exp-r1-d1", title: "Document 1 : Une terre d'abondance", layout: "text-only",
      text: "L'Amérique offre des ressources naturelles abondantes, comme l'or, l'argent, et d'autres métaux précieux et des produits agricoles tels que le sucre, le cacao, et le tabac. Les monarques européens espèrent tirer profit de ces ressources pour renforcer leur économie et financer leur puissance militaire.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-r1-d2", title: "Document 2 : Évangélisation", layout: "text-only",
      text: "Les monarques et les explorateurs européens considéraient souvent qu'ils avaient une mission divine pour convertir les peuples autochtones aux croyances et aux pratiques chrétiennes. Cette motivation religieuse a joué un rôle clé dans l'expansion européenne en Amérique et a conduit à des tentatives d'évangélisation des populations autochtones.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-r1-d3", title: "Document 3 : Empires coloniaux", layout: "text-only",
      text: "Les royaumes européens, en particulier l'Espagne, le Portugal, la France et l'Angleterre, sont engagés dans des rivalités politiques et économiques. La colonisation de l'Amérique offrait une occasion de surpasser leurs rivaux en termes de territoire, de richesse, et d'influence à l'échelle du globe.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-r1-d4", title: "Document 4 : La chute de l'empire Aztèque", layout: "text-only",
      text: "C'est à l'arrivée des Espagnols en 1519, avec Hernan Cortès à sa tête, que l'empire s'est effondré et que la population a adhéré rapidement aux croyances religieuses des conquérants. Le résultat de ce choc culturel est l'émergence d'une spiritualité provenant à la fois des croyances aztèques et de la religion catholique des Espagnols.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-relation-2': [
    { id: "exp-r2-d1", title: "Document 1 : Naviguer partout", layout: "text-only",
      text: "[...] est un petit navire à voiles, caractérisé par sa rapidité, son agilité et sa capacité à naviguer contre le vent. Sa taille modeste leur permettait d'explorer les côtes et les fleuves, en plus de pouvoir transporter des marchandises ou des passagers sur de longues distances. Ce navire était équipé de deux ou trois mâts, avec des voiles latines triangulaires ainsi que des voiles carrées.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-r2-d2", title: "Document 2 : La formation", layout: "text-only",
      text: "Les [...] sont des cartes manuscrites, qui représentent les côtes, les ports, les îles et les autres caractéristiques géographiques importantes pour la navigation maritime. Ces cartes sont basées sur des observations directes et des informations recueillies auprès des marins. Elles sont utilisées pour planifier et faciliter les voyages en mer.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-r2-d3", title: "Document 3 : Se repérer grâce aux astres", layout: "image-only",
      imageUrl: "assets/img/exp-relation-2/img002.png", imageWidthCm: 6,
      sources: ["Source de l'image : OpenClipart-Vectors, Titre inconnu (2013), Pixabay. Licence : libre de droits."] },
    { id: "exp-r2-d4", title: "Document 4 : Ferdinand II d'Aragon et Isabelle Ire de Castille", layout: "image-only",
      imageUrl: "assets/img/exp-relation-2/img003.png", imageWidthCm: 6,
      sources: ["Source de l'image : Anonyme, Les « Rois Catholiques », Ferdinand II d'Aragon et Isabelle Ire de Castille (15e siècle), Wikimedia Commons. Licence : image du domaine public."] },
    { id: "exp-r2-d5", title: "Document 5 : Les encomiendas", layout: "image-only",
      imageUrl: "assets/img/exp-relation-2/img004.png", imageWidthCm: 10,
      sources: ["Source de l'image : Théodore de Bry, Tumucua culture (1591), Bibliothèque nationale de France / Théodore de Bry, La mine d'argent de Potosí (1596), International Institute of Social History. Licences : images du domaine public."] }
  ],
  'exp-causes-1': [
    { id: "exp-ca1-d1", title: "Document 1 : Les voyages de Marco Polo", layout: "text-only",
      text: "À peine écrite, l'œuvre de l'explorateur Marco Polo est traduite en une dizaine de langues. Dans son Livre des merveilles, il décrit des palais immenses couverts d'or et d'argent, des riches cités ayant un grand nombre de commerçants, des ports d'où viennent des bateaux d'Indes remplis d'épices, de marchandises précieuses, de perles et de pierres. De plus, il y décrit la richesse des habitants d'îles mystérieuses où tous les édifices sont couverts d'or et de pierres précieuses.",
      sources: ["Source du texte : François Hudon et Michel Vervais, Réalités. Histoire et éducation à la citoyenneté, Manuel de l'élève 2A, 1re cycle du secondaire, Saint-Laurent, ERPI, p.78."] },
    { id: "exp-ca1-d2", title: "Document 2 : Christophe Colomb en Amérique", layout: "image-only",
      imageUrl: "assets/img/exp-causes-1/img001.png", imageWidthCm: 9,
      sources: ["Source de l'image : Dióscoro Teófilo de la Puebla Tolín, Desembarco de Colón de Dióscoro Puebla, Wikimedia Commons. Licence : image du domaine public."] },
    { id: "exp-ca1-d3", title: "Document 3 : Les langues parlées en Amérique", layout: "text-only",
      text: "L'arrivée des Européens en Amérique a entraîné la propagation des langues européennes (l'espagnol, l'anglais, le portugais et le français). Ce sont aujourd'hui les langues les plus parlées sur le continent américain. Ces langues ont été imposées aux populations autochtones, souvent par la force, l'éducation ou la conversion religieuse. La colonisation européenne a également provoqué un déclin significatif et même l'extinction de nombreuses langues autochtones. La violence, les maladies, la dépossession des terres et l'assimilation forcée ont entraîné la mort de millions d'Autochtones ainsi que la disparition de leurs langues et de leurs cultures.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-causes-2': [
    { id: "exp-ca2-d1", title: "Document 1 : Le commerce triangulaire", layout: "text-only",
      text: "Entre 10 à 14 millions d'Africains ont été envoyés en Amérique en tant qu'esclaves. Cette déportation a causé la séparation des familles ainsi que la perte de leurs cultures. La mise en place du commerce des esclaves a également entraîné un déséquilibre démographique en Afrique dans certaines régions d'Afrique de l'Ouest.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-ca2-d2", title: "Document 2 : La prise de Constantinople", layout: "text-image",
      text: "La prise de Constantinople par les Turcs ottomans marquent une rupture majeure dans le commerce entre l'Europe et l'Asie. Contrôlant ce point de convergence entre les routes commerciales asiatiques et européennes, les Ottomans n'hésitent pas à imposer des taxes sur les marchandises transitant par la ville.",
      imageUrl: "assets/img/exp-causes-2/img001.png", imageWidthCm: 9,
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social.", "Source de l'image : Fausto Zonaro, Mehmed II à la conquête de Constantinople, Wikimedia Commons. Licence : image du domaine public."] }
  ],
  'exp-causes-3': [
    { id: "exp-ca3-d1", title: "Document 1 : Évangélisation", layout: "text-only",
      text: "Les monarques et les explorateurs européens considéraient souvent qu'ils avaient une mission divine pour convertir les peuples autochtones aux croyances et aux pratiques chrétiennes. Cette motivation religieuse a joué un rôle clé dans l'expansion européenne en Amérique et a conduit à des tentatives d'évangélisation des populations autochtones.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-ca3-d2", title: "Document 2 : Adoption du catholicisme", layout: "text-only",
      text: "C'est à l'arrivée des Espagnols en 1519, avec Hernan Cortès à sa tête, que l'empire s'est effondré et que la population a adhéré rapidement aux croyances religieuses des conquérants. Le résultat de ce choc culturel est l'émergence d'une spiritualité provenant à la fois des croyances aztèques et de la religion catholique des Espagnols.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-ca3-d3", title: "Document 3 : Empires coloniaux", layout: "text-only",
      text: "Les royaumes européens, en particulier l'Espagne, le Portugal, la France et l'Angleterre, sont engagés dans des rivalités politiques et économiques. La colonisation de l'Amérique offrait une occasion de surpasser leurs rivaux en termes de territoire, de richesse, et d'influence à l'échelle du globe.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-differences-1': [
    { id: "exp-di1-d1", title: "Document 1 : Les trajets des explorateurs", layout: "image-only",
      imageUrl: "assets/img/exp-differences-1/img000.png", imageWidthCm: 12,
      sources: ["Source de l'image : Noël Meunier - Cartothèque Hatier (2018)."] },
    { id: "exp-di1-d2", title: "Document 2 : Supériorité", layout: "text-only",
      text: "Les conquistadors espagnols étaient convaincus de la supériorité de leur culture et de leur mode de vie. La langue, les vêtements, les coutumes et les traditions espagnoles étaient considérés comme supérieurs à ceux des peuples autochtones, qui étaient souvent perçus comme sauvages et non civilisés.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-di1-d3", title: "Document 3 : Défenseur des civilisations précolombiennes", layout: "text-only",
      text: "« À ceux qui prétendent que les Indiens sont des barbares, nous répondons que ces gens ont des villages, des cités, des rois, des seigneurs et leur organisation politique est parfois meilleure que la nôtre. Si l'on n'a pas longuement enseigné la doctrine chrétienne aux Indiens, c'est une grande absurdité que de prétendre leur faire abandonner leurs idoles. Car personne n'abandonne de bon cœur les croyances de ses ancêtres. Que l'on sache que ces Indiens sont des hommes et qu'ils doivent être traités comme des hommes libres. »",
      sources: ["Source du texte : Jean-Michel Lambin, Pierre Desplanques et Jacques Martin, Histoire Géographie, initiation économique, Paris, Hachette, 1995."] }
  ],
  'exp-differences-2': [
    { id: "exp-di2-d1", title: "Document 1 : Mercantilisme", layout: "text-image",
      text: "Le [...] se développe entre les colonies européennes en Amérique, les métropoles européennes et l'Afrique. En effet, les métropoles européennes exploitent, dans les colonies, plusieurs ressources naturelles de grande valeur : sucre, tabac, rhum, café, minéraux. L'Europe envoie des armes, des tissus et de l'alcool en Afrique en échange d'esclaves. Ces derniers sont alors expédiés dans les colonies afin d'y exploiter la canne à sucre, les métaux ainsi que le tabac. Il faut comprendre, dans ce [...], qu'il n'y a que la métropole européenne qui tire des profits. Elle cherche à augmenter sa puissance et son prestige face aux autres royaumes européens. C'est ce qu'on appelle le mercantilisme.",
      imageUrl: "assets/img/exp-differences-2/img000.png", imageWidthCm: 7,
      sources: ["Source de l'image : Sémhur, Schéma classique du commerce triangulaire entre l'Afrique, les Amériques et l'Europe, Wikimedia Commons. Licence : image du domaine public.", "Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-di2-d2", title: "Document 2 : Empires coloniaux", layout: "text-only",
      text: "Les royaumes européens, en particulier l'Espagne, le Portugal, la France et l'Angleterre, sont engagés dans des rivalités politiques et économiques. La colonisation de l'Amérique offrait une occasion de surpasser leurs rivaux en termes de territoire, de richesse, et d'influence à l'échelle du globe.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-di2-d3", title: "Document 3 : Rôle des souverains européens", layout: "text-image",
      text: "Les rois et les reines des royaumes européens cherchent sans cesse à étendre leur territoire. En effet, ceux-ci souhaitent exploiter davantage de ressources et dominer les populations locales, tout en s'assurant de les évangéliser. La recherche de prestige et de puissance, liée à la domination de nouveaux territoires et des populations du Nouveau-Monde, est l'une des raisons du financement des expéditions vers l'Amérique de la part des souverains européens. La recherche d'une route vers les Indes et la découverte de métaux précieux font également partie des causes de ce financement. (Image : Ferdinand II d'Aragon et Isabelle Ire de Castille)",
      imageUrl: "assets/img/exp-differences-2/img002.png", imageWidthCm: 6,
      sources: ["Source de l'image : Anonyme, Les « Rois Catholiques », Ferdinand II d'Aragon et Isabelle Ire de Castille (15e siècle), Wikimedia Commons. Licence : image du domaine public.", "Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-changements-1': [
    { id: "exp-ch1-d1", title: "Document 1 : La prise de Constantinople", layout: "text-only",
      text: "La prise de Constantinople par les Turcs ottomans marquent une rupture majeure dans le commerce entre l'Europe et l'Asie. Contrôlant ce point de convergence entre les routes commerciales asiatiques et européennes, les Ottomans n'hésitent pas à imposer des taxes sur les marchandises transitant par la ville. Cela explique, en partie du moins, pourquoi les royaumes européens se lancent dans la recherche d'une route maritime vers l'Asie.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-ch1-d2", title: "Document 2 : Adoption du catholicisme", layout: "text-only",
      text: "C'est à l'arrivée des Espagnols en 1519, avec Hernan Cortès à sa tête, que l'empire s'est effondré et que la population a adhéré rapidement aux croyances religieuses des conquérants, aux croyances chrétiennes.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-ch1-d3", title: "Document 3 : La spiritualité aztèque", layout: "text-only",
      text: "Les Aztèques croyaient que l'équilibre de l'univers reposait sur des forces cosmiques et des cycles de création et de destruction. Ils pensaient que leur monde était le cinquième et dernier de ces cycles, et qu'il avait été précédé par quatre mondes qui avaient été détruits par des catastrophes naturelles. Parmi les dieux les plus importants de la spiritualité aztèque figuraient Huitzilopochtli (dieu du soleil et de la guerre), Tlaloc (dieu de la pluie, de la fertilité et de l'eau), Quetzalcoatl (dieu de la connaissance, du vent et de la civilisation), Tezcatlipoca (dieu de la nuit, du chaos et des conflits) et Coatlicue (déesse de la terre et de la fertilité, mère des dieux et des hommes).",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ],
  'exp-changements-2': [
    { id: "exp-ch2-d1", title: "Document 1 : Approvisionnement en or et en argent", layout: "text-only",
      text: "Au 15e siècle, les pays d'Afrique du Nord, comme le Maroc et l'Algérie, possèdent des gisements d'or et d'argent. L'or était également extrait de certaines régions comme les royaumes du Mali et du Ghana. Il était ensuite acheminé à travers le Sahara vers le Maghreb puis vers l'Europe en utilisant les routes commerciales transsahariennes.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] },
    { id: "exp-ch2-d2", title: "Document 2 : Les mines de Potosi", layout: "text-only",
      text: "L'argent commence à être exploité à Potosi douze ans seulement après la conquête espagnole de l'Empire inca. La « découverte » du site relève de la légende. En 1545, Diego Huallpa, un éleveur quechua de lamas, aurait perdu une de ses bêtes à flanc de montagne. Au cours de son ascension pour la retrouver, une rafale de vent l'aurait forcé à s'accrocher à un buisson qui se serait déraciné, découvrant une pépite d'argent natif. Huallpa serait retourné plusieurs fois sur place pour ramasser le minerai d'argent affleurant le sol, et se serait montré incapable de cacher à ses proches la provenance de cette manne soudaine. La rumeur de sa bonne fortune aurait atteint les oreilles de Juan de Villarroel, un conquistador désargenté fraîchement arrivé dans les Andes, après une série de mauvais coups en Amérique centrale. Ce dernier se serait empressé de faire enregistrer officiellement à son nom la découverte de la « montagne de l'argent ».",
      sources: ["Source du texte : « Potosí, la mangeuse d'hommes. En Bolivie, cinq cents ans de conquête de l'argent », Z : Revue itinérante d'enquête et de critique sociale, 2018/1 (N° 12), p. 16-21."] },
    { id: "exp-ch2-d3", title: "Document 3 : Acculturation", layout: "text-only",
      text: "L'arrivée des Européens en Amérique a entraîné la propagation des langues européennes (l'espagnol, l'anglais, le portugais et le français). Ce sont aujourd'hui les langues les plus parlées sur le continent américain. Ces langues ont été imposées aux populations autochtones, souvent par la force, l'éducation ou la conversion religieuse. La colonisation européenne a également provoqué un déclin significatif et même l'extinction de nombreuses langues autochtones. La violence, les maladies, la dépossession des terres et l'assimilation forcée ont entraîné la mort de millions d'Autochtones ainsi que la disparition de leurs langues et de leurs cultures.",
      sources: ["Source du texte : Service national du RÉCIT, domaine de l'univers social."] }
  ]
};

// Helper : sélectionne uniquement les documents nécessaires à une question
// Les documents conservent leur numérotation d'origine (Document 1, Document 2…)
// afin que les énoncés "À l'aide du document 2" restent cohérents.
const pickDocs = (section, ...indices) => indices.map(i => DOCS[section][i - 1]);

// ============ EXPORT ============
window.DATA = {

  realites_sociales: [
    { id: "renouvellement-vision-homme", titre: "Le renouvellement de la vision de l'Homme", niveau: 2 },
    { id: "expansion-europeenne", titre: "L'expansion européenne dans le monde", niveau: 2 }
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

  questions: [

    // ===== CAUSALITÉ (3) =====
    { id: "q-causalite-1", operation: "Établir des liens de causalité", numero: 1, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide des documents 1 à 3, établis des liens entre les éléments suivants :",
        bullets: ["Une action reprochée au clergé catholique", "Une action de Martin Luther", "Une conséquence culturelle sur les royaumes d'Europe"],
        instructions: CAUSALITE_INSTRUCTIONS, responseSpace: { type: "lines", count: 8 } },
      reglettes: [{ id: "r-c1", label: "Réglette (3 points)", opLabel: "Établir des liens de causalité", maxPoints: 3, ...RUBRIC_CAUSALITE_3PT }],
      documents: pickDocs('causalite-1', 1, 2, 3), corrige: "L'Église catholique vend des indulgences. Par conséquent, Martin Luther écrit les 95 thèses afin de dénoncer les agissements du clergé catholique, dont la vente des indulgences. Les 95 thèses de Martin Luther entraînent une vague de protestation en Europe, favorisant le développement du protestantisme." },
    { id: "q-causalite-2", operation: "Établir des liens de causalité", numero: 2, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide des documents 1 à 3, établis des liens entre les éléments suivants :",
        bullets: ["Un mouvement culturel qui prend de l'essor au 16e siècle", "Un événement organisé en réponse à ce mouvement", "Une mesure mise en place par l'Église catholique"],
        instructions: CAUSALITE_INSTRUCTIONS, responseSpace: { type: "lines", count: 8 } },
      reglettes: [{ id: "r-c2", label: "Réglette (3 points)", opLabel: "Établir des liens de causalité", maxPoints: 3, ...RUBRIC_CAUSALITE_3PT }],
      documents: pickDocs('causalite-2', 1, 2, 3), corrige: "Le protestantisme gagne en importance au 16e siècle. Cela amène l'Église catholique à réagir : elle organise le Concile de Trente afin de lutter contre le mouvement protestant. Ainsi, l'Église catholique propose l'Index lors du Concile de Trente afin d'interdire les ouvrages jugés hérétiques." },
    { id: "q-causalite-3", operation: "Établir des liens de causalité", numero: 3, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide des documents 1 à 3, établis des liens entre les éléments suivants :",
        bullets: ["Une nouvelle invention", "Un impact sur la disponibilité des livres", "Une conséquence sociale de cette disponibilité"],
        instructions: CAUSALITE_INSTRUCTIONS, responseSpace: { type: "lines", count: 8 } },
      reglettes: [{ id: "r-c3", label: "Réglette (3 points)", opLabel: "Établir des liens de causalité", maxPoints: 3, ...RUBRIC_CAUSALITE_3PT }],
      documents: pickDocs('causalite-3', 1, 2, 3), corrige: "L'imprimerie a été inventée lors de la Renaissance par Johannes Gutenberg. Cette invention permet d'augmenter la disponibilité des livres en Europe. Cette disponibilité accrue des livres favorise l'apprentissage de la lecture et de l'écriture dans la population." },

    // ===== FAITS (6) =====
    { id: "q-faits-1", operation: "Établir des faits", numero: 1, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Indique deux caractéristiques des œuvres d'art de la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-f1", label: "Réglette (2 points)", ...R_FAITS_2PT_3 }], documents: pickDocs('faits-1', 1), corrige: "Les thèmes des œuvres d'art de la Renaissance sont majoritairement la religion, l'être humain ou la nature. Les œuvres d'art sont réalistes grâce au respect des proportions du corps humain. Les artistes utilisent la perspective ou le point de fuite dans les peintures. L'inspiration provient de l'Antiquité." },
    { id: "q-faits-2", operation: "Établir des faits", numero: 2, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Comment se nomme le modèle astronomique proposé par Nicolas Copernic ?", responseSpace: { type: "lines", count: 2 } },
      reglettes: [{ id: "r-f2", label: "Réglette (1 point)", ...R_FAITS_1PT }], documents: pickDocs('faits-1', 2), corrige: "Le modèle astronomique proposé par Nicolas Copernic est l'héliocentrisme." },
    { id: "q-faits-3", operation: "Établir des faits", numero: 3, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Indique trois religions protestantes qui se développent en Europe durant la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-f3", label: "Réglette (2 points)", ...R_FAITS_2PT_3SUR3 }], documents: pickDocs('faits-2', 1, 2, 3), corrige: "Les religions luthérienne, calviniste et anglicane." },
    { id: "q-faits-4", operation: "Établir des faits", numero: 4, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "L'architecture de la Renaissance puise son inspiration dans une période historique. De quelle période historique s'agit-il ?", responseSpace: { type: "lines", count: 2 } },
      reglettes: [{ id: "r-f4", label: "Réglette (1 point)", ...R_FAITS_1PT }], documents: pickDocs('faits-2', 4), corrige: "L'Antiquité." },
    { id: "q-faits-5", operation: "Établir des faits", numero: 5, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Dans quel domaine y a-t-il des avancées majeures lors de la Renaissance ?", responseSpace: { type: "lines", count: 2 } },
      reglettes: [{ id: "r-f5", label: "Réglette (1 point)", ...R_FAITS_1PT }], documents: pickDocs('faits-3', 1), corrige: "Dans le domaine de la médecine, des sciences ou de l'anatomie humaine." },
    { id: "q-faits-6", operation: "Établir des faits", numero: 6, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 2, indique le rôle des mécènes lors de la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-f6", label: "Réglette (2 points)", ...R_FAITS_2PT_GEN }], documents: pickDocs('faits-3', 2), corrige: "Le rôle des mécènes est de financer les artistes pour qu'ils puissent se dévouer complètement à leur art (hébergement, nourriture, vêtements, dépenses, etc.)." },

    // ===== ESPACE (4) =====
    { id: "q-espace-1", operation: "Situer dans l'espace", numero: 1, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 1, situe les différents royaumes d'Europe en indiquant la lettre leur correspondant.",
        responseSpace: { type: "labeled-list", items: ["Le royaume de France", "Le royaume d'Angleterre", "Le Saint-Empire romain germanique", "Le royaume de Naples"] } },
      reglettes: [{ id: "r-e1", label: "Réglette (2 points)", ...R_SITUER_2PT_4 }], documents: pickDocs('espace-1', 1), corrige: ["D", "A", "C", "B"] },
    { id: "q-espace-2", operation: "Situer dans l'espace", numero: 2, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 2, indique la lettre qui correspond au foyer de diffusion de la Renaissance italienne et la lettre qui correspond au foyer de diffusion de l'imprimerie.",
        responseSpace: { type: "labeled-list", items: ["Foyer de diffusion de la Renaissance italienne", "Foyer de diffusion de l'imprimerie"] } },
      reglettes: [{ id: "r-e2", label: "Réglette (1 point)", ...R_SITUER_1PT_2 }], documents: pickDocs('espace-1', 2), corrige: ["A", "B"] },
    { id: "q-espace-3", operation: "Situer dans l'espace", numero: 3, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 1, situe les grandes villes de la Renaissance.",
        responseSpace: { type: "labeled-list", items: ["Venise", "Florence", "Paris", "Mayence"] } },
      reglettes: [{ id: "r-e3", label: "Réglette (3 points)", ...R_SITUER_3PT_GVILLES }], documents: pickDocs('espace-2', 1), corrige: ["D", "A", "B", "C"] },
    { id: "q-espace-4", operation: "Situer dans l'espace", numero: 4, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 2, indique la lettre du royaume qui correspond à l'apparition de chacune des religions protestantes.",
        responseSpace: { type: "labeled-list", items: ["Religion luthérienne", "Religion anglicane"] } },
      reglettes: [{ id: "r-e4", label: "Réglette (2 points)", ...R_SITUER_2PT_2 }], documents: pickDocs('espace-2', 2), corrige: ["C", "A"] },

    // ===== TEMPS (4) =====
    { id: "q-temps-1", operation: "Situer dans le temps", numero: 1, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 1, indique la lettre qui correspond à la Renaissance.",
        responseSpace: { type: "labeled-list", items: ["La Renaissance"] } },
      reglettes: [{ id: "r-t1", label: "Réglette (1 point)", ...R_SITUER_1PT_1 }], documents: pickDocs('temps-1', 1), corrige: ["C"] },
    { id: "q-temps-2", operation: "Situer dans le temps", numero: 2, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Les documents 2 et 3 présentent des faits se déroulant lors de la Renaissance. Indique si les faits présentés surviennent avant ou après l'apparition du protestantisme.",
        responseSpace: { type: "before-after-axis", beforeLabel: "Antériorité (Avant)", afterLabel: "Postériorité (Après)", pivot: "Apparition du protestantisme" } },
      reglettes: [{ id: "r-t2", label: "Réglette (1 point)", ...R_SITUER_1PT_T2 }], documents: pickDocs('temps-1', 1, 2, 3), corrige: { before: ["Document 3"], after: ["Document 2"] } },
    { id: "q-temps-3", operation: "Situer dans le temps", numero: 3, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Place en ordre chronologique les documents 1 à 3.",
        responseSpace: { type: "chrono-ordering", items: ["1er (le plus ancien)", "2e", "3e (le plus récent)"] } },
      reglettes: [{ id: "r-t3", label: "Réglette (2 points)", ...R_SITUER_2PT_T3 }], documents: pickDocs('temps-2', 1, 2, 3), corrige: ["Document 3", "Document 1", "Document 2"] },
    { id: "q-temps-4", operation: "Situer dans le temps", numero: 4, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Sur la ligne du temps du document 1, encercle la lettre correspondant aux faits présentés dans le document 2. Inscris ta réponse ci-dessous.",
        responseSpace: { type: "labeled-list", items: ["Lettre correspondante"] } },
      reglettes: [{ id: "r-t4", label: "Réglette (1 point)", ...R_SITUER_1PT_T1 }],
      documents: [
        { id: "t2q4-d1", title: "Document 1 : Ligne du temps", layout: "image-only",
          imageUrl: "assets/img/temps-2/timeline.png", imageWidthCm: 13,
          sources: ["Source : Mathieu Mercier."] },
        DOCS['temps-2'][1]  // Document 2 : Le protestantisme
      ],
      corrige: ["B"] },

    // ===== RELATION (4) =====
    { id: "q-relation-1", operation: "Mettre en relation des faits", numero: 1, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Associe les documents 1 à 3 au type de renaissance lui correspondant.",
        responseSpace: { type: "labeled-list", items: ["Document 1 →", "Document 2 →", "Document 3 →"] } },
      reglettes: [{ id: "r-r1", label: "Réglette (2 points)", ...R_RELATION_2PT_3 }], documents: pickDocs('relation-1', 1, 2, 3), corrige: ["Renaissance artistique", "Renaissance architecturale", "Renaissance scientifique"] },
    { id: "q-relation-2", operation: "Mettre en relation des faits", numero: 2, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Lors de la Renaissance, plusieurs œuvres sont inspirées de la nature, de l'être humain, du christianisme et même de l'Antiquité gréco-romaine. Indique, en cochant dans la case appropriée, si le document 1 représente une œuvre profane ou une œuvre religieuse.",
        responseSpace: { type: "checkbox-table", columns: ["Œuvre profane", "Œuvre religieuse"], rows: ["Document 1"] } },
      reglettes: [{ id: "r-r2", label: "Réglette (1 point)", ...R_RELATION_1PT }], documents: pickDocs('relation-1', 1), corrige: [[true, false]] },
    { id: "q-relation-3", operation: "Mettre en relation des faits", numero: 3, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Indique si les documents 1 à 3 correspondent au mouvement de la réforme protestante ou au mouvement de la contre-réforme. Coche uniquement la case appropriée.",
        responseSpace: { type: "checkbox-table", columns: ["Réforme protestante", "Contre-réforme"], rows: ["Document 1", "Document 2", "Document 3"] } },
      reglettes: [{ id: "r-r3", label: "Réglette (1 point)", ...R_RELATION_1PT }], documents: pickDocs('relation-2', 1, 2, 3), corrige: [[false, true], [false, true], [false, true]] },
    { id: "q-relation-4", operation: "Mettre en relation des faits", numero: 4, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Associe les documents 4 et 5 au modèle astronomique lui correspondant.",
        responseSpace: { type: "labeled-list", items: ["Héliocentrisme →", "Géocentrisme →"] } },
      reglettes: [{ id: "r-r4", label: "Réglette (2 points)", ...R_RELATION_2PT_2 }], documents: pickDocs('relation-2', 4, 5), corrige: ["Document 4", "Document 5"] },

    // ===== CAUSES (6) =====
    { id: "q-causes-1", operation: "Déterminer des causes et des conséquences", numero: 1, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide des documents 1 et 2, détermine le document qui présente une cause de la réforme protestante et le document qui en présente une conséquence.",
        responseSpace: { type: "labeled-list", items: ["Cause de la réforme protestante (Document n°)", "Conséquence de la réforme protestante (Document n°)"] } },
      reglettes: [{ id: "r-ca1", label: "Réglette (2 points)", ...R_CAUSES_2PT_CAUSE_CONS }], documents: pickDocs('causes-1', 1, 2), corrige: ["Document 1", "Document 2"] },
    { id: "q-causes-2", operation: "Déterminer des causes et des conséquences", numero: 2, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 3, détermine une conséquence territoriale de l'invention de l'imprimerie par Johannes Gutenberg.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ca2", label: "Réglette (2 points)", ...R_CAUSES_2PT_CONSEQ }], documents: pickDocs('causes-1', 3), corrige: "Des ateliers d'imprimerie apparaissent dans 110 villes d'Europe en 1480 (Paris, Mayence, Nuremberg, Francfort)." },
    { id: "q-causes-3", operation: "Déterminer des causes et des conséquences", numero: 3, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Détermine une cause de l'amélioration des connaissances scientifiques à la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ca3", label: "Réglette (2 points)", ...R_CAUSES_2PT_CAUSE }], documents: pickDocs('causes-2', 1, 2), corrige: "L'observation et l'expérimentation permettent l'amélioration des connaissances." },
    { id: "q-causes-4", operation: "Déterminer des causes et des conséquences", numero: 4, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 1, détermine un impact culturel du mécénat de la famille Médicis sur la ville de Florence.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ca4", label: "Réglette (2 points)", ...R_CAUSES_2PT_CONSEQ }], documents: pickDocs('causes-2', 1), corrige: "Les Médicis ont financé la construction et la rénovation de plusieurs bâtiments de Florence en plus de l'embellissement de l'architecture de la ville. Le statut culturel de la ville est donc renforcé." },
    { id: "q-causes-5", operation: "Déterminer des causes et des conséquences", numero: 5, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Détermine une cause de l'invention de l'imprimerie par Johannes Gutenberg.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ca5", label: "Réglette (2 points)", ...R_CAUSES_2PT_CAUSE }], documents: pickDocs('causes-3', 1), corrige: "L'invention de l'imprimerie est rendue possible par la mise en commun de plusieurs savoirs et innovations techniques comme les caractères amovibles, l'encre d'impression et la presse à bas." },
    { id: "q-causes-6", operation: "Déterminer des causes et des conséquences", numero: 6, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide des documents 2 et 3, détermine une conséquence politique de l'adoption du protestantisme sur l'Angleterre au 16e siècle.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ca6", label: "Réglette (2 points)", ...R_CAUSES_2PT_CONSEQ }], documents: pickDocs('causes-3', 2, 3), corrige: "L'adoption du protestantisme en Angleterre a permis la prise de contrôle du pouvoir spirituel par la couronne anglaise : la religion anglicane devient une religion d'État." },

    // ===== DIFFÉRENCES (4) =====
    { id: "q-differences-1", operation: "Dégager des différences et des similitudes", numero: 1, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide des documents 1 et 2, dégage une différence dans les modèles astronomiques mis de l'avant par l'Église catholique et Nicolas Copernic.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-di1", label: "Réglette (2 points)", ...R_DIFFERENCES_2PT }], documents: pickDocs('differences-1', 1, 2), corrige: "Nicolas Copernic propose la théorie de l'héliocentrisme alors que l'Église catholique propose la théorie du géocentrisme." },
    { id: "q-differences-2", operation: "Dégager des différences et des similitudes", numero: 2, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide des documents 3 et 4, dégage une similitude dans les caractéristiques des œuvres d'art de la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-di2", label: "Réglette (2 points)", ...R_SIMILITUDES_2PT }], documents: pickDocs('differences-1', 3, 4), corrige: "La similitude entre La Pietà et la Cène est le thème de la religion OU le respect des proportions du corps humain." },
    { id: "q-differences-3", operation: "Dégager des différences et des similitudes", numero: 3, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Dégage deux différences entre le catholicisme et le protestantisme.", responseSpace: { type: "lines", count: 8 } },
      reglettes: [{ id: "r-di3", label: "Réglette (4 points)", ...R_DIFFERENCES_4PT }], documents: pickDocs('differences-2', 1, 2), corrige: "Le catholicisme reconnaît le clergé catholique comme autorité suprême alors que le protestantisme reconnaît uniquement la Bible comme source de vérité divine. Le catholicisme possède sept sacrements alors que le protestantisme n'en reconnaît que deux." },
    { id: "q-differences-4", operation: "Dégager des différences et des similitudes", numero: 4, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Dégage une différence dans les caractéristiques des œuvres d'art au Moyen Âge et à la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-di4", label: "Réglette (2 points)", ...R_DIFFERENCES_2PT_GEN }], documents: pickDocs('differences-2', 3, 4), corrige: "Les œuvres d'art de la Renaissance misent sur le respect des proportions du corps humain et sur l'harmonie des formes alors que ces caractéristiques ne sont pas ou peu présentes au Moyen Âge." },

    // ===== CHANGEMENTS (4) =====
    { id: "q-changements-1", operation: "Déterminer des changements et des continuités", numero: 1, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide du document 1, détermine un changement dans la langue d'écriture de la Bible suite à l'invention de l'imprimerie.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ch1", label: "Réglette (2 points)", ...R_CHGT_2PT_CHGT }], documents: pickDocs('changements-1', 1), corrige: "Suite à l'invention de l'imprimerie, la Bible est traduite dans plusieurs langues européennes (anglais, allemand, français, italien, etc.). Le latin n'est plus la seule langue d'écriture de la Bible." },
    { id: "q-changements-2", operation: "Déterminer des changements et des continuités", numero: 2, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "À l'aide des documents 2 et 3, détermine une continuité dans les thèmes abordés dans les œuvres d'art du Moyen Âge et de la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ch2", label: "Réglette (1 point)", ...R_CHGT_1PT_CONT }], documents: pickDocs('changements-1', 2, 3), corrige: "Lors du Moyen Âge et de la Renaissance, un des thèmes présents dans les œuvres d'art est la religion." },
    { id: "q-changements-3", operation: "Déterminer des changements et des continuités", numero: 3, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Détermine une continuité dans le rôle des mécènes au Moyen Âge et à la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ch3", label: "Réglette (2 points)", ...R_CHGT_2PT_CONT }], documents: pickDocs('changements-2', 1, 2), corrige: "Une continuité dans le rôle des mécènes est que ces derniers poursuivent le financement et l'entretien des artistes." },
    { id: "q-changements-4", operation: "Déterminer des changements et des continuités", numero: 4, niveau: 2, realite_sociale_id: "renouvellement-vision-homme",
      questionBody: { prompt: "Détermine un changement dans l'avancement et la diffusion de la connaissance durant la Renaissance.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-ch4", label: "Réglette (2 points)", ...R_CHGT_2PT_CHGT }], documents: pickDocs('changements-2', 3), corrige: "Lors de la Renaissance, les connaissances deviennent plus accessibles grâce à l'invention de la presse à imprimer, comparativement au Moyen Âge où les connaissances étaient réservées à la noblesse et aux membres du clergé." },

    // ============================================================
    // RÉALITÉ SOCIALE : L'expansion européenne dans le monde
    // ============================================================

    // ===== CAUSALITÉ (3) =====
    { id: "q-exp-causalite-1", operation: "Établir des liens de causalité", numero: 1, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide des documents 1 à 3, établis des liens entre les éléments suivants :",
        bullets: ["La rencontre de deux mondes", "Un impact sur la santé des Autochtones", "Une conséquence sur la population de l'Amérique"],
        instructions: CAUSALITE_INSTRUCTIONS, responseSpace: { type: "lines", count: 8 } },
      reglettes: [{ id: "r-exp-c1", label: "Réglette (3 points)", opLabel: "Établir des liens de causalité", maxPoints: 3, ...RUBRIC_CAUSALITE_3PT }],
      documents: pickDocs('exp-causalite-1', 1, 2, 3),
      corrige: "En 1492, Christophe Colomb traverse l'Atlantique et découvre l'Amérique (les Antilles) et les populations qui y vivent. Suite à ce contact, les peuples autochtones de l'Amérique attrapent certaines maladies (variole) apportées par les Européens. Par conséquent, des millions d'Autochtones meurent : 95 % de la population du Mexique disparaît, passant de 20 millions d'individus à seulement 1 million." },
    { id: "q-exp-causalite-2", operation: "Établir des liens de causalité", numero: 2, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide des documents 1 à 3, établis des liens entre les éléments suivants :",
        bullets: ["Un besoin des royaumes européens", "Les ressources naturelles présentes en Amérique", "Un impact sur les Aztèques"],
        instructions: CAUSALITE_INSTRUCTIONS, responseSpace: { type: "lines", count: 8 } },
      reglettes: [{ id: "r-exp-c2", label: "Réglette (3 points)", opLabel: "Établir des liens de causalité", maxPoints: 3, ...RUBRIC_CAUSALITE_3PT }],
      documents: pickDocs('exp-causalite-2', 1, 2, 3),
      corrige: "Les royaumes européens ont besoin d'or et de métaux précieux dès le 14e siècle. Ils se tournent donc vers l'Amérique, chez les Aztèques et les Incas, afin de s'approvisionner en métaux précieux. Au contact des Européens, la population des Aztèques diminue fortement : mauvais traitements, esclavage pour l'exploitation des métaux précieux, maladies européennes, etc." },
    { id: "q-exp-causalite-3", operation: "Établir des liens de causalité", numero: 3, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide des documents 1 à 3, établis des liens entre les éléments suivants :",
        bullets: ["Des produits de luxe recherchés par les monarques européens", "Un événement géopolitique majeur au 15e siècle", "Un impact sur les routes commerciales utilisées par les Portugais"],
        instructions: CAUSALITE_INSTRUCTIONS, responseSpace: { type: "lines", count: 8 } },
      reglettes: [{ id: "r-exp-c3", label: "Réglette (3 points)", opLabel: "Établir des liens de causalité", maxPoints: 3, ...RUBRIC_CAUSALITE_3PT }],
      documents: pickDocs('exp-causalite-3', 1, 2, 3),
      corrige: "Les royaumes d'Europe recherchent des épices et de la soie provenant des Indes. Cependant, la prise de Constantinople de 1453 empêche les royaumes européens d'avoir accès à ces produits. Par conséquent, les royaumes d'Europe cherchent une route maritime vers l'Asie, ce que réussira Vasco de Gama pour le Portugal en contournant l'Afrique." },

    // ===== FAITS (6) =====
    { id: "q-exp-faits-1", operation: "Établir des faits", numero: 1, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Indique le nom du traité qui sépare le Nouveau-Monde entre l'Espagne et le Portugal.", responseSpace: { type: "lines", count: 2 } },
      reglettes: [{ id: "r-exp-f1", label: "Réglette (1 point)", ...R_FAITS_1PT }], documents: pickDocs('exp-faits-1', 1), corrige: "Le traité de Tordesillas." },
    { id: "q-exp-faits-2", operation: "Établir des faits", numero: 2, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Comment se nomme le système d'échange entre les métropoles européennes, les colonies européennes et l'Afrique ?", responseSpace: { type: "lines", count: 2 } },
      reglettes: [{ id: "r-exp-f2", label: "Réglette (1 point)", ...R_FAITS_1PT }], documents: pickDocs('exp-faits-1', 2), corrige: "Le commerce triangulaire." },
    { id: "q-exp-faits-3", operation: "Établir des faits", numero: 3, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Indique deux innovations techniques qui favorisent les explorations maritimes du 15e et du 16e siècles.", responseSpace: { type: "lines", count: 3 } },
      reglettes: [{ id: "r-exp-f3", label: "Réglette (2 points)", ...R_FAITS_2PT_3 }], documents: pickDocs('exp-faits-2', 1, 2), corrige: "La boussole et l'astrolabe." },
    { id: "q-exp-faits-4", operation: "Établir des faits", numero: 4, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Indique une civilisation autochtone présente en Amérique lors de la colonisation européenne.", responseSpace: { type: "lines", count: 2 } },
      reglettes: [{ id: "r-exp-f4", label: "Réglette (1 point)", ...R_FAITS_1PT }], documents: pickDocs('exp-faits-2', 3), corrige: "La civilisation aztèque (OU inca)." },
    { id: "q-exp-faits-5", operation: "Établir des faits", numero: 5, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Indique une ressource naturelle exploitée en Amérique par les Européens.", responseSpace: { type: "lines", count: 2 } },
      reglettes: [{ id: "r-exp-f5", label: "Réglette (1 point)", ...R_FAITS_1PT }], documents: pickDocs('exp-faits-3', 1), corrige: "Les métaux précieux OU l'or OU le tabac OU la canne à sucre OU le rhum." },
    { id: "q-exp-faits-6", operation: "Établir des faits", numero: 6, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide du document 2, indique deux objectifs des souverains européens dans le financement des expéditions maritimes du 15e et 16e siècles.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-f6", label: "Réglette (2 points)", ...R_FAITS_2PT_3 }], documents: pickDocs('exp-faits-3', 2), corrige: "Les souverains européens veulent agrandir leur territoire, trouver de nouvelles ressources naturelles, augmenter leur prestige et évangéliser les populations qu'ils rencontreront." },

    // ===== ESPACE (4) =====
    { id: "q-exp-espace-1", operation: "Situer dans l'espace", numero: 1, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide du document 1, situe les différentes métropoles européennes en indiquant la lettre correspondante.",
        responseSpace: { type: "labeled-list", items: ["La France", "L'Espagne", "Le Portugal", "L'Angleterre"] } },
      reglettes: [{ id: "r-exp-e1", label: "Réglette (2 points)", ...R_SITUER_2PT_4 }], documents: pickDocs('exp-espace-1', 1), corrige: ["A", "D", "C", "B"] },
    { id: "q-exp-espace-2", operation: "Situer dans l'espace", numero: 2, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide du document 2, indique la lettre qui correspond à la zone d'influence espagnole et celle correspondant à la zone d'influence portugaise selon le Traité de Tordesillas de 1494.",
        responseSpace: { type: "labeled-list", items: ["Zone d'influence espagnole", "Zone d'influence portugaise"] } },
      reglettes: [{ id: "r-exp-e2", label: "Réglette (1 point)", ...R_SITUER_1PT_2 }], documents: pickDocs('exp-espace-1', 2), corrige: ["A", "B"] },
    { id: "q-exp-espace-3", operation: "Situer dans l'espace", numero: 3, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide du document 1, associe l'expédition maritime au navigateur lui correspondant.",
        responseSpace: { type: "labeled-list", items: ["Christophe Colomb", "Fernand de Magellan", "Vasco de Gama", "Jacques Cartier"] } },
      reglettes: [{ id: "r-exp-e3", label: "Réglette (2 points)", ...R_SITUER_2PT_4 }], documents: pickDocs('exp-espace-2', 1), corrige: ["B", "C", "D", "A"] },
    { id: "q-exp-espace-4", operation: "Situer dans l'espace", numero: 4, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide du document 2, indique la lettre qui correspond aux mouvements transatlantiques ci-dessous.",
        responseSpace: { type: "labeled-list", items: ["Esclaves africains", "Matières premières", "Produits transformés"] } },
      reglettes: [{ id: "r-exp-e4", label: "Réglette (2 points)", ...R_SITUER_2PT_T3 }], documents: pickDocs('exp-espace-2', 2), corrige: ["C", "A", "B"] },

    // ===== TEMPS (4) =====
    { id: "q-exp-temps-1", operation: "Situer dans le temps", numero: 1, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide du document 1, indique la lettre qui correspond à la période où se sont déroulées les grandes explorations maritimes.",
        responseSpace: { type: "labeled-list", items: ["Grandes explorations maritimes"] } },
      reglettes: [{ id: "r-exp-t1", label: "Réglette (1 point)", ...R_SITUER_1PT_1 }], documents: pickDocs('exp-temps-1', 1), corrige: ["B"] },
    { id: "q-exp-temps-2", operation: "Situer dans le temps", numero: 2, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Les documents 2 et 3 présentent des faits se déroulant lors du 15e et du 16e siècles. Indique si les faits présentés surviennent avant ou après la découverte de l'Amérique par Christophe Colomb.",
        responseSpace: { type: "before-after-axis", beforeLabel: "Antériorité (Avant)", afterLabel: "Postériorité (Après)", pivot: "Découverte de l'Amérique par Christophe Colomb (1492)" } },
      reglettes: [{ id: "r-exp-t2", label: "Réglette (1 point)", ...R_SITUER_1PT_T2 }], documents: pickDocs('exp-temps-1', 2, 3), corrige: { before: ["Document 3"], after: ["Document 2"] } },
    { id: "q-exp-temps-3", operation: "Situer dans le temps", numero: 3, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Place en ordre chronologique les documents 1 à 3.",
        responseSpace: { type: "chrono-ordering", items: ["1er (le plus ancien)", "2e", "3e (le plus récent)"] } },
      reglettes: [{ id: "r-exp-t3", label: "Réglette (2 points)", ...R_SITUER_2PT_T3 }], documents: pickDocs('exp-temps-2', 1, 2, 3), corrige: ["Document 3", "Document 2", "Document 1"] },
    { id: "q-exp-temps-4", operation: "Situer dans le temps", numero: 4, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Sur la ligne du temps du document 4, encercle la lettre correspondant aux faits présentés dans le document 2. Inscris ta réponse ci-dessous.",
        responseSpace: { type: "labeled-list", items: ["Lettre correspondante"] } },
      reglettes: [{ id: "r-exp-t4", label: "Réglette (1 point)", ...R_SITUER_1PT_T1 }],
      documents: [
        DOCS['exp-temps-2'][1],  // Document 2 : Christophe Colomb
        { id: "exp-t4-timeline", title: "Document 4 : Ligne du temps", layout: "image-only",
          imageUrl: "assets/img/exp-temps-2/timeline.png", imageWidthCm: 13,
          sources: ["Source : Mathieu Mercier."] }
      ],
      corrige: ["B"] },

    // ===== RELATION (4) =====
    { id: "q-exp-relation-1", operation: "Mettre en relation des faits", numero: 1, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Les documents 1 à 3 correspondent à des causes des grandes explorations maritimes du 15e et du 16e siècles. Associe les documents 1 à 3 à la cause économique, culturelle ou politique lui correspondant.",
        responseSpace: { type: "labeled-list", items: ["Cause économique (Document n°)", "Cause politique (Document n°)", "Cause culturelle (Document n°)"] } },
      reglettes: [{ id: "r-exp-r1", label: "Réglette (2 points)", ...R_RELATION_2PT_3 }], documents: pickDocs('exp-relation-1', 1, 2, 3), corrige: ["1", "3", "2"] },
    { id: "q-exp-relation-2", operation: "Mettre en relation des faits", numero: 2, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Lors du premier contact avec les Européens, les Autochtones ont subi des conséquences néfastes. Indique, en cochant dans la case appropriée, si le document 4 représente une conséquence sociale ou s'il représente une conséquence culturelle de la colonisation de l'Amérique.",
        responseSpace: { type: "checkbox-table", columns: ["Conséquence sociale", "Conséquence culturelle"], rows: ["Document 4"] } },
      reglettes: [{ id: "r-exp-r2", label: "Réglette (1 point)", ...R_RELATION_1PT }], documents: pickDocs('exp-relation-1', 4), corrige: [[false, true]] },
    { id: "q-exp-relation-3", operation: "Mettre en relation des faits", numero: 3, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Associe les documents 1 à 3 à l'innovation technique lui correspondant.",
        responseSpace: { type: "labeled-list", items: ["La caravelle (Document n°)", "L'astrolabe (Document n°)", "Le portulan (Document n°)"] } },
      reglettes: [{ id: "r-exp-r3", label: "Réglette (2 points)", ...R_RELATION_2PT_3 }], documents: pickDocs('exp-relation-2', 1, 2, 3), corrige: ["1", "3", "2"] },
    { id: "q-exp-relation-4", operation: "Mettre en relation des faits", numero: 4, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Un empire correspond à une métropole et à tous les territoires sous son contrôle. À l'aide des documents 4 et 5, indique le document qui correspond à une métropole et le document qui correspond à une colonie.",
        responseSpace: { type: "labeled-list", items: ["Métropole (Document n°)", "Colonie (Document n°)"] } },
      reglettes: [{ id: "r-exp-r4", label: "Réglette (2 points)", ...R_RELATION_2PT_2 }], documents: pickDocs('exp-relation-2', 4, 5), corrige: ["4", "5"] },

    // ===== CAUSES (6) =====
    { id: "q-exp-causes-1", operation: "Déterminer des causes et des conséquences", numero: 1, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide des documents 1 et 2, détermine le document qui présente une cause de la recherche d'une route vers les Indes et le document qui en présente une conséquence.",
        responseSpace: { type: "labeled-list", items: ["Cause (Document n°)", "Conséquence (Document n°)"] } },
      reglettes: [{ id: "r-exp-ca1", label: "Réglette (2 points)", ...R_CAUSES_2PT_CAUSE_CONS }], documents: pickDocs('exp-causes-1', 1, 2), corrige: ["1", "2"] },
    { id: "q-exp-causes-2", operation: "Déterminer des causes et des conséquences", numero: 2, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide du document 3, détermine une conséquence linguistique de la colonisation de l'Amérique par les Européens.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-ca2", label: "Réglette (2 points)", ...R_CAUSES_2PT_CONSEQ }], documents: pickDocs('exp-causes-1', 3), corrige: "Les populations des colonies adoptent la langue des métropoles." },
    { id: "q-exp-causes-3", operation: "Déterminer des causes et des conséquences", numero: 3, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Détermine une cause des explorations maritimes des 15e et 16e siècles.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-ca3", label: "Réglette (2 points)", ...R_CAUSES_2PT_CAUSE }], documents: pickDocs('exp-causes-2', 2), corrige: "La prise de Constantinople en 1453 OU les taxes imposées par les Turcs Ottomans après la prise de Constantinople en 1453." },
    { id: "q-exp-causes-4", operation: "Déterminer des causes et des conséquences", numero: 4, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Détermine un impact du commerce triangulaire sur certaines nations africaines.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-ca4", label: "Réglette (2 points)", ...R_CAUSES_2PT_CONSEQ }], documents: pickDocs('exp-causes-2', 1), corrige: "Certaines populations africaines sont mises en esclavage et transportées en Amérique afin d'exploiter les ressources naturelles." },
    { id: "q-exp-causes-5", operation: "Déterminer des causes et des conséquences", numero: 5, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Détermine une cause des explorations maritimes des 15e et 16e siècles.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-ca5", label: "Réglette (2 points)", ...R_CAUSES_2PT_CAUSE }], documents: pickDocs('exp-causes-3', 1), corrige: "Une des causes des explorations maritimes est le désir d'évangéliser des populations non converties à travers le monde." },
    { id: "q-exp-causes-6", operation: "Déterminer des causes et des conséquences", numero: 6, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide des documents 1 et 2, indique le document qui correspond à une cause culturelle de la colonisation de l'Amérique et le document qui correspond à une conséquence culturelle de cette colonisation.",
        responseSpace: { type: "labeled-list", items: ["Cause culturelle (Document n°)", "Conséquence culturelle (Document n°)"] } },
      reglettes: [{ id: "r-exp-ca6", label: "Réglette (2 points)", ...R_CAUSES_2PT_CAUSE_CONS }], documents: pickDocs('exp-causes-3', 1, 2), corrige: ["1", "2"] },

    // ===== DIFFÉRENCES (4) =====
    { id: "q-exp-differences-1", operation: "Dégager des différences et des similitudes", numero: 1, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Dégage une différence dans les routes maritimes empruntées par les navigateurs espagnols et portugais.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-di1", label: "Réglette (2 points)", ...R_DIFFERENCES_2PT }], documents: pickDocs('exp-differences-1', 1), corrige: "Les Espagnols partent vers l'ouest (océan Atlantique) alors que les Portugais contournent l'Afrique afin d'atteindre les Indes." },
    { id: "q-exp-differences-2", operation: "Dégager des différences et des similitudes", numero: 2, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Les documents 2 et 3 traitent des Autochtones d'Amérique. Indique le point de divergence entre Bartholomé de Las Casas et les conquistadors espagnols sur les civilisations incas et aztèques.", responseSpace: { type: "lines", count: 5 } },
      reglettes: [{ id: "r-exp-di2", label: "Réglette (2 points)", ...R_DIFFERENCES_2PT }], documents: pickDocs('exp-differences-1', 2, 3), corrige: "Bartholomé de Las Casas considère que les civilisations présentes en Amérique sont civilisées et développées, alors que les conquistadors espagnols les considèrent comme des sauvages qu'on doit dominer." },
    { id: "q-exp-differences-3", operation: "Dégager des différences et des similitudes", numero: 3, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Dégage une différence dans le rôle de l'Afrique et de l'Amérique à l'intérieur du commerce triangulaire.", responseSpace: { type: "lines", count: 5 } },
      reglettes: [{ id: "r-exp-di3", label: "Réglette (2 points)", ...R_DIFFERENCES_2PT }], documents: pickDocs('exp-differences-2', 1), corrige: "Dans le commerce triangulaire, le rôle de l'Afrique est de fournir des esclaves pour les colonies, alors que le rôle de l'Amérique est l'exportation de matières premières vers l'Europe." },
    { id: "q-exp-differences-4", operation: "Dégager des différences et des similitudes", numero: 4, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide des documents 2 et 3, dégage une similitude dans les objectifs des royaumes européens lors de la colonisation de l'Amérique.", responseSpace: { type: "lines", count: 5 } },
      reglettes: [{ id: "r-exp-di4", label: "Réglette (2 points)", ...R_SIMILITUDES_2PT }], documents: pickDocs('exp-differences-2', 2, 3), corrige: "L'objectif des royaumes européens est d'agrandir leur territoire OU de posséder le plus de territoire OU de posséder de nombreuses ressources naturelles dans plusieurs régions de la planète OU d'être le royaume le plus puissant en termes de richesses et de territoires possédés." },

    // ===== CHANGEMENTS (4) =====
    { id: "q-exp-changements-1", operation: "Déterminer des changements et des continuités", numero: 1, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide du document 1, détermine un changement dans les routes utilisées pour se rendre aux Indes suite à la prise de Constantinople en 1453.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-ch1", label: "Réglette (2 points)", ...R_CHGT_2PT_CHGT }], documents: pickDocs('exp-changements-1', 1), corrige: "Suite à la prise de Constantinople, les royaumes européens cherchent à emprunter une route maritime vers les Indes." },
    { id: "q-exp-changements-2", operation: "Déterminer des changements et des continuités", numero: 2, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "À l'aide des documents 2 et 3, détermine un changement culturel chez les civilisations autochtones d'Amérique.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-ch2", label: "Réglette (2 points)", ...R_CHGT_2PT_CHGT }], documents: pickDocs('exp-changements-1', 2, 3), corrige: "Les civilisations autochtones d'Amérique remplacent leurs croyances polythéistes en adoptant le christianisme (monothéisme)." },
    { id: "q-exp-changements-3", operation: "Déterminer des changements et des continuités", numero: 3, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Détermine un changement dans les lieux d'approvisionnement des métaux précieux pour les Européens aux 15e et 16e siècles.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-ch3", label: "Réglette (2 points)", ...R_CHGT_2PT_CHGT }], documents: pickDocs('exp-changements-2', 1, 2), corrige: "Alors que les Européens s'approvisionnaient en or et en métaux précieux en Afrique avant le 15e siècle, ils se tournent dorénavant vers l'Amérique afin de subvenir à ce besoin." },
    { id: "q-exp-changements-4", operation: "Déterminer des changements et des continuités", numero: 4, niveau: 2, realite_sociale_id: "expansion-europeenne",
      questionBody: { prompt: "Détermine un changement dans les langues utilisées en Amérique du Sud suite à la présence des Européens.", responseSpace: { type: "lines", count: 4 } },
      reglettes: [{ id: "r-exp-ch4", label: "Réglette (2 points)", ...R_CHGT_2PT_CHGT }], documents: pickDocs('exp-changements-2', 3), corrige: "À la suite du contact entre les civilisations européennes et autochtones en Amérique, ces derniers se voient forcés d'adopter les langues des peuples colonisateurs." }
  ]
};

})();
