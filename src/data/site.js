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

  // Tes liens (mets tes vraies URLs). Laisse vide "" pour cacher un lien.
  socials: {
    github: "https://github.com/tengoku13",
    discord: "", // ex: lien d'invitation de ton serveur
    twitter: "",
    youtube: "",
    email: "tengokutengoku963@gmail.com",
  },

  // Tes projets à mettre en avant.
  projects: [
    {
      title: "Player Models GMod",
      status: "Actif",
      description:
        "Création, port et rig de player models sur mesure pour Garry's Mod : personnages, skins, viewmodels, prêts à l'emploi et optimisés.",
      tags: ["Garry's Mod", "Player Models", "3D", "Rig"],
      link: "",
    },
    {
      title: "Compresseur de Player Models",
      status: "Bientôt disponible",
      description:
        "Une app qui compresse et optimise les player models pour réduire leur taille et améliorer les performances, sans perte visible de qualité.",
      tags: ["Optimisation", "Player Models", "App"],
      link: "",
    },
    {
      title: "Bots Discord",
      status: "Actif",
      description:
        "Développement de bots Discord sur mesure : modération, automatisation, systèmes de tickets, intégrations.",
      tags: ["Discord", "Node.js", "Automatisation"],
      link: "",
    },
    {
      title: "Sites web sur mesure",
      status: "Sur demande",
      description:
        "Création de sites web modernes et responsives, du portfolio à l'application web complète.",
      tags: ["Next.js", "React", "Web"],
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
};
