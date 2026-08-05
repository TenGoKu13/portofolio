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

  // Section "À propos" + compétences (page d'accueil).
  // Édite librement le texte et les groupes de compétences.
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

  // Chiffres mis en avant sur l'accueil (preuve sociale).
  // "value" = nombre, "suffix" = ce qui s'affiche après (ex: "+").
  stats: [
    { value: 25, suffix: "+", label: "Commandes livrées" },
    { value: 20, suffix: "+", label: "Player models" },
    { value: 3, suffix: "", label: "Sites web" },
    { value: 1, suffix: "", label: "Application" },
    { value: 1, suffix: "", label: "Bot Discord" },
  ],

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

  // Exemples de sites web déjà réalisés (galerie "Réalisations web").
  // Chaque exemple : titre, sous-titre, description, stack, fonctionnalités,
  // une image principale (cover) et des captures supplémentaires (shots).
  // Dépose les images dans public/examples/ et référence-les ici.
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

  // 🎮 Galerie Player Models (page /player-models).
  // Dépose tes rendus dans public/player-models/ puis ajoute une entrée ici.
  // Chaque entrée : image (obligatoire), title, tags (facultatifs).
  // Exemple :
  //   { image: "/player-models/goku.jpg", title: "Goku custom", tags: ["Rig", "Bodygroups"] },
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
    },
    {
      image: "/player-models/hitbox-edition.jpg",
      title: "Modification de la hitbox — équilibrage combat",
      tags: ["Hitbox", "Après", "Anti-cheat"],
    },
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
    // Hébergeur du site (obligatoire dans les mentions légales).
    host: {
      name: "OVH SAS (OVHcloud)",
      address: "2 rue Kellermann, 59100 Roubaix, France",
      website: "https://www.ovhcloud.com",
      product: "VPS OVHcloud",
    },
  },
};
