// ⚙️  Édite ce fichier pour personnaliser ton portfolio.
// Pas besoin de toucher au reste du code.

export const site = {
  name: "TenGoKu",
  role: "Développeur & PM Maker GMod — Sites web, Bots Discord & Outils",
  tagline:
    "Je crée des player models pour Garry's Mod, je conçois des sites web, des bots Discord et des outils. Bientôt : mon app de compression et d'optimisation de player models.",

  // Ta photo de profil (hero). Remplace le placeholder :
  // dépose ta photo dans public/ (ex: public/avatar.png) puis mets son
  // chemin ici, ex: "/avatar.png". Laisse "" pour afficher une initiale.
  avatar: "/avatar.jpg",

  // Ton ID Discord : sert au bouton "Me contacter en DM" sur les demandes.
  discordUserId: "806590748791144448",

  // Tes liens (mets tes vraies URLs). Laisse vide "" pour cacher un lien.
  socials: {
    github: "https://github.com/tengoku13",
    discord: "", // ex: lien d'invitation de ton serveur
    twitter: "",
    youtube: "",
    email: "tengokutengoku963@gmail.com",
  },

  // Tes projets à mettre en avant.
  // "link" = URL cliquable (laisse "" si pas encore de lien).
  // Remplace les descriptions / liens par tes vrais projets.
  projects: [
    {
      title: "Compresseur de Player Models",
      category: "Application",
      status: "Bientôt disponible",
      description:
        "Mon app qui compresse et optimise les player models pour réduire leur taille et améliorer les performances, sans perte visible de qualité.",
      tags: ["Optimisation", "Player Models", "App"],
      link: "",
    },
    {
      title: "Player Models GMod",
      category: "Garry's Mod",
      status: "Actif",
      description:
        "Création, port et rig de player models sur mesure pour Garry's Mod : personnages, skins, viewmodels, prêts à l'emploi et optimisés.",
      tags: ["Garry's Mod", "Player Models", "3D", "Rig"],
      link: "",
    },
    {
      title: "Bots Discord",
      category: "Bots",
      status: "Actif",
      description:
        "Bots Discord sur mesure : modération, automatisation, systèmes de tickets, intégrations.",
      tags: ["Discord", "Node.js", "Automatisation"],
      link: "",
    },
    {
      title: "Site — Projet 1",
      category: "Site web",
      status: "En ligne",
      description:
        "Remplace ce texte par le nom et la description de ton 1er site. Ajoute le lien dans \"link\" pour le rendre cliquable.",
      tags: ["Next.js", "Web"],
      link: "",
    },
    {
      title: "Site — Projet 2",
      category: "Site web",
      status: "En ligne",
      description:
        "Remplace ce texte par le nom et la description de ton 2e site.",
      tags: ["Web"],
      link: "",
    },
    {
      title: "Site — Projet 3",
      category: "Site web",
      status: "En ligne",
      description:
        "Remplace ce texte par le nom et la description de ton 3e site.",
      tags: ["Web"],
      link: "",
    },
  ],

  // Types de demandes proposés dans le formulaire.
  // "eta" = temps estimé de réalisation (indicatif, affiché sur le formulaire).
  requestTypes: [
    { value: "pm_create", label: "Créer un player model (GMod)", eta: "~ 2 à 3 jours" },
    { value: "pm_modify", label: "Modifier / éditer un player model", eta: "~ 1 jour" },
    { value: "pm_compress", label: "Compresser / optimiser un player model", eta: "~ 1 heure" },
    { value: "pm_port", label: "Porter un modèle vers GMod", eta: "~ 1 à 2 jours" },
    { value: "pm_rig", label: "Rig / animation d'un player model", eta: "~ 1 à 2 jours" },
    { value: "pm_texture", label: "Retexture / reskin d'un player model", eta: "~ 1 jour" },
    { value: "site", label: "Faire un site web", eta: "~ 3 à 7 jours" },
    { value: "bot", label: "Créer un bot Discord", eta: "~ 2 à 5 jours" },
    { value: "autre", label: "Autre demande", eta: "à définir ensemble" },
  ],

  // Cases à cocher proposées sur le formulaire de demande (précisions).
  // Édite librement cette liste.
  checklist: [
    "Fournir les fichiers sources",
    "Optimisation / compression incluse",
    "Rig complet (visage, doigts)",
    "Viewmodels / c_hands",
    "Bodygroups / skins multiples",
    "Jigglebones (cheveux, tissus...)",
    "Livraison prioritaire (urgent)",
  ],

  // Infos utilisées par le footer et les pages légales (Terms / Privacy).
  legal: {
    country: "Suisse",
    madeIn: "Made in Switzerland",
    contactEmail: "tengokutengoku963@gmail.com",
    lastUpdated: "2026-07-31",
  },
};
