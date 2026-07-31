# 🚀 Déploiement & sécurisation du VPS OVH — tengoku.ch

Guide complet, étape par étape, pour :

1. Sécuriser ton VPS (utilisateur non-root, SSH, firewall, fail2ban, mises à jour auto)
2. Installer et lancer le site
3. Brancher le nom de domaine **tengoku.ch** + HTTPS gratuit

> **Tes infos** (utilisées dans ce guide)
> - Domaine : `tengoku.ch`
> - IP du VPS : `164.132.64.223`
> - ID Discord admin : `806590748791144448` (déjà mis dans `.env.example`)

Suis les parties **dans l'ordre**. Chaque bloc de commandes se copie-colle.

---

## Partie 0 — Se connecter au VPS

Depuis ton PC (terminal / PowerShell), connecte-toi en root (mot de passe reçu par mail d'OVH) :

```bash
ssh root@164.132.64.223
```

> 💡 Si c'est la première connexion, tape `yes` pour accepter l'empreinte du serveur.

---

## Partie 1 — Mettre le système à jour

```bash
apt update && apt upgrade -y
apt install -y curl git ufw fail2ban unattended-upgrades
reboot
```

Le VPS redémarre. Attends ~30 s et reconnecte-toi (`ssh root@164.132.64.223`).

---

## Partie 2 — Créer un utilisateur non-root

Travailler en root en permanence est dangereux. On crée ton compte perso (remplace `tengoku` par ce que tu veux) :

```bash
adduser tengoku            # choisis un mot de passe solide
usermod -aG sudo tengoku   # lui donner les droits admin (sudo)
```

---

## Partie 3 — Sécuriser la connexion SSH (clé au lieu de mot de passe)

### 3.1 — Créer une clé SSH sur TON PC (pas sur le VPS)

Ouvre un **nouveau** terminal sur ton PC (garde celui du VPS ouvert à côté) :

```bash
# Sur ton PC
ssh-keygen -t ed25519 -C "tengoku"      # Entrée à toutes les questions
ssh-copy-id tengoku@164.132.64.223       # tape le mot de passe du user tengoku
```

> Sous Windows sans `ssh-copy-id` : `type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh tengoku@164.132.64.223 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"`

Teste la connexion par clé (elle ne doit PAS demander de mot de passe) :

```bash
# Sur ton PC
ssh tengoku@164.132.64.223
```

Si ça marche → tu es connecté en tant que `tengoku`. Continue ci-dessous **dans cette session**.

### 3.2 — Durcir la config SSH

```bash
sudo nano /etc/ssh/sshd_config
```

Vérifie / modifie ces lignes (enlève le `#` devant si besoin) :

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Enregistre (`Ctrl+O`, `Entrée`, `Ctrl+X`), puis recharge SSH :

```bash
sudo systemctl restart ssh
```

> ⚠️ **Ne ferme pas ta session actuelle** avant d'avoir vérifié dans un nouveau terminal que `ssh tengoku@164.132.64.223` fonctionne toujours. À partir de maintenant, root ne peut plus se connecter et le mot de passe SSH est désactivé — seule ta clé fonctionne.

---

## Partie 4 — Firewall (UFW)

On n'ouvre que le strict nécessaire : SSH (22), HTTP (80), HTTPS (443).

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable          # répondre "y"
sudo ufw status
```

---

## Partie 5 — fail2ban (anti brute-force SSH)

Il bannit automatiquement les IP qui essaient de forcer la connexion.

```bash
sudo systemctl enable --now fail2ban
sudo systemctl status fail2ban --no-pager
```

C'est déjà actif avec des réglages par défaut corrects pour SSH.

---

## Partie 6 — Mises à jour de sécurité automatiques

```bash
sudo dpkg-reconfigure -plow unattended-upgrades   # choisir "Yes"
```

Le VPS installera désormais tout seul les correctifs de sécurité. (Pense quand même à faire `sudo apt update && sudo apt upgrade` de temps en temps.)

---

## Partie 7 — Installer Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs build-essential python3
node -v      # doit afficher v22.x
```

> `build-essential` et `python3` servent à compiler `better-sqlite3` (la base de données).

Installe **PM2** (garde le site allumé 24/7, redémarre au reboot) :

```bash
sudo npm install -g pm2
```

---

## Partie 8 — Récupérer et configurer le site

```bash
cd ~
git clone https://github.com/TenGoKu13/site-web.git
cd site-web
git checkout claude/portfolio-discord-integration-bpbydx   # ou main si déjà fusionné
cp .env.example .env
nano .env
```

Dans `.env`, remplis les valeurs manquantes :

| Variable | Valeur |
|----------|--------|
| `DISCORD_CLIENT_ID` | depuis ton app Discord (voir Partie 11) |
| `DISCORD_CLIENT_SECRET` | depuis ton app Discord |
| `NEXT_PUBLIC_BASE_URL` | `https://tengoku.ch` *(déjà pré-rempli)* |
| `ADMIN_DISCORD_ID` | `806590748791144448` *(déjà pré-rempli)* |
| `SESSION_SECRET` | génère-la avec la commande ci-dessous |

Génère un `SESSION_SECRET` aléatoire :

```bash
openssl rand -hex 32
```

Copie le résultat dans `.env`. Enregistre (`Ctrl+O`, `Entrée`, `Ctrl+X`).

Installe et build :

```bash
npm install
npm run build
```

---

## Partie 9 — Lancer le site avec PM2

```bash
pm2 start "npm run start" --name site-web
pm2 save
pm2 startup      # copie-colle et exécute la commande qu'il affiche
```

Le site tourne sur le port **3000** (accessible seulement en local pour l'instant — Nginx s'en occupe juste après).

Vérifie qu'il tourne :

```bash
pm2 status
curl -I http://localhost:3000     # doit répondre HTTP 200
```

---

## Partie 10 — DNS + Nginx + HTTPS

### 10.1 — Pointer le domaine vers le VPS

Dans ton espace **OVH** (Web Cloud → Domaines → `tengoku.ch` → Zone DNS), crée/modifie :

| Type | Sous-domaine | Cible |
|------|--------------|-------|
| `A` | *(vide / @)* | `164.132.64.223` |
| `A` | `www` | `164.132.64.223` |

> ⏳ La propagation DNS peut prendre de quelques minutes à quelques heures. Vérifie avec `ping tengoku.ch` — l'IP doit être `164.132.64.223`.

### 10.2 — Installer Nginx + Certbot

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 10.3 — Configurer Nginx en reverse proxy

```bash
sudo nano /etc/nginx/sites-available/tengoku
```

Colle ceci :

```nginx
server {
    listen 80;
    server_name tengoku.ch www.tengoku.ch;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Active le site et recharge Nginx :

```bash
sudo ln -s /etc/nginx/sites-available/tengoku /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

À ce stade, `http://tengoku.ch` doit déjà afficher ton site.

### 10.4 — Activer le HTTPS (certificat gratuit Let's Encrypt)

```bash
sudo certbot --nginx -d tengoku.ch -d www.tengoku.ch
```

- Donne ton email, accepte les conditions.
- Quand il demande la redirection HTTP → HTTPS, choisis **2 (Redirect)**.

Le certificat se **renouvelle tout seul**. Ton site est maintenant sur `https://tengoku.ch` 🔒

---

## Partie 11 — Configurer l'application Discord

1. Va sur https://discord.com/developers/applications → **New Application**.
2. Onglet **OAuth2** → copie le **Client ID** et le **Client Secret** dans ton `.env` (Partie 8).
3. Toujours dans **OAuth2**, section **Redirects**, ajoute exactement :
   ```
   https://tengoku.ch/api/auth/callback
   ```
4. Sauvegarde. Puis sur le VPS, applique le nouveau `.env` :

```bash
cd ~/site-web
nano .env            # colle Client ID + Secret si pas déjà fait
npm run build
pm2 restart site-web
```

Teste : va sur `https://tengoku.ch/demande` → clique "Se connecter avec Discord" → tu dois revenir connecté. Comme ton ID est l'admin, le menu **Admin** apparaît pour toi.

---

## ✅ C'est en ligne !

- Site : `https://tengoku.ch`
- Ton tableau de bord : `https://tengoku.ch/admin` (visible seulement connecté avec **ton** Discord)

---

## 🔄 Mettre à jour le site plus tard

À chaque fois que le code change :

```bash
cd ~/site-web
git pull
npm install
npm run build
pm2 restart site-web
```

## 💾 Sauvegarder les demandes (base de données)

Toutes les demandes sont dans un seul fichier. Pour le sauvegarder :

```bash
cp ~/site-web/data/site.db ~/backup-site-$(date +%F).db
```

## 🛠️ Commandes utiles

```bash
pm2 logs site-web        # voir les logs du site en direct
pm2 restart site-web     # redémarrer le site
pm2 status               # état des process
sudo systemctl status nginx     # état de Nginx
sudo fail2ban-client status sshd # IP bannies
sudo ufw status                  # règles firewall
```

---

## Récap sécurité (ce qu'on a mis en place)

- ✅ Connexion **par clé SSH** uniquement (mot de passe et root SSH désactivés)
- ✅ **Firewall** UFW (seuls 22 / 80 / 443 ouverts)
- ✅ **fail2ban** contre les attaques par force brute
- ✅ **Mises à jour de sécurité automatiques**
- ✅ Utilisateur **non-root** pour le quotidien
- ✅ **HTTPS** avec renouvellement auto
- ✅ Secrets dans `.env` (jamais commité — voir `.gitignore`)
