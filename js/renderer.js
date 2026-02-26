/**
 * Celestia — Canvas Renderer
 * Handles all visual rendering: starfield, orbits, planets,
 * constellation lines, ecliptic, Sun, and overlays.
 */

const Renderer = (() => {
    let canvas, ctx;
    let minimapCanvas, minimapCtx;
    let width, height;
    let dpr = 1;

    // Camera state
    let camera = {
        x: 0,
        y: 0,
        zoom: 1,
        targetZoom: 1,
        targetX: 0,
        targetY: 0,
    };

    // Starfield (cached)
    let stars = [];
    const STAR_COUNT = 600;

    // Interaction state
    let hoveredPlanet = null;
    let selectedPlanet = null;

    function init(canvasEl, minimapEl) {
        canvas = canvasEl;
        ctx = canvas.getContext('2d');
        minimapCanvas = minimapEl;
        minimapCtx = minimapCanvas.getContext('2d');

        dpr = window.devicePixelRatio || 1;
        resize();
        generateStarfield();

        window.addEventListener('resize', resize);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function generateStarfield() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * 4000 - 2000,
                y: Math.random() * 4000 - 2000,
                size: Math.random() * 1.8 + 0.3,
                brightness: Math.random() * 0.6 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2,
            });
        }
    }

    function worldToScreen(wx, wy) {
        return {
            x: (wx - camera.x) * camera.zoom + width / 2,
            y: (wy - camera.y) * camera.zoom + height / 2,
        };
    }

    function screenToWorld(sx, sy) {
        return {
            x: (sx - width / 2) / camera.zoom + camera.x,
            y: (sy - height / 2) / camera.zoom + camera.y,
        };
    }

    function updateCamera() {
        camera.zoom += (camera.targetZoom - camera.zoom) * 0.1;
        camera.x += (camera.targetX - camera.x) * 0.08;
        camera.y += (camera.targetY - camera.y) * 0.08;
    }

    function drawStarfield(time) {
        for (const star of stars) {
            const sp = worldToScreen(star.x, star.y);
            if (sp.x < -10 || sp.x > width + 10 || sp.y < -10 || sp.y > height + 10) continue;

            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
            const alpha = star.brightness * twinkle;
            const size = star.size * Math.min(camera.zoom * 0.5 + 0.5, 1.5);

            ctx.beginPath();
            ctx.arc(sp.x, sp.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220, 225, 255, ${alpha})`;
            ctx.fill();

            // Glow for brighter stars
            if (star.size > 1.2) {
                ctx.beginPath();
                ctx.arc(sp.x, sp.y, size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 210, 255, ${alpha * 0.1})`;
                ctx.fill();
            }
        }
    }

    function drawSun(time) {
        const sp = worldToScreen(0, 0);
        const baseRadius = 22 * camera.zoom;

        // Outer glow layers
        const glowLayers = [
            { radius: baseRadius * 4, alpha: 0.03 },
            { radius: baseRadius * 3, alpha: 0.06 },
            { radius: baseRadius * 2, alpha: 0.12 },
            { radius: baseRadius * 1.5, alpha: 0.2 },
        ];

        for (const glow of glowLayers) {
            const gradient = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, glow.radius);
            gradient.addColorStop(0, `rgba(255, 200, 50, ${glow.alpha})`);
            gradient.addColorStop(0.5, `rgba(255, 150, 20, ${glow.alpha * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, glow.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        // Sun body
        const sunGrad = ctx.createRadialGradient(sp.x - baseRadius * 0.2, sp.y - baseRadius * 0.2, 0, sp.x, sp.y, baseRadius);
        sunGrad.addColorStop(0, '#fff8e0');
        sunGrad.addColorStop(0.3, '#ffdd44');
        sunGrad.addColorStop(0.7, '#ffaa00');
        sunGrad.addColorStop(1, '#ff6600');

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = sunGrad;
        ctx.fill();

        // Corona rays
        const rayCount = 12;
        const pulse = Math.sin(time * 0.001) * 0.2 + 0.8;
        ctx.save();
        ctx.globalAlpha = 0.15 * pulse;
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2 + time * 0.0002;
            const len = baseRadius * (2.5 + Math.sin(time * 0.003 + i) * 0.5);
            ctx.beginPath();
            ctx.moveTo(sp.x + Math.cos(angle - 0.05) * baseRadius, sp.y + Math.sin(angle - 0.05) * baseRadius);
            ctx.lineTo(sp.x + Math.cos(angle) * len, sp.y + Math.sin(angle) * len);
            ctx.lineTo(sp.x + Math.cos(angle + 0.05) * baseRadius, sp.y + Math.sin(angle + 0.05) * baseRadius);
            ctx.fillStyle = 'rgba(255, 200, 80, 0.3)';
            ctx.fill();
        }
        ctx.restore();

        // Label
        if (camera.zoom > 0.5) {
            ctx.font = `500 ${Math.max(10, 12 * camera.zoom)}px 'Space Grotesk', sans-serif`;
            ctx.fillStyle = 'rgba(255, 220, 100, 0.7)';
            ctx.textAlign = 'center';
            ctx.fillText('Sun', sp.x, sp.y + baseRadius + 18 * camera.zoom);
        }
    }

    function drawOrbit(key, planetPositions) {
        const displayRadius = PlanetData.orbitDisplayRadii[key];
        const sp = worldToScreen(0, 0);
        const r = displayRadius * camera.zoom;

        if (r < 5) return; // too small to see

        const info = PlanetData.planetInfo[key];
        const isHovered = hoveredPlanet === key;
        const isSelected = selectedPlanet === key;

        // Orbit path
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered || isSelected
            ? `rgba(255, 255, 255, 0.2)`
            : `rgba(255, 255, 255, 0.06)`;
        ctx.lineWidth = isHovered || isSelected ? 1.5 : 0.8;
        ctx.setLineDash(isSelected ? [] : [4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawPlanet(key, angle, time, planetPositions) {
        const displayRadius = PlanetData.orbitDisplayRadii[key];
        const info = PlanetData.planetInfo[key];
        const angleRad = angle * Astronomy.DEG;

        // Planet world position (on its display orbit)
        const wx = Math.cos(angleRad) * displayRadius;
        const wy = Math.sin(angleRad) * displayRadius;
        const sp = worldToScreen(wx, wy);

        const isHovered = hoveredPlanet === key;
        const isSelected = selectedPlanet === key;
        const planetRadius = info.radius * camera.zoom * (isHovered ? 1.3 : 1);

        // Store screen position for hit testing
        planetPositions[key] = { sx: sp.x, sy: sp.y, radius: planetRadius, wx, wy, angle };

        // Glow
        if (planetRadius > 2) {
            const glowGrad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, planetRadius * 4);
            glowGrad.addColorStop(0, info.glowColor);
            glowGrad.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, planetRadius * 4, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();
        }

        // Planet body
        const grad = ctx.createRadialGradient(
            sp.x - planetRadius * 0.3,
            sp.y - planetRadius * 0.3,
            0,
            sp.x,
            sp.y,
            planetRadius
        );

        const baseColor = info.color;
        grad.addColorStop(0, lightenColor(baseColor, 40));
        grad.addColorStop(0.5, baseColor);
        grad.addColorStop(1, darkenColor(baseColor, 40));

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, Math.max(planetRadius, 2), 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Saturn rings
        if (key === 'saturn' && planetRadius > 4) {
            ctx.save();
            ctx.translate(sp.x, sp.y);
            ctx.scale(1, 0.3);
            ctx.beginPath();
            ctx.arc(0, 0, planetRadius * 1.8, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(232, 208, 136, 0.5)';
            ctx.lineWidth = Math.max(2, planetRadius * 0.2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, planetRadius * 2.2, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(232, 208, 136, 0.3)';
            ctx.lineWidth = Math.max(1, planetRadius * 0.15);
            ctx.stroke();
            ctx.restore();
        }

        // Selection ring
        if (isSelected) {
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, planetRadius + 6, 0, Math.PI * 2);
            ctx.strokeStyle = info.color;
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Earth special: tiny moon
        if (key === 'earth' && planetRadius > 4) {
            const moonAngle = time * 0.002;
            const moonDist = planetRadius * 2.5;
            const mx = sp.x + Math.cos(moonAngle) * moonDist;
            const my = sp.y + Math.sin(moonAngle) * moonDist;
            ctx.beginPath();
            ctx.arc(mx, my, Math.max(1.5, planetRadius * 0.2), 0, Math.PI * 2);
            ctx.fillStyle = '#ccc';
            ctx.fill();
        }

        // Planet label
        if (camera.zoom > 0.3 && planetRadius > 2) {
            const fontSize = Math.max(9, Math.min(13, 11 * camera.zoom));
            ctx.font = `500 ${fontSize}px 'Space Grotesk', sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillStyle = isHovered || isSelected
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(255, 255, 255, 0.5)';
            ctx.fillText(info.name, sp.x, sp.y + planetRadius + fontSize + 4);
        }
    }

    function drawEclipticRing(time) {
        const sp = worldToScreen(0, 0);
        const outerR = 550 * camera.zoom;
        const innerR = 540 * camera.zoom;

        if (outerR < 50) return; // too small

        // Draw faint ecliptic circle
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, (outerR + innerR) / 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
        ctx.lineWidth = Math.max(1, (outerR - innerR));
        ctx.stroke();

        // Zodiac labels around the ecliptic
        const zodiac = ConstellationData.zodiac;
        for (let i = 0; i < zodiac.length; i++) {
            const z = zodiac[i];
            const midAngle = ((z.startLon + z.endLon) / 2) * Astronomy.DEG;
            const labelR = (outerR + 25 * camera.zoom);
            const lx = sp.x + Math.cos(midAngle) * labelR;
            const ly = sp.y + Math.sin(midAngle) * labelR;

            // Only draw if on screen
            if (lx < -50 || lx > width + 50 || ly < -50 || ly > height + 50) continue;

            const fontSize = Math.max(8, Math.min(12, 10 * camera.zoom));
            ctx.font = `500 ${fontSize}px 'Space Grotesk', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(139, 92, 246, 0.35)';

            // Symbol
            ctx.font = `${fontSize * 1.4}px serif`;
            ctx.fillText(z.symbol, lx, ly - fontSize * 0.6);

            // Name
            ctx.font = `500 ${fontSize * 0.75}px 'Space Grotesk', sans-serif`;
            ctx.fillStyle = 'rgba(139, 92, 246, 0.25)';
            ctx.fillText(z.name, lx, ly + fontSize * 0.6);

            // Divider ticks
            const tickAngle = z.startLon * Astronomy.DEG;
            const tx1 = sp.x + Math.cos(tickAngle) * (innerR - 5);
            const ty1 = sp.y + Math.sin(tickAngle) * (innerR - 5);
            const tx2 = sp.x + Math.cos(tickAngle) * (outerR + 5);
            const ty2 = sp.y + Math.sin(tickAngle) * (outerR + 5);
            ctx.beginPath();
            ctx.moveTo(tx1, ty1);
            ctx.lineTo(tx2, ty2);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    function drawConstellationStars(time) {
        const sp = worldToScreen(0, 0);
        const eclipticR = 545 * camera.zoom;

        if (eclipticR < 80) return;

        const zodiac = ConstellationData.zodiac;
        for (const z of zodiac) {
            // Draw constellation star pattern
            const midLon = (z.startLon + z.endLon) / 2;
            const baseAngle = midLon * Astronomy.DEG;
            const baseR = eclipticR;

            // Map constellation stars to positions along the ecliptic
            const starPositions = z.stars.map((star, idx) => {
                // Use RA to determine angular position, dec for radial offset
                const lonFraction = (idx / (z.stars.length - 1 || 1)) * 0.8 - 0.4;
                const angle = (midLon + lonFraction * ((z.endLon - z.startLon) || 30)) * Astronomy.DEG;
                const decOffset = (star.dec || 0) * 0.8;
                const r = baseR + decOffset * camera.zoom;

                const sx = sp.x + Math.cos(angle) * r;
                const sy = sp.y + Math.sin(angle) * r;
                const size = Math.max(1, (5 - star.mag) * 0.8 * camera.zoom);

                return { sx, sy, size, name: star.name };
            });

            // Draw connecting lines
            if (z.lines && camera.zoom > 0.6) {
                ctx.beginPath();
                for (const [a, b] of z.lines) {
                    if (starPositions[a] && starPositions[b]) {
                        ctx.moveTo(starPositions[a].sx, starPositions[a].sy);
                        ctx.lineTo(starPositions[b].sx, starPositions[b].sy);
                    }
                }
                ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Draw stars
            for (const sp2 of starPositions) {
                if (sp2.sx < -20 || sp2.sx > width + 20 || sp2.sy < -20 || sp2.sy > height + 20) continue;
                ctx.beginPath();
                ctx.arc(sp2.sx, sp2.sy, sp2.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 190, 255, ${Math.min(0.7, sp2.size * 0.25)})`;
                ctx.fill();
            }
        }
    }

    function drawMinimap(planetAngles) {
        const mw = 160, mh = 160;
        const cx = mw / 2, cy = mh / 2;
        const scale = 0.14;

        minimapCtx.clearRect(0, 0, mw, mh);

        // Background
        minimapCtx.fillStyle = 'rgba(5, 5, 25, 0.9)';
        minimapCtx.fillRect(0, 0, mw, mh);

        // Orbits
        for (const key of PlanetData.planetOrder) {
            const r = PlanetData.orbitDisplayRadii[key] * scale;
            minimapCtx.beginPath();
            minimapCtx.arc(cx, cy, r, 0, Math.PI * 2);
            minimapCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            minimapCtx.lineWidth = 0.5;
            minimapCtx.stroke();
        }

        // Sun
        minimapCtx.beginPath();
        minimapCtx.arc(cx, cy, 3, 0, Math.PI * 2);
        minimapCtx.fillStyle = '#ffcc33';
        minimapCtx.fill();

        // Planets
        for (const key of PlanetData.planetOrder) {
            if (!planetAngles[key]) continue;
            const r = PlanetData.orbitDisplayRadii[key] * scale;
            const angle = planetAngles[key] * Astronomy.DEG;
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;

            minimapCtx.beginPath();
            minimapCtx.arc(px, py, key === selectedPlanet ? 3 : 2, 0, Math.PI * 2);
            minimapCtx.fillStyle = PlanetData.planetInfo[key].color;
            minimapCtx.fill();
        }

        // Viewport indicator
        const vx = cx + camera.x * scale;
        const vy = cy + camera.y * scale;
        const vw = (width / camera.zoom) * scale;
        const vh = (height / camera.zoom) * scale;
        minimapCtx.strokeStyle = 'rgba(79, 143, 255, 0.5)';
        minimapCtx.lineWidth = 1;
        minimapCtx.strokeRect(vx - vw / 2, vy - vh / 2, vw, vh);
    }

    function render(time, planetAngles) {
        ctx.clearRect(0, 0, width, height);

        // Deep space background
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
        bgGrad.addColorStop(0, '#0a0a2e');
        bgGrad.addColorStop(0.5, '#050520');
        bgGrad.addColorStop(1, '#030014');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        updateCamera();

        // Draw layers
        drawStarfield(time);
        drawEclipticRing(time);
        drawConstellationStars(time);

        // Draw orbits
        const planetPositions = {};
        for (const key of PlanetData.planetOrder) {
            drawOrbit(key, planetPositions);
        }

        // Draw Sun
        drawSun(time);

        // Draw planets
        for (const key of PlanetData.planetOrder) {
            const angle = planetAngles[key] || 0;
            drawPlanet(key, angle, time, planetPositions);
        }

        // Draw minimap
        drawMinimap(planetAngles);

        return planetPositions;
    }

    // Color utilities
    function lightenColor(hex, amount) {
        const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
        const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
        const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function darkenColor(hex, amount) {
        const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
        const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
        const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
        return `rgb(${r}, ${g}, ${b})`;
    }

    return {
        init,
        render,
        camera,
        worldToScreen,
        screenToWorld,
        get hoveredPlanet() { return hoveredPlanet; },
        set hoveredPlanet(v) { hoveredPlanet = v; },
        get selectedPlanet() { return selectedPlanet; },
        set selectedPlanet(v) { selectedPlanet = v; },
        get width() { return width; },
        get height() { return height; },
    };
})();
