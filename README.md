# Tests de la page d'évolution

Ce fichier `README.md` présente des exemples concrets pour tester la page d'évolution de votre projet Pokémon. Vous trouverez ci-dessous des instructions détaillées pour tester les évolutions de Pokémon comme Eevee et Pikachu, en utilisant des conditions spécifiques telles que les pierres d'évolution ("fire stone", "thunder stone", etc.).

## Introduction

La page d'évolution permet d’afficher la chaîne d’évolution d’un Pokémon et de tester les conditions qui déclenchent ces évolutions (par exemple, l’utilisation d’objets comme des pierres ou l’atteinte d’un certain niveau). Les exemples ci-dessous vous guideront pour valider le bon fonctionnement de cette fonctionnalité.

## Exemples de test

### Tester avec Eevee

Eevee est un Pokémon unique qui peut évoluer en plusieurs formes différentes selon la pierre d'évolution utilisée. Voici comment tester ses évolutions :

1. **Accéder à la page d’évolution** :
   - Sur la page d’accueil, entrez "eevee" dans la barre de recherche.
   - Sélectionnez "eevee" dans les suggestions pour afficher sa page d’évolution.

2. **Vérifier la chaîne d’évolution** :
   - Vous devriez voir Eevee et toutes ses évolutions possibles (Vaporeon, Jolteon, Flareon, etc.).

3. **Tester avec une pierre d’évolution** :
   - Allez dans la section "Conditions d’évolution".
   - Sélectionnez "Objet" dans le menu déroulant "Type".
   - Entrez "fire stone" dans le champ "Valeur".
   - Cliquez sur "Appliquer".
   - Résultat attendu : Flareon doit être mis en surbrillance.

4. **Tester d’autres pierres** :
   - Répétez l’étape 3 avec :
     - "water stone" → Vaporeon doit être mis en surbrillance.
     - "thunder stone" → Jolteon doit être mis en surbrillance.

## Exemples supplémentaires
- **Pikachu** :
  - Condition : "Objet" = "thunder stone".
  - Résultat : Raichu doit être mis en surbrillance.
- **Magikarp** :
  - Condition : "level" = "20".
  - Résultat : Gyarados doit être mis en surbrillance.
- **Eevee** :
  - Condition : "lieu" = "eterna-forest".
  - Résultat : Leafeon doit être mis en surbrillance.
