/**
 * Celestia — Main Application
 * Orchestrates simulation, rendering, and user interaction
 */

(function () {
    'use strict';

    // ============================================
    // Simulation State
    // ============================================
    let simulationDate = new Date();
    let simulationJD = Astronomy.dateToJulian(simulationDate);
    let timeSpeed = 1;           // days per real second
    let timeDirection = 1;       // 1 or -1
    let isPaused = false;
    let lastFrameTime = 0;
    let currentView = 'solar-system';

    // Planet positions in ecliptic longitude (degrees)
    let planetAngles = {};
    let planetHelioPositions = {};
    let planetScreenPositions = {};

    // Mouse interaction
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let dragCamStartX = 0, dragCamStartY = 0;

    // ============================================
    // Initialization
    // ============================================
    function boot() {
        // Show loading screen for a moment
        const loadingScreen = document.getElementById('loading-screen');
        const loaderBar = document.querySelector('.loader-bar');
        const app = document.getElementById('app');

        let progress = 0;
        const loadInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;
            loaderBar.style.width = progress + '%';

            if (progress >= 100) {
                clearInterval(loadInterval);
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    app.classList.remove('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        startApp();
                    }, 800);
                }, 300);
            }
        }, 120);
    }

    function startApp() {
        // Initialize renderer
        const canvas = document.getElementById('main-canvas');
        const minimap = document.getElementById('minimap-canvas');
        Renderer.init(canvas, minimap);

        // Initialize UI
        UI.init();

        // Set initial date display
        UI.updateDateDisplay(simulationDate);

        // Compute initial positions
        updatePlanetPositions();

        // Bind mouse/touch events
        bindInteraction(canvas);

        // Draw logo
        drawLogo();

        // Start animation loop
        requestAnimationFrame(gameLoop);
    }

    // ============================================
    // Simulation Update
    // ============================================
    function updatePlanetPositions() {
        const T = (simulationJD - Astronomy.J2000) / 36525;

        for (const key of PlanetData.planetOrder) {
            const elements = PlanetData.orbitalElements[key];
            const pos = Astronomy.computePosition(elements, T);
            planetHelioPositions[key] = pos;

            // Use ecliptic longitude for display angle
            // Negate to make planets move counter-clockwise (correct direction)
            planetAngles[key] = pos.lon;
        }

        // Update bottom bar info
        const sunLon = Astronomy.sunLongitude(simulationJD);
        const zodiac = Astronomy.getZodiacSign(sunLon);
        const moonPhase = Astronomy.getMoonPhase(simulationJD);
        UI.updateBottomBar(zodiac, moonPhase);
    }

    function advanceTime(deltaSec) {
        if (isPaused) return;

        const daysDelta = (timeSpeed * timeDirection * deltaSec) / 86400;
        // Accelerate: timeSpeed is in a multiplier, so 1x = real-time (1 day per day)
        // We want 1x to feel like things move visibly, so multiply more aggressively
        const effectiveDelta = timeSpeed * timeDirection * deltaSec / 60; // days per frame-second
        simulationJD += effectiveDelta;
        simulationDate = Astronomy.julianToDate(simulationJD);

        updatePlanetPositions();
        UI.updateDateDisplay(simulationDate);
    }

    // ============================================
    // Game Loop
    // ============================================
    function gameLoop(timestamp) {
        const delta = lastFrameTime ? (timestamp - lastFrameTime) / 1000 : 0;
        lastFrameTime = timestamp;

        // Advance simulation
        advanceTime(delta);

        // Render
        planetScreenPositions = Renderer.render(timestamp, planetAngles);

        requestAnimationFrame(gameLoop);
    }

    // ============================================
    // Mouse / Touch Interaction
    // ============================================
    function bindInteraction(canvas) {
        // Mouse down - start drag
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            dragCamStartX = Renderer.camera.targetX;
            dragCamStartY = Renderer.camera.targetY;
            canvas.style.cursor = 'grabbing';
        });

        // Mouse move
        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = (e.clientX - dragStartX) / Renderer.camera.zoom;
                const dy = (e.clientY - dragStartY) / Renderer.camera.zoom;
                Renderer.camera.targetX = dragCamStartX - dx;
                Renderer.camera.targetY = dragCamStartY - dy;
                return;
            }

            // Hit test planets for hover
            checkPlanetHover(e.clientX, e.clientY);
        });

        // Mouse up
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                canvas.style.cursor = 'grab';
            }
        });

        // Click
        canvas.addEventListener('click', (e) => {
            // Only register click if we didn't drag significantly
            const dx = Math.abs(e.clientX - dragStartX);
            const dy = Math.abs(e.clientY - dragStartY);
            if (dx > 5 || dy > 5) return;

            const hit = hitTestPlanets(e.clientX, e.clientY);
            if (hit) {
                selectPlanet(hit);
            } else {
                // Check if a constellation star was clicked
                const starHit = Renderer.hitTestStars(e.clientX, e.clientY);
                if (starHit) {
                    // Show star tooltip on click (persists until clicking elsewhere)
                    UI.showStarTooltip(starHit, e.clientX, e.clientY);
                } else {
                    // Click on empty space — deselect and hide star tooltip
                    UI.hideStarTooltip();
                    if (Renderer.selectedPlanet) {
                        Renderer.selectedPlanet = null;
                        UI.closePanel();
                    }
                }
            }
        });

        // Mouse wheel for zoom
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            Renderer.camera.targetZoom = Math.max(0.2, Math.min(5, Renderer.camera.targetZoom * zoomFactor));
            document.getElementById('zoom-slider').value = Renderer.camera.targetZoom;
        }, { passive: false });

        // Double click to center
        canvas.addEventListener('dblclick', (e) => {
            const hit = hitTestPlanets(e.clientX, e.clientY);
            if (hit) {
                const pos = planetScreenPositions[hit];
                if (pos) {
                    Renderer.camera.targetX = pos.wx;
                    Renderer.camera.targetY = pos.wy;
                    Renderer.camera.targetZoom = Math.max(Renderer.camera.targetZoom, 1.5);
                }
            } else {
                // Double click empty space - reset view
                Renderer.camera.targetX = 0;
                Renderer.camera.targetY = 0;
                Renderer.camera.targetZoom = 1;
            }
        });

        // Touch events for mobile
        let touchStartX, touchStartY;
        let lastTouchDist = 0;

        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                dragStartX = touchStartX;
                dragStartY = touchStartY;
                dragCamStartX = Renderer.camera.targetX;
                dragCamStartY = Renderer.camera.targetY;
            } else if (e.touches.length === 2) {
                isDragging = false;
                lastTouchDist = getTouchDistance(e.touches);
            }
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 1 && isDragging) {
                const dx = (e.touches[0].clientX - dragStartX) / Renderer.camera.zoom;
                const dy = (e.touches[0].clientY - dragStartY) / Renderer.camera.zoom;
                Renderer.camera.targetX = dragCamStartX - dx;
                Renderer.camera.targetY = dragCamStartY - dy;
            } else if (e.touches.length === 2) {
                const dist = getTouchDistance(e.touches);
                if (lastTouchDist > 0) {
                    const scale = dist / lastTouchDist;
                    Renderer.camera.targetZoom = Math.max(0.2, Math.min(5, Renderer.camera.targetZoom * scale));
                }
                lastTouchDist = dist;
            }
        }, { passive: false });

        canvas.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                if (isDragging) {
                    const dx = Math.abs(touchStartX - dragStartX);
                    const dy = Math.abs(touchStartY - dragStartY);
                    // Tap detection
                    if (dx < 10 && dy < 10) {
                        const hit = hitTestPlanets(touchStartX, touchStartY);
                        if (hit) {
                            selectPlanet(hit);
                        } else {
                            const starHit = Renderer.hitTestStars(touchStartX, touchStartY);
                            if (starHit) {
                                UI.showStarTooltip(starHit, touchStartX, touchStartY);
                            } else {
                                UI.hideStarTooltip();
                            }
                        }
                    }
                }
                isDragging = false;
                lastTouchDist = 0;
            }
        });
    }

    function getTouchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function hitTestPlanets(mx, my) {
        // Check in reverse order (outermost first, they're drawn on top)
        const order = [...PlanetData.planetOrder].reverse();
        for (const key of order) {
            const pos = planetScreenPositions[key];
            if (!pos) continue;

            const dx = mx - pos.sx;
            const dy = my - pos.sy;
            const hitRadius = Math.max(pos.radius + 8, 15); // generous hit area
            if (dx * dx + dy * dy <= hitRadius * hitRadius) {
                return key;
            }
        }

        // Check Sun
        const sunPos = Renderer.worldToScreen(0, 0);
        const sunDx = mx - sunPos.x;
        const sunDy = my - sunPos.y;
        const sunRadius = 22 * Renderer.camera.zoom;
        if (sunDx * sunDx + sunDy * sunDy <= (sunRadius + 10) * (sunRadius + 10)) {
            return 'sun';
        }

        return null;
    }

    // Track hovered star for tooltip management
    let hoveredStar = null;

    function checkPlanetHover(mx, my) {
        const hit = hitTestPlanets(mx, my);

        if (hit && hit !== 'sun') {
            // Planet hover - hide star tooltip if showing
            if (hoveredStar) {
                hoveredStar = null;
                UI.hideStarTooltip();
            }
            Renderer.hoveredPlanet = hit;
            const distanceAU = computeDistanceFromEarth(hit);
            const season = computeSeason(hit);
            const pos = planetScreenPositions[hit];
            const constellation = Astronomy.getConstellationForLon(planetAngles[hit] || 0);
            UI.showTooltip(hit, pos.sx, pos.sy, distanceAU, season, constellation);
            document.getElementById('main-canvas').style.cursor = 'pointer';
        } else {
            if (Renderer.hoveredPlanet) {
                Renderer.hoveredPlanet = null;
                UI.hideTooltip();
            }

            // Check star hover
            const starHit = Renderer.hitTestStars(mx, my);
            if (starHit) {
                hoveredStar = starHit;
                UI.showStarTooltip(starHit, mx, my);
                document.getElementById('main-canvas').style.cursor = 'pointer';
            } else {
                if (hoveredStar) {
                    hoveredStar = null;
                    UI.hideStarTooltip();
                }
                if (!isDragging) {
                    document.getElementById('main-canvas').style.cursor = 'grab';
                }
            }
        }
    }

    function selectPlanet(key) {
        if (key === 'sun') {
            // Show Sun info in a simplified way
            Renderer.selectedPlanet = null;
            return;
        }

        Renderer.selectedPlanet = key;
        UI.hideTooltip();

        const distanceAU = computeDistanceFromEarth(key);
        const season = computeSeason(key);
        const constellation = Astronomy.getConstellationForLon(planetAngles[key] || 0);
        UI.openPanel(key, distanceAU, season, constellation);

        // Smooth pan to planet
        const pos = planetScreenPositions[key];
        if (pos) {
            Renderer.camera.targetX = pos.wx * 0.5; // partial pan
            Renderer.camera.targetY = pos.wy * 0.5;
        }
    }

    // ============================================
    // Astronomical Computations
    // ============================================
    function computeDistanceFromEarth(key) {
        const earthPos = planetHelioPositions['earth'];
        const planetPos = planetHelioPositions[key];
        if (!earthPos || !planetPos) return 0;
        return Astronomy.distance3D(earthPos, planetPos);
    }

    function computeSeason(key) {
        const info = PlanetData.planetInfo[key];
        const pos = planetHelioPositions[key];
        if (!pos) return 'Unknown';

        if (key === 'earth') {
            // Earth season based on current month
            const month = simulationDate.getMonth();
            if (month >= 2 && month <= 4) return 'Spring';
            if (month >= 5 && month <= 7) return 'Summer';
            if (month >= 8 && month <= 10) return 'Autumn';
            return 'Winter';
        }

        return Astronomy.getSeason(pos.lon, info.axialTilt);
    }

    // ============================================
    // Public API (exposed to UI controls)
    // ============================================
    window.CelestiaApp = {
        setDate(date) {
            simulationDate = date;
            simulationJD = Astronomy.dateToJulian(date);
            updatePlanetPositions();
            UI.updateDateDisplay(date);
        },

        setSpeed(speed) {
            timeSpeed = speed;
            if (speed === 0) isPaused = true;
            else isPaused = false;
        },

        togglePause() {
            isPaused = !isPaused;
            const btn = document.getElementById('play-pause-btn');
            btn.textContent = isPaused ? 'Play' : 'Pause';
        },

        toggleReverse() {
            timeDirection *= -1;
            const btn = document.getElementById('reverse-btn');
            btn.textContent = timeDirection > 0 ? 'Reverse' : 'Forward';
        },

        setView(view) {
            currentView = view;
            // Future: switch between solar system, sky map, and constellation views
        },

        getSimulationDate() {
            return simulationDate;
        },
    };

    // ============================================
    // Logo Drawing
    // ============================================
    function drawLogo() {
        const canvas = document.getElementById('logo-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = 32;

        // Mini solar system logo
        ctx.fillStyle = '#ffcc33';
        ctx.beginPath();
        ctx.arc(16, 16, 4, 0, Math.PI * 2);
        ctx.fill();

        // Orbits
        const orbits = [8, 12, 15];
        const colors = ['#4f8fff', '#e07040', '#c4956a'];
        orbits.forEach((r, i) => {
            ctx.beginPath();
            ctx.arc(16, 16, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Planet dot
            const angle = (i * 2.1) + Date.now() * 0.001;
            ctx.beginPath();
            ctx.arc(16 + Math.cos(angle) * r, 16 + Math.sin(angle) * r, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = colors[i];
            ctx.fill();
        });
    }

    // ============================================
    // Boot
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
