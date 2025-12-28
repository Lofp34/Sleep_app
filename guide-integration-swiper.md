# Intégration du carrousel avec Swiper

Ce guide explique comment intégrer un carrousel Swiper simple pour présenter quelques écrans d’onboarding de l’application Sommeil & Récupération.

## Dépendances

- Swiper 11 (CDN CSS + JS)
- Aucune étape de build requise : l’exemple fonctionne dans un simple fichier HTML.

## Structure attendue

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
...
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Contenu 1</div>
    <div class="swiper-slide">Contenu 2</div>
    <div class="swiper-slide">Contenu 3</div>
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
</script>
```

## Styles essentiels

- Largeur maximale recommandée : `max-width: 420px` pour un rendu mobile/tablette.
- Utiliser `padding` interne sur la `.card` pour conserver une zone respirante.
- Couleur dominante : `#0f172a` (fond bleu nuit) avec accent `#a5b4fc`.

## Lancer l’exemple

1. Ouvrir `index.html` directement dans le navigateur **ou** lancer `python -m http.server 8000` à la racine du repo.
2. Naviguer sur `http://localhost:8000`.
3. Utiliser les boutons ou le swipe tactile pour parcourir les slides.

## Personnalisation rapide

- Mettre à jour les textes dans chaque `.slide-card`.
- Ajouter ou retirer des diapositives en dupliquant une `div.swiper-slide`.
- Modifier les couleurs dans la section `:root` du fichier HTML.

Ce guide correspond à l’implémentation livrée dans `index.html`.
