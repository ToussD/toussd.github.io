# holistic.dev · site vitrine

Site vitrine de **HOLISTIC DEVELOPMENT** (EURL), la société de David Toussaint.

En ligne : **https://toussd.github.io**

## Ce que le site doit dire, et surtout ne pas dire

David porte **deux casquettes**, et le site existe pour que le visiteur ne les confonde
pas :

- **HOLISTIC DEVELOPMENT** (EURL, David gérant) ne porte **qu'une seule activité en
  propre : le studio** d'applications mobiles.
- **Le conseil et la formation passent par [MoveNext](https://www.movenext.fr/)**, la
  société que David dirige avec **Ionut Mihalcea** (architecte logiciel et leader
  technique, président). Lui l'architecture et le craft, David l'IA.

Ne jamais laisser entendre que l'EURL vend des prestations de services : elle en est
capable, mais ce n'est pas par elle qu'elles se facturent. Les compétences de David
sont bien présentées sur l'accueil, mais comme un savoir-faire personnel, avec un
encadré (`.callout`) qui renvoie vers MoveNext.

## Les trois pages

| Page | Rôle | Identité |
| --- | --- | --- |
| `index.html` | David et sa société : whoami, savoir-faire, stack, deux portes. | Terminal (sombre) |
| `studio.html` | Le studio d'applications mobiles. | Plein air (clair) |
| `services.html` | Passerelle : explique le duo, puis renvoie vers movenext.fr. | Terminal (sombre) |

`services.html` est une **passerelle, pas une redirection** : le visiteur doit
comprendre pourquoi il change de société avant de cliquer. C'est délibéré, ne pas la
remplacer par un `meta refresh`.

Le studio, lui, assume une identité distincte : il quitte l'esthétique terminal pour un
registre clair et large (typo Outfit, sable, vert forêt et orange). Le lien avec la
marque mère se fait par le pied de page sombre et les micro-éléments en monospace.

Pour faire avancer une app du studio, changer sa classe de badge :
`is-concept` → `is-dev` → `is-beta` → `is-live`. Les noms restent caviardés tant que
rien n'est sorti.

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

Le site était auparavant une seule page. `script.js` redirige les deux ancres qui ont
changé de page (`#studio`, `#services`) vers leur nouvelle destination. Les autres
(`#whoami`, `#stack`, `#pourquoi`) existent toujours sur l'accueil et n'ont donc pas
besoin de redirection. Ne pas retirer ce bloc.

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
