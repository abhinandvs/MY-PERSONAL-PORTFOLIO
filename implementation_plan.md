# Full-Page Anti-Gravity Effect

## Goal Description
Implement a dynamic, interactive "anti-gravity" animation across the entire website background using Matter.js. The effect features high-density floating shapes that respond to cursor movement, adhering to the site's minimalistic yellow/purple theme.

## Current Implementation State
The following changes have been applied to the website:

### [Core Logic]
#### [EXISTING] [gravity.js](file:///c:/Users/ABHINAND/Downloads/New%20folder%20%284%29/gravity.js)
- **Engine**: Matter.js engine with zero gravity (`engine.world.gravity.y = 0`).
- **Shapes**: ~4000 separate polygon bodies (triangles).
- **Style**:
    - Shapes: Triangles (3 sides).
    - Size: Random 2-5px.
    - Colors: Theme palette (`#FFD700`, `#7B2CBF`, `#ffffff`, `#333333`).
- **Interaction**:
    - Global mouse tracking via `mousemove`.
    - Repulsion force applied when cursor is within 200px radius.
    - `enableSleeping = true` for performance optimization.
- **Responsiveness**: Recreates walls on window resize.

### [Structure]
#### [EXISTING] [index.html](file:///c:/Users/ABHINAND/Downloads/New%20folder%20%284%29/index.html)
- Added container: `<div id="gravity-container"></div>`.
- Included scripts: `matter.min.js` and `gravity.js`.

### [Styling]
#### [EXISTING] [styles.css](file:///c:/Users/ABHINAND/Downloads/New%20folder%20%284%29/styles.css)
- `#gravity-container`: Fixed position, full viewport (`100vw`, `100vh`), `z-index: -1` (background), `pointer-events: none` (allows clicks on content).
- `.hero-container`: Ensures content stays above background with `z-index: 10`.

## Verification Plan
### Manual Verification
- [x] Check for full-page coverage of floating particles.
- [x] specific shape check: Triangles.
- [x] Performance check with 4000 elements (should be smooth on average devices).
- [x] Theme consistency (Yellow/Purple colors).
