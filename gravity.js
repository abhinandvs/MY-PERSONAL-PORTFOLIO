document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gravity-container');
    if (!container) return;

    // Module aliases
    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Events = Matter.Events,
        Body = Matter.Body,
        Vector = Matter.Vector;

    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = 0; // Zero gravity for floating effect
    // Optimization: Allow bodies to sleep when not interacting
    engine.enableSleeping = true;

    // Create renderer
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent',
            wireframes: false,
            pixelRatio: 1 // Cap pixel ratio for performance on high-res screens with many bodies
        }
    });

    // Create bounds - Full Page
    const wallOptions = {
        isStatic: true,
        render: { visible: false }
    };

    let ground, leftWall, rightWall, ceiling;

    function createWalls() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const thickness = 100;

        ground = Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, wallOptions);
        ceiling = Bodies.rectangle(width / 2, -thickness / 2, width, thickness, wallOptions);
        leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height, wallOptions);
        rightWall = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, wallOptions);

        Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);
    }

    createWalls();

    // Create shapes - High Density
    const colors = ['#FFD700', '#7B2CBF', '#ffffff', '#333333']; // Theme colors

    function createShapes() {
        const shapes = [];
        const width = window.innerWidth;
        // EXTREME DENSITY - Increased for fluid effect
        // Optimization for Mobile: Reduce count significantly
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 150 : 4500; // Reduced to 150 for mobile performance

        for (let i = 0; i < count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Smaller size for high density (1-4px for circles)
            const size = Math.random() * 3 + 1;

            const commonRender = {
                fillStyle: color,
                strokeStyle: 'transparent'
            };

            const commonPhysics = {
                restitution: 0.7, // Slightly less bouncy
                friction: 0.001,
                frictionAir: 0.005, // Lower friction for fluid glide
                density: 0.05
            };

            // Circle
            const body = Bodies.circle(x, y, size, {
                render: commonRender,
                ...commonPhysics
            });

            shapes.push(body);
        }

        Composite.add(engine.world, shapes);
    }

    createShapes();

    // Global Mouse Tracking (since canvas is pointer-events: none)
    const mousePosition = { x: -1000, y: -1000 };

    window.addEventListener('mousemove', (e) => {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
    });

    // "Anti-Gravity" / Repulsion Effect + Fluid Drift
    Events.on(engine, 'beforeUpdate', function () {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const timeScale = 0.001; // For drift

        Composite.allBodies(engine.world).forEach(body => {
            if (body.isStatic) return;

            const bodyPosition = body.position;

            // 1. Fluid Drift (Simulating ambient current)
            // Use timestamp for evolving field
            const time = engine.timing.timestamp * timeScale;
            // Simple sinusoidal flow
            const flowX = Math.sin(bodyPosition.y * 0.002 + time) * 0.00001; // Subtle X drift
            const flowY = Math.cos(bodyPosition.x * 0.002 + time) * 0.00001; // Subtle Y drift

            Body.applyForce(body, bodyPosition, { x: flowX, y: flowY });

            // 2. Mouse Repulsion
            // Calculate distance to mouse
            const dx = bodyPosition.x - mousePosition.x;
            const dy = bodyPosition.y - mousePosition.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 200; // Interaction radius

            if (d < maxDistance) {
                // Force vector away from mouse
                const forceMagnitude = 0.00005 * (maxDistance - d); // Gentle push

                Body.applyForce(body, bodyPosition, {
                    x: (dx / d) * forceMagnitude,
                    y: (dy / d) * forceMagnitude
                });
            }

            // Keep velocities reasonable to prevent "explosions"
            if (body.speed > 5) {
                Body.setVelocity(body, {
                    x: body.velocity.x * 0.95,
                    y: body.velocity.y * 0.95
                });
            }
        });
    });

    // Run the engine
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle Resize
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;

        // Remove old walls
        Composite.remove(engine.world, [ground, ceiling, leftWall, rightWall]);
        // Create new ones
        createWalls();
    });
});
