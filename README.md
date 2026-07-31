# site-web — Portfolio + Login Discord + Demandes

Portfolio personnel (TenGoKu) avec :

- 🎨 **Page portfolio** — présentation, projets, liens (GitHub, etc.)
- 🔐 **Connexion Discord** (OAuth2, sans bot) — les visiteurs se connectent avec leur compte Discord
- 📝 **Formulaire de demande** — les gens connectés t'envoient des demandes (compresser un player model, faire un site, etc.)
- 📊 **Tableau de bord admin** — tu vois toutes les demandes reçues et tu changes leur statut

Stack : **Next.js 15** (App Router) + **SQLite** (via better-sqlite3). Tout dans un seul projet, idéal pour un VPS.

---

## 1. Configuration

Copie le fichier d'exemple et remplis-le :

```bash
cp .env.example .env
```

Variables à renseigner :

| Variable | À quoi ça sert |
|----------|----------------|
| `DISCORD_CLIENT_ID` | ID de ton application Discord |
| `DISCORD_CLIENT_SECRET` | Secret de ton application Discord |
| `NEXT_PUBLIC_BASE_URL` | URL du site (`http://localhost:3000` en local, `https://ton-domaine.fr` en prod) |
| `ADMIN_DISCORD_ID` | **Ton** ID Discord (seul compte qui voit le tableau de bord admin) |
| `SESSION_SECRET` | Une longue chaîne aléatoire (`openssl rand -hex 32`) |

### Créer l'application Discord

1. Va sur https://discord.com/developers/applications → **New Application**
2. Onglet **OAuth2** → copie le **Client ID** et le **Client Secret**
3. Dans **Redirects**, ajoute :
   - `http://localhost:3000/api/auth/callback` (pour tester en local)
   - `https://ton-domaine.fr/api/auth/callback` (pour la prod)
4. Récupère ton **ID Discord** : Paramètres Discord → Avancé → active le **Mode développeur**, puis clic droit sur ton profil → **Copier l'identifiant**.

---

## 2. Lancer en local

```bash
npm install
npm run dev
```

Site sur http://localhost:3000

---

## 3. Déployer sur un VPS OVH

> 📘 **Guide complet pas-à-pas (sécurisation du VPS + déploiement) : [`DEPLOY.md`](./DEPLOY.md)** — adapté à `tengoku.ch`.
>
> Résumé : **VPS OVH** (pas l'hébergement mutualisé) + **nom de domaine** + **SSL Let's Encrypt gratuit**.

### a) Prépare le VPS

Connecte-toi en SSH, puis installe Node et PM2 (gestionnaire de process) :

```bash
# Node.js 22 (LTS)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git

# PM2 pour garder le site allumé en permanence
sudo npm install -g pm2
```

### b) Récupère et build le projet

```bash
git clone <ton-repo> site-web
cd site-web
cp .env.example .env
nano .env          # remplis les variables (avec NEXT_PUBLIC_BASE_URL = https://ton-domaine.fr)
npm install
npm run build
```

### c) Lance le site avec PM2

```bash
pm2 start "npm run start" --name site-web
pm2 save
pm2 startup        # suis la commande affichée pour démarrage auto au reboot
```

Le site tourne sur le port **3000**.

### d) Mets Nginx devant + HTTPS

```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

Crée `/etc/nginx/sites-available/site-web` :

```nginx
server {
    server_name ton-domaine.fr www.ton-domaine.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Active-le et génère le certificat SSL gratuit :

```bash
sudo ln -s /etc/nginx/sites-available/site-web /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d ton-domaine.fr -d www.ton-domaine.fr
```

> **DNS** : dans l'espace OVH de ton nom de domaine, fais pointer un enregistrement **A** vers l'IP de ton VPS.

### e) Mettre à jour plus tard

```bash
cd site-web
git pull
npm install
npm run build
pm2 restart site-web
```

---

## Personnaliser le contenu

Tout le contenu du portfolio (nom, projets, liens, types de demandes) est dans **`src/data/site.js`**. Édite ce fichier, aucun besoin de toucher au code.

---

## La base de données

Un simple fichier SQLite dans `data/site.db` (créé automatiquement).
Pour sauvegarder tes demandes : copie ce fichier. Rien d'autre à gérer.

## Pour aller plus loin (plus tard)

- 🔔 Notification Discord à chaque demande (webhook ou bot)
- 🎭 Attribution automatique d'un rôle Discord aux inscrits
- 🗄️ Migration vers PostgreSQL si le trafic grossit
