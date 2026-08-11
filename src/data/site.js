export const site = {
  name: "TenGoKu",
  role: "Développeur & PM Maker GMod — Sites web, Bots Discord & Outils",
  tagline:
    "Je crée des player models pour Garry's Mod, je conçois des sites web, des bots Discord et des outils. Bientôt : mon app de compression et d'optimisation de player models.",

  avatar: "/avatar.jpg",

  discordUserId: "806590748791144448",

  socials: {
    github: "https://github.com/tengoku13",
    discord: "",
    twitter: "",
    youtube: "",
    email: "tengokutengoku963@gmail.com",
  },

  about: {
    text: [
      "Je crée des player models pour Garry's Mod depuis plusieurs années : création, port, rig, retexture et optimisation. À côté, je développe des sites web modernes, des bots Discord et des outils sur mesure.",
      "Chaque projet est livré propre, optimisé et prêt à l'emploi. Besoin de quelque chose ? Envoie-moi une demande, on en discute.",
    ],
    skills: [
      {
        group: "Création 3D & GMod",
        items: [
          "Player models",
          "Rig",
          "Blender",
          "Port de modèles",
          "Retexture",
          "Bodygroups",
          "Jigglebones",
          "Optimisation / compression",
        ],
      },
      {
        group: "Développement web",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
      },
      {
        group: "Bots & outils",
        items: ["Bots Discord", "Automatisation", "APIs", "Google Sheets"],
      },
      {
        group: "Hébergement",
        items: ["VPS", "Vercel", "Nginx"],
      },
    ],
  },

  stats: [
    { value: 25, suffix: "+", label: "Commandes livrées" },
    { value: 20, suffix: "+", label: "Player models" },
    { value: 3, suffix: "", label: "Sites web" },
    { value: 1, suffix: "", label: "Application" },
    { value: 1, suffix: "", label: "Bot Discord" },
  ],

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
      link: "/player-models",
      cta: "Voir la galerie",
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
      title: "Sites web sur mesure",
      category: "Site web",
      status: "Sur demande",
      description:
        "Sites et applications web modernes, du portfolio à la plateforme complète.",
      tags: ["Next.js", "React", "Web"],
      link: "/realisations",
      cta: "Voir mes réalisations",
    },
  ],

  webExamples: [
    {
      slug: "ait-medical-corps",
      title: "AIT Medical Corps — Gestion VM",
      subtitle: "Plateforme médicale RP tout-en-un",
      status: "Réalisé",
      description:
        "Application web complète regroupant 4 modules autour d'un espace médical : Rapport AMC (rapports hebdomadaires + statistiques d'équipe), Gestion VM (visites médicales, ordonnances, planning de RDV), Espace Encadrement (validation, commandement, blacklist, opérations) et Effectif (grades, présences, distinctions). Données stockées dans Google Sheets, rôles dérivés du grade via NextAuth, interface « HUD » sombre avec parcours de prise de RDV en 3 étapes en accès libre.",
      cover: "/examples/ait-medical-home.jpeg",
      shots: ["/examples/ait-medical-home.jpeg", "/examples/ait-medical-rdv.jpeg"],
      stack: [
        "Next.js 14",
        "React 18",
        "TypeScript",
        "Tailwind CSS",
        "NextAuth",
        "Google Sheets API",
        "Recharts",
        "jsPDF",
        "Vercel",
      ],
      features: [
        "Authentification par rôle",
        "Dashboard & statistiques (Recharts)",
        "Prise de RDV multi-étapes",
        "Génération d'ordonnances / PDF",
        "Gestion effectif & médailles",
        "Espace admin / validation",
        "PWA (icônes, manifest)",
      ],
      link: "",
    },
    {
      slug: "rapport-ingenieur",
      title: "Système Rapport Ingénieur",
      subtitle: "Suivi hebdomadaire des ingénieurs de combat",
      status: "Réalisé",
      description:
        "Application dédiée au reporting d'une section technique. Espace membre (dashboard, nouveau rapport, historique, carrière, absences) et espace administrateur complet (effectif, validation des rapports, sanctions, blacklist, organigramme, santé de l'effectif, journal, réglages système). Accès différencié entre l'espace public/rapports et la connexion « Ingénieur Cadre / en Chef ». Identité visuelle orange/noir monospace « terminal » avec compteurs en temps réel.",
      cover: "/examples/ingenieur-home.jpeg",
      shots: ["/examples/ingenieur-home.jpeg", "/examples/ingenieur-login.jpeg"],
      stack: [
        "Next.js 14",
        "React 18",
        "TypeScript",
        "Tailwind CSS",
        "NextAuth",
        "Google Sheets API",
        "Recharts",
        "lucide-react",
        "sonner",
        "Vercel",
      ],
      features: [
        "Double espace membre / admin",
        "Soumission & validation de rapports hebdomadaires",
        "Statistiques et évolution",
        "Gestion d'effectif, sanctions & blacklist",
        "Organigramme",
        "Flux d'inscription / mot de passe",
        "Notifications toast",
      ],
      link: "",
    },
    {
      slug: "ciapt",
      title: "Gestion CIAPT",
      subtitle: "Inscriptions & certifications",
      status: "Réalisé",
      description:
        "Application centrée sur la gestion d'un référentiel de certifications. Vérification publique sans connexion (recherche par nom, Steam ID ou Discord ID), tableau de bord instructeurs (KPIs, sparklines, alertes de renouvellement, statistiques mensuelles), saisie des inscriptions, blacklist, espace documents et administration (utilisateurs, journaux). Une tâche cron gère les renouvellements. Design SaaS épuré, thème violet, sparklines SVG maison et permissions par rôle.",
      cover: "/examples/ciapt-dashboard.jpeg",
      shots: ["/examples/ciapt-dashboard.jpeg"],
      stack: [
        "Next.js 14",
        "React 18",
        "NextAuth",
        "Google Sheets API",
        "Vercel (cron jobs)",
      ],
      features: [
        "Vérification publique de certification",
        "Dashboard KPIs + sparklines SVG",
        "Alertes de renouvellement automatiques",
        "Saisie & historique",
        "Blacklist",
        "Gestion documentaire",
        "Admin utilisateurs / logs",
        "Cron de renouvellement",
      ],
      link: "",
    },
  ],

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

  playerModels: [
    {
      image: "/player-models/fim-beta1.jpg",
      title: "Skin FIM Beta 1 — Cosmos Community",
      tags: ["Skin", "Bodygroups", "Tactique"],
    },
    {
      image: "/player-models/hitbox-ingame.jpg",
      title: "Hitbox d'origine (avant modification)",
      tags: ["Hitbox", "Avant"],
      badge: "AVANT",
      badgeTone: "before",
    },
    {
      image: "/player-models/hitbox-edition.jpg",
      title: "Modification de la hitbox — équilibrage combat",
      tags: ["Hitbox", "Après", "Anti-cheat"],
      badge: "APRÈS",
      badgeTone: "after",
    },
  ],

  checklist: [
    "Fournir les fichiers sources",
    "Optimisation / compression incluse",
    "Rig complet (visage, doigts)",
    "Viewmodels / c_hands",
    "Bodygroups / skins multiples",
    "Jigglebones (cheveux, tissus...)",
    "Livraison prioritaire (urgent)",
  ],

  legal: {
    country: "Suisse",
    madeIn: "Made in Switzerland",
    contactEmail: "tengokutengoku963@gmail.com",
    lastUpdated: "2026-07-31",

    host: {
      name: "OVH SAS (OVHcloud)",
      address: "2 rue Kellermann, 59100 Roubaix, France",
      website: "https://www.ovhcloud.com",
      product: "VPS OVHcloud",
    },
  },
};
