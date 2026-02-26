/**
 * Celestia — UI Controller
 * Manages modals, panels, tooltips, and user interactions
 */

const UI = (() => {
    // DOM element references
    let elements = {};

    // State
    let isPanelOpen = false;
    let activeModal = null;

    function init() {
        elements = {
            // Panels
            planetPanel: document.getElementById('planet-panel'),
            panelClose: document.getElementById('panel-close'),

            // Tooltips
            tooltip: document.getElementById('planet-tooltip'),
            tooltipName: document.querySelector('.tooltip-name'),
            tooltipIcon: document.querySelector('.tooltip-icon'),
            tooltipDistance: document.getElementById('tooltip-distance'),
            tooltipSeason: document.getElementById('tooltip-season'),

            // Star tooltip
            starTooltip: document.getElementById('star-tooltip'),
            starTooltipName: document.querySelector('.star-tooltip-name'),
            starTooltipConstellation: document.querySelector('.star-tooltip-constellation'),
            starTooltipMag: document.querySelector('.star-tooltip-mag'),
            starTooltipSpectral: document.querySelector('.star-tooltip-spectral'),
            starTooltipDist: document.querySelector('.star-tooltip-dist'),

            // Panel content
            panelPlanetName: document.getElementById('panel-planet-name'),
            panelPlanetType: document.getElementById('panel-planet-type'),
            panelDistance: document.getElementById('panel-distance'),
            panelTemperature: document.getElementById('panel-temperature'),
            panelSeason: document.getElementById('panel-season'),
            panelDayLength: document.getElementById('panel-day-length'),
            panelYearLength: document.getElementById('panel-year-length'),
            panelGravity: document.getElementById('panel-gravity'),
            panelFacts: document.getElementById('panel-facts'),
            panelMoons: document.getElementById('panel-moons'),

            // Modals
            datePickerModal: document.getElementById('date-picker-modal'),
            dateInput: document.getElementById('date-input'),
            dateTodayBtn: document.getElementById('date-today-btn'),
            dateApplyBtn: document.getElementById('date-apply-btn'),
            datePickerBtn: document.getElementById('date-picker-btn'),
            currentDateDisplay: document.getElementById('current-date-display'),

            speedModal: document.getElementById('speed-modal'),
            speedBtn: document.getElementById('speed-btn'),
            speedDisplay: document.getElementById('speed-display'),
            reverseBtn: document.getElementById('reverse-btn'),
            playPauseBtn: document.getElementById('play-pause-btn'),

            premiumModal: document.getElementById('premium-modal'),
            premiumBtn: document.getElementById('premium-btn'),

            // Zoom
            zoomIn: document.getElementById('zoom-in'),
            zoomOut: document.getElementById('zoom-out'),
            zoomSlider: document.getElementById('zoom-slider'),

            // View tabs
            viewTabs: document.querySelectorAll('.tab-btn'),

            // Bottom bar
            currentZodiac: document.getElementById('current-zodiac'),
            currentMoonPhase: document.getElementById('current-moon-phase'),
            nextEvent: document.getElementById('next-event'),

            // Ad
            adBanner: document.getElementById('ad-banner'),
            adClose: document.getElementById('ad-close'),
        };

        bindEvents();
    }

    function bindEvents() {
        // Panel close
        elements.panelClose.addEventListener('click', closePanel);

        // Modal triggers
        elements.datePickerBtn.addEventListener('click', () => toggleModal('date'));
        elements.speedBtn.addEventListener('click', () => toggleModal('speed'));
        elements.premiumBtn.addEventListener('click', () => toggleModal('premium'));

        // Modal backdrops
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
            backdrop.addEventListener('click', closeAllModals);
        });

        // Date picker
        elements.dateTodayBtn.addEventListener('click', () => {
            elements.dateInput.valueAsDate = new Date();
        });

        elements.dateApplyBtn.addEventListener('click', () => {
            const date = elements.dateInput.valueAsDate;
            if (date && window.CelestiaApp) {
                window.CelestiaApp.setDate(date);
            }
            closeAllModals();
        });

        // Speed controls
        document.querySelectorAll('.speed-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.speed-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const speed = parseFloat(btn.dataset.speed);
                if (window.CelestiaApp) {
                    window.CelestiaApp.setSpeed(speed);
                }
                elements.speedDisplay.textContent = speed === 0 ? '⏸' : speed + 'x';
            });
        });

        elements.playPauseBtn.addEventListener('click', () => {
            if (window.CelestiaApp) {
                window.CelestiaApp.togglePause();
            }
        });

        elements.reverseBtn.addEventListener('click', () => {
            if (window.CelestiaApp) {
                window.CelestiaApp.toggleReverse();
            }
        });

        // Zoom controls
        elements.zoomIn.addEventListener('click', () => {
            Renderer.camera.targetZoom = Math.min(5, Renderer.camera.targetZoom * 1.3);
            elements.zoomSlider.value = Renderer.camera.targetZoom;
        });

        elements.zoomOut.addEventListener('click', () => {
            Renderer.camera.targetZoom = Math.max(0.2, Renderer.camera.targetZoom / 1.3);
            elements.zoomSlider.value = Renderer.camera.targetZoom;
        });

        elements.zoomSlider.addEventListener('input', () => {
            Renderer.camera.targetZoom = parseFloat(elements.zoomSlider.value);
        });

        // View tabs
        elements.viewTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                elements.viewTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const view = tab.dataset.view;
                if (window.CelestiaApp) {
                    window.CelestiaApp.setView(view);
                }
            });
        });

        // Ad close
        elements.adClose.addEventListener('click', () => {
            elements.adBanner.style.display = 'none';
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (activeModal) closeAllModals();
                else if (isPanelOpen) closePanel();
            }
            if (e.key === '+' || e.key === '=') {
                Renderer.camera.targetZoom = Math.min(5, Renderer.camera.targetZoom * 1.15);
            }
            if (e.key === '-' || e.key === '_') {
                Renderer.camera.targetZoom = Math.max(0.2, Renderer.camera.targetZoom / 1.15);
            }
            if (e.key === ' ') {
                e.preventDefault();
                if (window.CelestiaApp) window.CelestiaApp.togglePause();
            }
        });
    }

    function toggleModal(type) {
        const modals = {
            date: elements.datePickerModal,
            speed: elements.speedModal,
            premium: elements.premiumModal,
        };

        if (activeModal === type) {
            closeAllModals();
            return;
        }

        closeAllModals();
        modals[type].classList.remove('hidden');
        activeModal = type;
    }

    function closeAllModals() {
        elements.datePickerModal.classList.add('hidden');
        elements.speedModal.classList.add('hidden');
        elements.premiumModal.classList.add('hidden');
        activeModal = null;
    }

    function showTooltip(key, screenX, screenY, distanceAU, season, constellation) {
        const info = PlanetData.planetInfo[key];
        elements.tooltipIcon.textContent = info.icon;
        elements.tooltipName.textContent = info.name + (constellation ? '  in ' + constellation : '');
        elements.tooltipDistance.textContent = Astronomy.formatDistance(distanceAU);
        elements.tooltipSeason.textContent = season;

        // Position tooltip
        const tooltip = elements.tooltip;
        tooltip.classList.remove('hidden');

        let tx = screenX + 20;
        let ty = screenY - 20;

        // Keep on screen
        const rect = tooltip.getBoundingClientRect();
        if (tx + 250 > window.innerWidth) tx = screenX - 260;
        if (ty + 150 > window.innerHeight) ty = screenY - 160;
        if (ty < 60) ty = 60;

        tooltip.style.left = tx + 'px';
        tooltip.style.top = ty + 'px';
    }

    function hideTooltip() {
        elements.tooltip.classList.add('hidden');
    }

    function showStarTooltip(starData, screenX, screenY) {
        elements.starTooltipName.textContent = starData.name;
        elements.starTooltipConstellation.textContent = starData.constellation;
        elements.starTooltipMag.textContent = starData.star.mag.toFixed(2);

        const spectral = starData.star.spectral || 'Unknown';
        const spectralDescriptions = {
            'O': 'Blue supergiant', 'B': 'Blue-white', 'A': 'White',
            'F': 'Yellow-white', 'G': 'Yellow (Sun-like)', 'K': 'Orange', 'M': 'Red'
        };
        const specDesc = spectralDescriptions[spectral.charAt(0)] || '';
        elements.starTooltipSpectral.textContent = spectral + (specDesc ? ' (' + specDesc + ')' : '');

        const dist = starData.star.dist;
        elements.starTooltipDist.textContent = dist < 100
            ? dist.toFixed(1) + ' light years'
            : Math.round(dist) + ' light years';

        // Position tooltip
        const tooltip = elements.starTooltip;
        tooltip.classList.remove('hidden');

        let tx = screenX + 20;
        let ty = screenY - 20;

        // Keep on screen
        if (tx + 230 > window.innerWidth) tx = screenX - 240;
        if (ty + 140 > window.innerHeight) ty = screenY - 150;
        if (ty < 60) ty = 60;

        tooltip.style.left = tx + 'px';
        tooltip.style.top = ty + 'px';
    }

    function hideStarTooltip() {
        elements.starTooltip.classList.add('hidden');
    }

    function openPanel(key, distanceAU, season, constellation) {
        const info = PlanetData.planetInfo[key];

        elements.panelPlanetName.textContent = info.name;
        elements.panelPlanetType.textContent = info.type + (constellation ? ' — in ' + constellation : '');
        elements.panelDistance.textContent = Astronomy.formatDistance(distanceAU);
        elements.panelTemperature.textContent = info.surfaceTemp;
        elements.panelSeason.textContent = season;
        elements.panelDayLength.textContent = info.dayLength;
        elements.panelYearLength.textContent = info.yearLength;
        elements.panelGravity.textContent = info.gravity;

        // Facts
        elements.panelFacts.innerHTML = info.facts
            .map(f => `<li>${f}</li>`)
            .join('');

        // Moons
        elements.panelMoons.innerHTML = info.moons.length > 0
            ? info.moons.map(m => `<span class="moon-chip">${m}</span>`).join('')
            : '<span class="moon-chip">No known moons</span>';

        // Draw planet preview
        drawPlanetPreview(key);

        // Show panel
        elements.planetPanel.classList.remove('hidden');
        setTimeout(() => elements.planetPanel.classList.add('visible'), 10);
        isPanelOpen = true;
    }

    function closePanel() {
        elements.planetPanel.classList.remove('visible');
        setTimeout(() => {
            elements.planetPanel.classList.add('hidden');
        }, 400);
        isPanelOpen = false;
        Renderer.selectedPlanet = null;
    }

    function drawPlanetPreview(key) {
        const canvas = document.getElementById('planet-3d-canvas');
        const ctx = canvas.getContext('2d');
        const info = PlanetData.planetInfo[key];
        const cx = 100, cy = 100, r = 60;

        ctx.clearRect(0, 0, 200, 200);

        // Glow
        const glowGrad = ctx.createRadialGradient(cx, cy, r, cx, cy, r * 2);
        glowGrad.addColorStop(0, info.glowColor);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 2, 0, Math.PI * 2);
        ctx.fill();

        // Planet sphere
        const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
        const baseColor = info.color;

        // Add surface detail based on planet type
        if (key === 'earth') {
            grad.addColorStop(0, '#8ec8ff');
            grad.addColorStop(0.3, '#4f8fff');
            grad.addColorStop(0.5, '#3a7a30');
            grad.addColorStop(0.7, '#4f8fff');
            grad.addColorStop(1, '#1a3a6a');
        } else if (key === 'jupiter') {
            grad.addColorStop(0, '#e8d0a0');
            grad.addColorStop(0.3, '#c4956a');
            grad.addColorStop(0.45, '#a07040');
            grad.addColorStop(0.55, '#c4956a');
            grad.addColorStop(0.7, '#e8c090');
            grad.addColorStop(0.85, '#c4956a');
            grad.addColorStop(1, '#6a4520');
        } else if (key === 'mars') {
            grad.addColorStop(0, '#f0a070');
            grad.addColorStop(0.3, '#e07040');
            grad.addColorStop(0.6, '#c05030');
            grad.addColorStop(0.8, '#e07040');
            grad.addColorStop(1, '#802010');
        } else {
            grad.addColorStop(0, lightenHex(baseColor, 50));
            grad.addColorStop(0.5, baseColor);
            grad.addColorStop(1, darkenHex(baseColor, 60));
        }

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Surface lines for gas giants
        if (['jupiter', 'saturn'].includes(key)) {
            for (let i = -3; i <= 3; i++) {
                const yOff = i * (r / 4);
                const bandWidth = r * Math.cos(Math.asin(yOff / r)) * 2;
                if (bandWidth <= 0) continue;
                ctx.beginPath();
                ctx.moveTo(cx - bandWidth / 2, cy + yOff);
                ctx.lineTo(cx + bandWidth / 2, cy + yOff);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + Math.abs(i) * 0.02})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        // Saturn rings in preview
        if (key === 'saturn') {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(1, 0.3);
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.arc(0, 0, r * (1.5 + i * 0.25), 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(232, 208, 136, ${0.5 - i * 0.12})`;
                ctx.lineWidth = 4 - i;
                ctx.stroke();
            }
            ctx.restore();
        }

        // Atmosphere edge glow
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.15)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    function updateDateDisplay(date) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        elements.currentDateDisplay.textContent = date.toLocaleDateString('en-US', options);
        elements.dateInput.valueAsDate = date;
    }

    function updateBottomBar(zodiac, moonPhase) {
        elements.currentZodiac.textContent = `${zodiac.symbol} ${zodiac.name}`;
        elements.currentMoonPhase.textContent = `${moonPhase.emoji} ${moonPhase.name}`;
    }

    function lightenHex(hex, amount) {
        const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
        const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
        const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function darkenHex(hex, amount) {
        const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
        const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
        const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
        return `rgb(${r}, ${g}, ${b})`;
    }

    return {
        init,
        showTooltip,
        hideTooltip,
        showStarTooltip,
        hideStarTooltip,
        openPanel,
        closePanel,
        updateDateDisplay,
        updateBottomBar,
        closeAllModals,
        get isPanelOpen() { return isPanelOpen; },
    };
})();
