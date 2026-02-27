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

    // Constellation star screen positions (for hit testing)
    let constellationStarPositions = [];
    // Planet ecliptic markers (for hit testing)
    let eclipticPlanetPositions = {};

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
        // Negate Y so planets orbit counter-clockwise (correct astronomical direction)
        const wx = Math.cos(angleRad) * displayRadius;
        const wy = -Math.sin(angleRad) * displayRadius;
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
            const my = sp.y - Math.sin(moonAngle) * moonDist;
            ctx.beginPath();
            ctx.arc(mx, my, Math.max(1.5, planetRadius * 0.2), 0, Math.PI * 2);
            ctx.fillStyle = '#ccc';
            ctx.fill();
        }

        // Planet label + constellation
        if (camera.zoom > 0.3 && planetRadius > 2) {
            const fontSize = Math.max(9, Math.min(13, 11 * camera.zoom));
            ctx.font = `500 ${fontSize}px 'Space Grotesk', sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillStyle = isHovered || isSelected
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(255, 255, 255, 0.5)';
            ctx.fillText(info.name, sp.x, sp.y + planetRadius + fontSize + 4);

            // Show which constellation the planet is in
            const constellation = Astronomy.getConstellationForLon(angle);
            const smallFontSize = Math.max(7, Math.min(10, 8 * camera.zoom));
            ctx.font = `400 ${smallFontSize}px 'Space Grotesk', sans-serif`;
            ctx.fillStyle = isHovered || isSelected
                ? 'rgba(139, 92, 246, 0.8)'
                : 'rgba(139, 92, 246, 0.45)';
            ctx.fillText('in ' + constellation, sp.x, sp.y + planetRadius + fontSize + smallFontSize + 7);
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
            const ly = sp.y - Math.sin(midAngle) * labelR;

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
            const ty1 = sp.y - Math.sin(tickAngle) * (innerR - 5);
            const tx2 = sp.x + Math.cos(tickAngle) * (outerR + 5);
            const ty2 = sp.y - Math.sin(tickAngle) * (outerR + 5);
            ctx.beginPath();
            ctx.moveTo(tx1, ty1);
            ctx.lineTo(tx2, ty2);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    function drawConstellationStars(time, planetAngles) {
        const sp = worldToScreen(0, 0);
        const eclipticR = 545 * camera.zoom;

        if (eclipticR < 80) return;

        const zodiac = ConstellationData.zodiac;
        const newStarPositions = [];

        for (const z of zodiac) {
            // Convert each star's RA/DEC to ecliptic coordinates for proper positioning
            const starPositions = z.stars.map((star) => {
                const ecl = Astronomy.raDecToEcliptic(star.ra, star.dec);

                // Use ecliptic longitude for angular position on the ring
                const angle = ecl.lon * Astronomy.DEG;
                // Use ecliptic latitude for radial offset from the ring
                const latOffset = ecl.lat * 2.5 * camera.zoom;
                const r = eclipticR + latOffset;

                const sx = sp.x + Math.cos(angle) * r;
                const sy = sp.y - Math.sin(angle) * r;
                const size = Math.max(1.2, (5 - star.mag) * 0.9 * camera.zoom);
                const color = ConstellationData.getStarColor(star.spectral);

                return { sx, sy, size, name: star.name, mag: star.mag, color, star, constellation: z.name };
            });

            // Draw connecting lines
            if (z.lines && camera.zoom > 0.5) {
                // First pass: wide glow for bloom effect
                ctx.beginPath();
                for (const [a, b] of z.lines) {
                    if (starPositions[a] && starPositions[b]) {
                        ctx.moveTo(starPositions[a].sx, starPositions[a].sy);
                        ctx.lineTo(starPositions[b].sx, starPositions[b].sy);
                    }
                }
                ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
                ctx.lineWidth = 3.5;
                ctx.setLineDash([]);
                ctx.stroke();

                // Second pass: sharp visible line
                ctx.beginPath();
                for (const [a, b] of z.lines) {
                    if (starPositions[a] && starPositions[b]) {
                        ctx.moveTo(starPositions[a].sx, starPositions[a].sy);
                        ctx.lineTo(starPositions[b].sx, starPositions[b].sy);
                    }
                }
                ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
                ctx.lineWidth = 1.2;
                ctx.setLineDash([6, 3]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Draw stars
            for (const sp2 of starPositions) {
                if (sp2.sx < -20 || sp2.sx > width + 20 || sp2.sy < -20 || sp2.sy > height + 20) continue;

                // Glow for constellation stars
                if (sp2.mag < 4.0 && sp2.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(sp2.sx, sp2.sy, sp2.size * 4, 0, Math.PI * 2);
                    const glowAlpha = Math.min(0.25, (4.5 - sp2.mag) * 0.06);
                    ctx.fillStyle = hexToRgba(sp2.color, glowAlpha);
                    ctx.fill();
                }

                // Star dot
                ctx.beginPath();
                ctx.arc(sp2.sx, sp2.sy, sp2.size, 0, Math.PI * 2);
                const alpha = Math.min(0.9, sp2.size * 0.25 + 0.3);
                ctx.fillStyle = hexToRgba(sp2.color, alpha);
                ctx.fill();

                // Star name label for bright stars when zoomed in
                if (camera.zoom > 1.2 && sp2.mag < 3.0) {
                    const fontSize = Math.max(7, Math.min(10, 8 * camera.zoom));
                    ctx.font = `400 ${fontSize}px 'Space Grotesk', sans-serif`;
                    ctx.textAlign = 'left';
                    ctx.fillStyle = `rgba(200, 190, 255, 0.45)`;
                    ctx.fillText(sp2.name, sp2.sx + sp2.size + 3, sp2.sy + 3);
                }

                // Store for hit testing
                newStarPositions.push(sp2);
            }
        }

        // Draw non-zodiac (deep sky) constellations outside the ecliptic ring
        const deepSky = ConstellationData.deepSkyConstellations;
        if (deepSky && eclipticR > 100) {
            for (const ds of deepSky) {
                const dsStarPositions = ds.stars.map((star) => {
                    const ecl = Astronomy.raDecToEcliptic(star.ra, star.dec);
                    const angle = ecl.lon * Astronomy.DEG;
                    // Larger latitude scaling — these constellations are far from the ecliptic
                    const latOffset = ecl.lat * 3.5 * camera.zoom;
                    const r = eclipticR + latOffset;
                    const sx = sp.x + Math.cos(angle) * r;
                    const sy = sp.y - Math.sin(angle) * r;
                    const size = Math.max(1.0, (5 - star.mag) * 0.85 * camera.zoom);
                    const color = ConstellationData.getStarColor(star.spectral);
                    return { sx, sy, size, name: star.name, mag: star.mag, color, star, constellation: ds.name };
                });

                // Draw connecting lines (slightly different color to distinguish from zodiac)
                if (ds.lines && camera.zoom > 0.5) {
                    ctx.beginPath();
                    for (const [a, b] of ds.lines) {
                        if (dsStarPositions[a] && dsStarPositions[b]) {
                            ctx.moveTo(dsStarPositions[a].sx, dsStarPositions[a].sy);
                            ctx.lineTo(dsStarPositions[b].sx, dsStarPositions[b].sy);
                        }
                    }
                    // Glow pass
                    ctx.strokeStyle = 'rgba(100, 160, 255, 0.06)';
                    ctx.lineWidth = 3;
                    ctx.setLineDash([]);
                    ctx.stroke();
                    // Sharp line
                    ctx.beginPath();
                    for (const [a, b] of ds.lines) {
                        if (dsStarPositions[a] && dsStarPositions[b]) {
                            ctx.moveTo(dsStarPositions[a].sx, dsStarPositions[a].sy);
                            ctx.lineTo(dsStarPositions[b].sx, dsStarPositions[b].sy);
                        }
                    }
                    ctx.strokeStyle = 'rgba(100, 160, 255, 0.25)';
                    ctx.lineWidth = 1.0;
                    ctx.setLineDash([4, 3]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }

                // Draw stars
                for (const dsStar of dsStarPositions) {
                    if (dsStar.sx < -30 || dsStar.sx > width + 30 || dsStar.sy < -30 || dsStar.sy > height + 30) continue;

                    if (dsStar.mag < 4.0 && dsStar.size > 1.2) {
                        ctx.beginPath();
                        ctx.arc(dsStar.sx, dsStar.sy, dsStar.size * 3.5, 0, Math.PI * 2);
                        const glowAlpha = Math.min(0.2, (4.5 - dsStar.mag) * 0.05);
                        ctx.fillStyle = hexToRgba(dsStar.color, glowAlpha);
                        ctx.fill();
                    }

                    ctx.beginPath();
                    ctx.arc(dsStar.sx, dsStar.sy, dsStar.size, 0, Math.PI * 2);
                    const alpha = Math.min(0.85, dsStar.size * 0.22 + 0.25);
                    ctx.fillStyle = hexToRgba(dsStar.color, alpha);
                    ctx.fill();

                    // Name labels when zoomed in
                    if (camera.zoom > 1.0 && dsStar.mag < 2.5) {
                        const fontSize = Math.max(7, Math.min(10, 8 * camera.zoom));
                        ctx.font = `400 ${fontSize}px 'Space Grotesk', sans-serif`;
                        ctx.textAlign = 'left';
                        ctx.fillStyle = 'rgba(150, 190, 255, 0.45)';
                        ctx.fillText(dsStar.name, dsStar.sx + dsStar.size + 3, dsStar.sy + 3);
                    }

                    newStarPositions.push(dsStar);
                }

                // Constellation name label
                if (camera.zoom > 0.7 && dsStarPositions.length > 0) {
                    let avgX = 0, avgY = 0;
                    for (const s of dsStarPositions) { avgX += s.sx; avgY += s.sy; }
                    avgX /= dsStarPositions.length;
                    avgY /= dsStarPositions.length;
                    const labelSize = Math.max(8, Math.min(11, 9 * camera.zoom));
                    ctx.font = `500 ${labelSize}px 'Space Grotesk', sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'rgba(150, 190, 255, 0.3)';
                    ctx.fillText(ds.nickname || ds.name, avgX, avgY - 12 * camera.zoom);
                }
            }
        }

        constellationStarPositions = newStarPositions;

        // Draw planets on the ecliptic ring (showing which constellation they're in)
        if (planetAngles && eclipticR > 100) {
            drawEclipticPlanets(sp, eclipticR, planetAngles, time);
        }
    }

    function drawEclipticPlanets(center, eclipticR, planetAngles, time) {
        const newEclipticPositions = {};

        for (const key of PlanetData.planetOrder) {
            const angle = planetAngles[key];
            if (angle === undefined) continue;

            const info = PlanetData.planetInfo[key];
            const angleRad = angle * Astronomy.DEG;
            const constellation = Astronomy.getConstellationForLon(angle);

            // Position on the ecliptic ring
            const px = center.x + Math.cos(angleRad) * eclipticR;
            const py = center.y - Math.sin(angleRad) * eclipticR;

            // Planet position on its display orbit (for connecting line)
            const displayRadius = PlanetData.orbitDisplayRadii[key] * camera.zoom;
            const planetX = center.x + Math.cos(angleRad) * displayRadius;
            const planetY = center.y - Math.sin(angleRad) * displayRadius;

            // Only draw if on screen
            if (px < -60 || px > width + 60 || py < -60 || py > height + 60) continue;

            const dotSize = Math.max(4, Math.min(9, 6 * camera.zoom));

            // Draw connecting line from planet to ecliptic marker
            ctx.beginPath();
            ctx.moveTo(planetX, planetY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = hexToRgba(info.color, 0.15);
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Glow (bigger)
            const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, dotSize * 5);
            glowGrad.addColorStop(0, info.glowColor);
            glowGrad.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(px, py, dotSize * 5, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();

            // Planet dot on ecliptic (bigger)
            ctx.beginPath();
            ctx.arc(px, py, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = info.color;
            ctx.fill();

            // White outline to distinguish from stars
            ctx.beginPath();
            ctx.arc(px, py, dotSize + 1.5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Label - always show at reasonable zoom
            if (camera.zoom > 0.4) {
                const fontSize = Math.max(9, Math.min(12, 10 * camera.zoom));
                ctx.font = `700 ${fontSize}px 'Space Grotesk', sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillStyle = info.color;
                ctx.fillText(info.name, px, py - dotSize - 7);

                // "in Constellation" label
                ctx.font = `500 ${Math.max(7, fontSize * 0.8)}px 'Space Grotesk', sans-serif`;
                ctx.fillStyle = 'rgba(139, 92, 246, 0.65)';
                ctx.fillText('in ' + constellation, px, py - dotSize - 7 - fontSize);
            }

            // Store for hit testing
            newEclipticPositions[key] = {
                sx: px, sy: py, radius: dotSize, constellation, angle
            };
        }

        eclipticPlanetPositions = newEclipticPositions;
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
            const py = cy - Math.sin(angle) * r;

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
        drawConstellationStars(time, planetAngles);

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

    // Hit test constellation stars
    function hitTestStars(mx, my) {
        for (const sp of constellationStarPositions) {
            const dx = mx - sp.sx;
            const dy = my - sp.sy;
            const hitRadius = Math.max(sp.size + 6, 10);
            if (dx * dx + dy * dy <= hitRadius * hitRadius) {
                return sp;
            }
        }
        return null;
    }

    // Color utilities
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

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
        hitTestStars,
        get hoveredPlanet() { return hoveredPlanet; },
        set hoveredPlanet(v) { hoveredPlanet = v; },
        get selectedPlanet() { return selectedPlanet; },
        set selectedPlanet(v) { selectedPlanet = v; },
        get width() { return width; },
        get height() { return height; },
        get constellationStarPositions() { return constellationStarPositions; },
        get eclipticPlanetPositions() { return eclipticPlanetPositions; },
    };
})();
