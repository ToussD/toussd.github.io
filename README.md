# holistic.dev · site vitrine

Site vitrine de **HOLISTIC DEVELOPMENT** (EURL), la société de David Toussaint.
Deux pôles, trois pages, deux identités visuelles.

En ligne : **https://toussd.github.io**

| Page | Rôle | Identité |
| --- | --- | --- |
| `index.html` | Le hub : la marque, deux portes. | Terminal (sombre) |
| `studio.html` | Le studio d'applications mobiles. | Plein air (clair) |
| `services.html` | Le freelance : IA, ingénierie, formations. | Terminal (sombre) |

- **Le studio** : applications mobiles autour du mouvement, du plein air et du jeu.
  4 à 5 apps sur les 12 prochains mois. Les noms sont volontairement caviardés tant
  que rien n'est sorti. Pour faire avancer une app, changer sa classe de badge :
  `is-concept` → `is-dev` → `is-beta` → `is-live` (section « les apps »).
- **Les services** : ingénierie logicielle freelance, modèles d'IA sur mesure
  (machine learning, deep learning) et formations. 10+ ans d'expérience.

Le studio assume une identité distincte : il quitte l'esthétique terminal pour un
registre clair et large (typo Outfit, sable, vert forêt et orange). Le lien avec la
marque mère se fait par le pied de page sombre et les micro-éléments en monospace.

## Stack

100 % statique, fait main, aucune dépendance ni framework :

- `index.html` / `services.html` : thème « terminal », partagent `style.css`
- `studio.html` : identité propre, `studio.css` autonome (n'utilise pas `style.css`)
- `script.js` : commun aux trois pages (année, email anti-bot, effet de frappe,
  réseau de neurones en fond, redirection des anciennes ancres, easter egg console)
- `studio.js` : propre au studio (courbes de niveau en fond, révélation au scroll)
- `favicon.svg` : logo `>_`

Les commandes du terminal se personnalisent par page via l'attribut `data-commands`
sur `#typed` (un tableau JSON).

### Compatibilité des anciens liens

Le site était auparavant une seule page. `script.js` redirige les ancres déjà
indexées (`#studio`, `#services`, `#whoami`, `#stack`, `#pourquoi`) vers leur
nouvelle page. Ne pas retirer ce bloc.

## Développement local

Aucun build. Ouvrir `index.html`, ou servir le dossier :

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Déploiement

Hébergé sur **GitHub Pages** (site utilisateur). Tout push sur `main` met le site
à jour automatiquement en une poignée de secondes.

---

<sub>// codé à la main, sans template, et un peu trop de café ☕</sub>
