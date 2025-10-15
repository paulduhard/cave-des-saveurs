# 🌐 Accessibilité - Cave des Saveurs

Ce document détaille l'état actuel de l'accessibilité du site Cave des Saveurs, les améliorations apportées et le plan d'action pour une conformité WCAG 2.1 AA complète.

## 📊 État actuel

### ✅ Améliorations récentes

- [x] Ajout d'un lien d'évitement de navigation
- [x] Correction de la déclaration de langue (fr)
- [x] Ajout de textes alternatifs pour toutes les images
- [x] Structure de titres appropriée dans les composants Hero
- [x] Amélioration des indicateurs de focus
- [x] Navigation au clavier optimisée
- [x] Labellisation ARIA des éléments interactifs
- [x] Ajout d'utilitaires CSS pour l'accessibilité

### 🚧 Points d'attention restants

#### Priorité élevée

- [ ] **Test de contraste des couleurs** : Vérifier la conformité WCAG AA (4.5:1)
- [ ] **Navigation au clavier complète** dans tous les menus déroulants
- [ ] **Messages d'erreur** accessibles pour les formulaires
- [ ] **États des éléments interactifs** (loading, disabled, etc.)

#### Priorité moyenne

- [ ] **Descriptions longues** pour les images complexes (graphiques de cave)
- [ ] **Pagination** accessible pour les listes de vins
- [ ] **Filtres** de recherche optimisés pour les lecteurs d'écran
- [ ] **Carousel/slider** dans la section Avis avec navigation clavier

#### Priorité faible

- [ ] **Mode sombre** pour réduire la fatigue visuelle
- [ ] **Tailles de police ajustables**
- [ ] **Animations respectueuses** des préférences utilisateur

## 🛠 Guide de développement

### Standards à respecter

- **WCAG 2.1 niveau AA** comme référence
- **Sémantique HTML5** appropriée
- **ARIA** quand la sémantique native ne suffit pas
- **Navigation clavier** pour tous les éléments interactifs
- **Contraste minimal** de 4.5:1 (7:1 pour AAA)

### Bonnes pratiques

#### HTML sémantique

```html
<!-- ✅ Bon -->
<nav aria-label="Navigation principale">
	<ul>
		<li><a href="/cave">La Cave</a></li>
	</ul>
</nav>

<!-- ❌ Éviter -->
<div class="nav">
	<div onclick="navigate()">La Cave</div>
</div>
```

#### Images

```html
<!-- ✅ Bon : Image informative -->
<img src="vin-bordeaux.jpg" alt="Bouteille de Bordeaux rouge millésime 2018" />

<!-- ✅ Bon : Image décorative -->
<img src="decoration.jpg" alt="" role="presentation" />

<!-- ❌ Éviter : Alt manquant -->
<img src="vin.jpg" />
```

#### Formulaires

```html
<!-- ✅ Bon -->
<label for="email">Adresse email :</label>
<input type="email" id="email" required aria-describedby="email-help" />
<div id="email-help">Nous ne partagerons jamais votre email</div>

<!-- ❌ Éviter -->
<input type="email" placeholder="Votre email" />
```

#### Interactions

```svelte
<!-- ✅ Bon -->
<button
	on:click={toggleMenu}
	aria-expanded={isOpen}
	aria-controls="menu-content"
	aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
>
	Menu
</button>

<!-- ❌ Éviter -->
<div on:click={toggleMenu}>Menu</div>
```

## 🎯 Checklist de validation

### Avant chaque déploiement

- [ ] Navigation possible uniquement au clavier (Tab, Enter, Espace, Flèches)
- [ ] Tous les liens et boutons ont un focus visible
- [ ] Les images ont des textes alternatifs appropriés
- [ ] Les formulaires sont correctement labellisés
- [ ] La hiérarchie des titres est logique (H1 → H2 → H3...)
- [ ] Les couleurs ne sont pas le seul moyen de transmettre l'information
- [ ] Le site est utilisable avec un zoom jusqu'à 200%

### Tests recommandés

#### Outils automatisés

```bash
# Installation d'outils de test
npm install -D axe-core @axe-core/cli

# Test automatisé
npx axe http://localhost:5173
```

#### Tests manuels

1. **Navigation clavier** : Utiliser uniquement Tab, Shift+Tab, Enter, Espace
2. **Lecteur d'écran** : Tester avec NVDA (Windows) ou VoiceOver (Mac)
3. **Zoom** : Tester jusqu'à 200% de zoom
4. **Contraste** : Utiliser les outils développeur du navigateur

## 📱 Accessibilité mobile

### Points spécifiques

- [ ] **Zone de toucher** minimale de 44x44px
- [ ] **Menus déroulants** adaptés au tactile
- [ ] **Formulaires** avec clavier virtuel optimisé
- [ ] **Orientation** fonctionnelle en portrait et paysage

## 🔧 Outils utiles

### Extensions navigateur

- [axe DevTools](https://www.deque.com/axe/devtools/) - Test automatisé
- [WAVE](https://wave.webaim.org/extension/) - Évaluation visuelle
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Audit intégré

### Ressources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/) - Guides pratiques
- [AcceDe Web](https://www.accede-web.com/) - Ressources francophones
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## 📈 Métriques de suivi

### Objectifs cibles

- **Lighthouse Accessibility Score** : 95+
- **Axe violations** : 0
- **Contraste minimum** : 4.5:1 (AA)
- **Navigation clavier** : 100% des fonctionnalités

### Surveillance continue

```javascript
// Exemple d'intégration dans les tests E2E
import { injectAxe, checkA11y } from 'axe-playwright';

test("Accessibilité page d'accueil", async ({ page }) => {
	await page.goto('/');
	await injectAxe(page);
	await checkA11y(page);
});
```

## 🎨 Considérations UX

### Design inclusif

- **Contraste élevé** pour la lisibilité
- **Iconographie claire** avec textes d'accompagnement
- **Espacement généreux** entre les éléments
- **Typographie lisible** (minimum 16px)
- **Messages d'état** visibles et audibles

### Micro-interactions

- **Focus visible** sur tous les éléments interactifs
- **Feedback instantané** pour les actions utilisateur
- **États de chargement** accessibles
- **Messages d'erreur** constructifs et clairs

## 📝 Plan d'action

### Phase 1 (Urgent - 2 semaines)

1. Audit complet avec axe-core
2. Correction des violations critiques
3. Tests de navigation clavier
4. Validation des contrastes

### Phase 2 (Important - 1 mois)

1. Amélioration des formulaires
2. Optimisation des carousels/sliders
3. Tests avec utilisateurs en situation de handicap
4. Documentation des patterns accessibles

### Phase 3 (Amélioration continue)

1. Formation de l'équipe
2. Intégration dans le workflow CI/CD
3. Monitoring automatisé
4. Mise à jour régulière des bonnes pratiques

---

**Responsable accessibilité** : Équipe développement
**Dernière mise à jour** : 2025-01-27
**Prochaine révision** : 2025-02-27

Pour toute question ou suggestion d'amélioration, créer une issue GitHub avec le label `accessibility`.
