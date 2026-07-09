# holistic.dev · site vitrine

Site vitrine une-page de **HOLISTIC DEVELOPMENT** (EURL), la société de
David Toussaint. Deux pôles :

- **Le studio** : applications mobiles autour du mouvement, du plein air et du jeu.
  4 à 5 apps sur les 12 prochains mois. Les noms sont volontairement caviardés sur
  le site tant que rien n'est sorti (section `// le studio`). Pour mettre à jour un
  statut, changer le badge `st-concept` en `st-dev`, `st-beta` ou `st-live`.
- **Les services** : ingénierie logicielle freelance, modèles d'IA sur mesure
  (machine learning, deep learning) et formations. 10+ ans d'expérience.

En ligne : **https://toussd.github.io**

## Stack

100 % statique, fait main, aucune dépendance ni framework :

- `index.html` : structure
- `style.css` : thème « terminal » (JetBrains Mono)
- `script.js` : effet de frappe, réseau de neurones en fond (canvas), easter egg console
- `favicon.svg` : logo `>_`

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
