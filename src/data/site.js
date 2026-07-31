// ⚙️  Édite ce fichier pour personnaliser ton portfolio.
// Pas besoin de toucher au reste du code.

export const site = {
  name: "TenGoKu",
  role: "Développeur — Sites web, Bots Discord & Outils",
  tagline:
    "Je conçois des sites web, des bots Discord et des outils. Bientôt : mon app de compression et d'optimisation de player models.",

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
  requestTypes: [
    { value: "playermodel", label: "Compresser / optimiser un player model" },
    { value: "site", label: "Faire un site web" },
    { value: "bot", label: "Créer un bot Discord" },
    { value: "autre", label: "Autre demande" },
  ],
};
