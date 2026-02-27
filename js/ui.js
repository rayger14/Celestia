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

            knowledgeModal: document.getElementById('knowledge-modal'),
            knowledgeBtn: document.getElementById('knowledge-btn'),
            knowledgeClose: document.getElementById('knowledge-close'),

            birthdayModal: document.getElementById('birthday-modal'),
            birthdayBtn: document.getElementById('birthday-btn'),
            birthdayClose: document.getElementById('birthday-close'),
            birthdayInput: document.getElementById('birthday-input'),
            birthdayGenerateBtn: document.getElementById('birthday-generate-btn'),
            birthdayInputSection: document.getElementById('birthday-input-section'),
            birthdayResults: document.getElementById('birthday-results'),
            birthdayChangeBtn: document.getElementById('birthday-change-btn'),
            birthdayPlanetsGrid: document.getElementById('birthday-planets-grid'),
            birthdayCompareToggle: document.getElementById('birthday-compare-toggle'),
            birthdayCompareForm: document.getElementById('birthday-compare-form'),
            birthdayCompareInput: document.getElementById('birthday-compare-input'),
            birthdayCompareBtn: document.getElementById('birthday-compare-btn'),
            birthdayCompareResults: document.getElementById('birthday-compare-results'),

            // Panel wisdom
            panelWisdomSection: document.getElementById('panel-wisdom-section'),
            panelWisdomName: document.getElementById('panel-wisdom-name'),
            panelWisdomAssociation: document.getElementById('panel-wisdom-association'),
            panelWisdomTradition: document.getElementById('panel-wisdom-tradition'),

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
        elements.knowledgeBtn.addEventListener('click', () => toggleModal('knowledge'));
        elements.knowledgeClose.addEventListener('click', closeAllModals);
        elements.birthdayBtn.addEventListener('click', () => toggleModal('birthday'));
        elements.birthdayClose.addEventListener('click', closeAllModals);

        // Birthday form
        elements.birthdayGenerateBtn.addEventListener('click', () => {
            const val = elements.birthdayInput.value;
            if (!val) return;
            const parts = val.split('-');
            const date = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2], 12, 0, 0));
            localStorage.setItem('celestia-birthday', val);
            generateBirthdayProfile(date);
        });

        elements.birthdayChangeBtn.addEventListener('click', () => {
            elements.birthdayResults.classList.add('hidden');
            elements.birthdayInputSection.classList.remove('hidden');
        });

        // Birthday tabs
        document.querySelectorAll('.birthday-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.birthday-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.birthday-section').forEach(s => s.classList.remove('active'));
                document.getElementById('bsection-' + tab.dataset.btab).classList.add('active');
            });
        });

        // Birthday comparison
        elements.birthdayCompareToggle.addEventListener('click', () => {
            elements.birthdayCompareForm.classList.toggle('hidden');
        });

        elements.birthdayCompareBtn.addEventListener('click', () => {
            const val = elements.birthdayCompareInput.value;
            if (!val) return;
            const parts = val.split('-');
            const date2 = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2], 12, 0, 0));
            generateComparison(date2);
        });

        // Load saved birthday
        const savedBirthday = localStorage.getItem('celestia-birthday');
        if (savedBirthday) {
            elements.birthdayInput.value = savedBirthday;
        }

        // Knowledge tabs
        document.querySelectorAll('.knowledge-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.knowledge-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.knowledge-section').forEach(s => s.classList.remove('active'));
                document.getElementById('ksection-' + tab.dataset.ktab).classList.add('active');
            });
        });

        // Populate knowledge content on first open
        populateKnowledgeContent();

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
            knowledge: elements.knowledgeModal,
            birthday: elements.birthdayModal,
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
        elements.knowledgeModal.classList.add('hidden');
        elements.birthdayModal.classList.add('hidden');
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

        // Planet wisdom
        const wisdom = CosmicKnowledge.planetWisdom[key];
        if (wisdom) {
            elements.panelWisdomSection.style.display = '';
            elements.panelWisdomName.textContent = wisdom.ancientName;
            elements.panelWisdomAssociation.textContent = wisdom.association;
            elements.panelWisdomTradition.textContent = wisdom.tradition;
        } else {
            elements.panelWisdomSection.style.display = 'none';
        }

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

    // ──────────────────────────────────────────────
    // Birthday Cosmic Profile
    // ──────────────────────────────────────────────

    let birthdayContentPopulated = false;

    function buildLayerCard(item) {
        const badgeLabel = { confirmed: 'Confirmed Science', tradition: 'Real Historical Tradition', symbolic: 'Symbolic Correspondence', synthesis: 'Modern Synthesis' };
        return `
            <div class="layer-card" data-id="${item.id}">
                <div class="layer-card-header">
                    <span class="layer-card-icon">${item.icon}</span>
                    <span class="layer-card-title">${item.title}</span>
                    <span class="epistemic-badge epistemic-${item.badge}">${badgeLabel[item.badge] || item.badge}</span>
                </div>
                <div class="layer-card-summary">${item.summary}</div>
                <div class="layer-card-details">${item.details || ''}</div>
                ${item.source ? `<div class="layer-card-source">${item.source}</div>` : ''}
                ${item.details ? '<button class="layer-card-toggle">Read more</button>' : ''}
            </div>
        `;
    }

    function bindLayerCardToggles(container) {
        container.addEventListener('click', (e) => {
            const toggle = e.target.closest('.layer-card-toggle');
            if (!toggle) return;
            const card = toggle.closest('.layer-card');
            card.classList.toggle('expanded');
            toggle.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more';
        });
    }

    function generateBirthdayProfile(date) {
        const sky = Astronomy.getBirthSky(date);
        const profile = CosmicKnowledge.zodiacProfiles[sky.zodiac.name];
        const solarReturn = Astronomy.calculateSolarReturn(sky.sunLongitude, new Date());

        // Show results, hide input
        elements.birthdayInputSection.classList.add('hidden');
        elements.birthdayResults.classList.remove('hidden');

        // Header
        document.getElementById('birthday-glyph').textContent = sky.zodiac.symbol;
        document.getElementById('birthday-sign-name').textContent = sky.zodiac.name;

        const dateOpts = { month: 'long', day: 'numeric', year: 'numeric' };
        document.getElementById('birthday-date-label').textContent = date.toLocaleDateString('en-US', dateOpts);

        // Sky summary
        document.getElementById('bsky-sun').textContent = `${sky.zodiac.symbol} ${sky.zodiac.name}`;
        document.getElementById('bsky-sun-lon').textContent = `${sky.sunLongitude.toFixed(1)}° ecliptic`;

        document.getElementById('bsky-moon').textContent = `${sky.moonPhase.emoji} ${sky.moonPhase.name}`;
        document.getElementById('bsky-moon-illum').textContent = `${Math.round(sky.moonPhase.illumination * 100)}% illuminated`;

        const returnOpts = { month: 'short', day: 'numeric', year: 'numeric' };
        document.getElementById('bsky-return').textContent = solarReturn.toLocaleDateString('en-US', returnOpts);

        // Planet positions grid
        const planetsGrid = elements.birthdayPlanetsGrid;
        if (planetsGrid) {
            const displayPlanets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
            planetsGrid.innerHTML = displayPlanets.map(key => {
                const pos = sky.planets[key];
                if (!pos) return '';
                const sign = Astronomy.getConstellationForLon(pos.lon);
                const info = typeof PlanetData !== 'undefined' ? PlanetData.planetInfo[key] : null;
                const zodiacProfile = CosmicKnowledge.zodiacProfiles[sign];
                const bodyInfo = CosmicKnowledge.planetBodyMap[key];
                const icon = info ? info.icon : key.charAt(0).toUpperCase();
                const name = info ? info.name : key.charAt(0).toUpperCase() + key.slice(1);
                const glyph = zodiacProfile ? zodiacProfile.glyph : '';
                const element = zodiacProfile ? zodiacProfile.element : '';
                const signMeaning = (bodyInfo && bodyInfo.inElement && element) ? bodyInfo.inElement[element] : '';

                return `
                    <div class="birth-planet-card" data-planet="${key}">
                        <div class="birth-planet-header">
                            <span class="birth-planet-icon">${icon}</span>
                            <span class="birth-planet-name">${name}</span>
                            <span class="birth-planet-sign">${glyph} ${sign}</span>
                            <span class="birth-planet-lon">${pos.lon.toFixed(1)}\u00B0</span>
                        </div>
                        ${signMeaning ? `<div class="birth-planet-meaning">${signMeaning}</div>` : ''}
                        ${bodyInfo ? `
                        <div class="birth-planet-body hidden">
                            <div class="birth-planet-tradition">${bodyInfo.tradition}</div>
                            <div><strong>Body rulership:</strong> ${bodyInfo.bodyRegion}</div>
                            <div><strong>System:</strong> ${bodyInfo.system}</div>
                        </div>
                        <button class="birth-planet-expand">Details</button>
                        ` : ''}
                    </div>
                `;
            }).join('');

            planetsGrid.addEventListener('click', (e) => {
                const btn = e.target.closest('.birth-planet-expand');
                if (!btn) return;
                const card = btn.closest('.birth-planet-card');
                const body = card.querySelector('.birth-planet-body');
                body.classList.toggle('hidden');
                btn.textContent = body.classList.contains('hidden') ? 'Details' : 'Hide';
            });
        }

        // Season box
        const sp = sky.seasonalPosition;
        let seasonText = '';
        if (profile) {
            seasonText = `<strong>${sky.zodiac.name} — ${profile.element} sign, ${profile.modality}</strong><br>${profile.season}`;
            if (sp.degreesAway < 15) {
                seasonText += `<br><br><em>Your Sun is ${sp.degreesAway}\u00B0 from the ${sp.nearest.name} — ${sp.nearest.metaphor}</em>`;
            }
        }
        document.getElementById('birthday-season-box').innerHTML = seasonText;

        // Populate content (once)
        if (!birthdayContentPopulated) {
            populateBirthdayContent();
            birthdayContentPopulated = true;
        }
    }

    function populateBirthdayContent() {
        // Ancient Traditions tab: solar mythology + yogic + sufi + christian alchemy
        const tradContainer = document.getElementById('birthday-traditions-cards');
        const allTraditions = [
            ...CosmicKnowledge.solarMythology,
            ...CosmicKnowledge.yogicTradition,
            ...CosmicKnowledge.sufiTradition,
            ...CosmicKnowledge.christianAlchemy,
        ];
        tradContainer.innerHTML = allTraditions.map(buildLayerCard).join('');
        bindLayerCardToggles(tradContainer);

        // Symbolic Patterns tab
        const patContainer = document.getElementById('birthday-patterns-cards');
        patContainer.innerHTML = CosmicKnowledge.anatomyPatterns.map(buildLayerCard).join('');
        bindLayerCardToggles(patContainer);

        // Modern Science tab
        const sciContainer = document.getElementById('birthday-science-cards');
        sciContainer.innerHTML = CosmicKnowledge.neuroscienceLayer.map(buildLayerCard).join('');
        bindLayerCardToggles(sciContainer);

        // The Synthesis tab
        const secContainer = document.getElementById('birthday-secretion-cards');
        secContainer.innerHTML = CosmicKnowledge.sacredSecretion.map(buildLayerCard).join('');
        bindLayerCardToggles(secContainer);

        // Lunar & Body Cycles tab
        // Consciousness tab: Entheogens + Gateway Process + Convergence
        const enthContainer = document.getElementById('entheogen-cards');
        if (enthContainer) {
            enthContainer.innerHTML = CosmicKnowledge.entheogens.map(buildLayerCard).join('');
            bindLayerCardToggles(enthContainer);
        }

        const gwContainer = document.getElementById('gateway-cards');
        if (gwContainer) {
            gwContainer.innerHTML = CosmicKnowledge.gatewayProcess.map(buildLayerCard).join('');
            bindLayerCardToggles(gwContainer);
        }

        const convContainer = document.getElementById('convergence-cards');
        if (convContainer) {
            convContainer.innerHTML = CosmicKnowledge.consciousnessConvergence.map(buildLayerCard).join('');
            bindLayerCardToggles(convContainer);
        }

        const lunarDiagram = document.getElementById('lunar-cycle-diagram');
        if (lunarDiagram) {
            lunarDiagram.innerHTML = CosmicKnowledge.lunarCyclePhases.map(phase => `
                <div class="lunar-phase-column">
                    <span class="lunar-moon-emoji">${phase.moonEmoji}</span>
                    <div class="lunar-moon-label">${phase.moonPhase}</div>
                    <div class="lunar-moon-days">Days ${phase.moonDays}</div>
                    <div class="lunar-divider"></div>
                    <div class="lunar-cycle-label" style="color: ${phase.cycleColor}">${phase.cycleName}</div>
                    <div class="lunar-cycle-days">Days ${phase.cycleDays}</div>
                    <div class="lunar-hormones">${phase.hormones}</div>
                    <div class="lunar-body-effect">${phase.lunarBody}</div>
                    <div class="lunar-tradition">${phase.tradition}</div>
                </div>
            `).join('');
        }

        const lunarStudyCards = document.getElementById('lunar-study-cards');
        if (lunarStudyCards) {
            lunarStudyCards.innerHTML = '<h3 class="lunar-studies-title">The Science</h3>' +
                CosmicKnowledge.lunarCycleStudies.map(buildLayerCard).join('');
            bindLayerCardToggles(lunarStudyCards);
        }
    }

    function generateComparison(date2) {
        const savedBirthday = localStorage.getItem('celestia-birthday');
        if (!savedBirthday) return;
        const parts1 = savedBirthday.split('-');
        const date1 = new Date(Date.UTC(+parts1[0], +parts1[1] - 1, +parts1[2], 12, 0, 0));

        const sky1 = Astronomy.getBirthSky(date1);
        const sky2 = Astronomy.getBirthSky(date2);

        const profile1 = CosmicKnowledge.zodiacProfiles[sky1.zodiac.name];
        const profile2 = CosmicKnowledge.zodiacProfiles[sky2.zodiac.name];

        // Sun aspect
        const aspect = Astronomy.computeAspect(sky1.sunLongitude, sky2.sunLongitude);
        const aspectText = aspect
            ? CosmicKnowledge.aspectMeanings[aspect.name] || ''
            : '';

        // Element compatibility
        const elKey = [profile1.element, profile2.element].sort().join('-');
        const compat = CosmicKnowledge.elementCompatibility[elKey];

        // Modality
        const modalityText = getModalityText(profile1.modality, profile2.modality);

        // Sign mythology
        const myth1 = CosmicKnowledge.signMythology[sky1.zodiac.name];
        const myth2 = CosmicKnowledge.signMythology[sky2.zodiac.name];

        const container = elements.birthdayCompareResults;
        container.classList.remove('hidden');
        elements.birthdayCompareForm.classList.add('hidden');

        container.innerHTML = `
            <div class="compare-header">
                <div class="compare-person">
                    <span class="compare-glyph">${sky1.zodiac.symbol}</span>
                    <span class="compare-name">${sky1.zodiac.name}</span>
                    <span class="compare-element">${profile1.element} \u2022 ${profile1.modality}</span>
                </div>
                <div class="compare-vs">&amp;</div>
                <div class="compare-person">
                    <span class="compare-glyph">${sky2.zodiac.symbol}</span>
                    <span class="compare-name">${sky2.zodiac.name}</span>
                    <span class="compare-element">${profile2.element} \u2022 ${profile2.modality}</span>
                </div>
            </div>

            <div class="compare-card">
                <h4>Sun-to-Sun Aspect (Ptolemaic)</h4>
                ${aspect
                    ? `<div class="compare-aspect">
                           <span class="aspect-symbol">${aspect.symbol}</span>
                           <span class="aspect-name">${aspect.name}</span>
                           <span class="aspect-angle">${aspect.exactAngle}\u00B0</span>
                       </div>
                       <p class="aspect-meaning">${aspectText}</p>`
                    : '<p class="aspect-meaning">No major Ptolemaic aspect \u2014 the two Suns are not at a classical angular relationship (conjunction, sextile, square, trine, or opposition). Ptolemy would consider this a neutral placement.</p>'
                }
            </div>

            <div class="compare-card">
                <h4>Element Compatibility</h4>
                <div class="compare-elements">
                    <span class="element-tag element-${profile1.element.toLowerCase()}">${profile1.element}</span>
                    <span style="color: var(--text-muted)">+</span>
                    <span class="element-tag element-${profile2.element.toLowerCase()}">${profile2.element}</span>
                    ${compat ? `<span class="compat-rating compat-${compat.rating.toLowerCase()}">${compat.rating}</span>` : ''}
                </div>
                ${compat ? `<p class="compare-desc">${compat.desc}</p>` : ''}
            </div>

            <div class="compare-card">
                <h4>Modality</h4>
                <p class="compare-desc">${profile1.modality} + ${profile2.modality} \u2014 ${modalityText}</p>
            </div>

            ${myth1 ? `
            <div class="compare-card">
                <h4>${sky1.zodiac.name} \u2014 ${myth1.title}</h4>
                <p class="compare-myth"><strong>Greek:</strong> ${myth1.greek}</p>
                <p class="compare-myth"><strong>Persian/Zoroastrian:</strong> ${myth1.persian}</p>
                <p class="compare-myth-source">${myth1.source}</p>
            </div>
            ` : ''}

            ${myth2 ? `
            <div class="compare-card">
                <h4>${sky2.zodiac.name} \u2014 ${myth2.title}</h4>
                <p class="compare-myth"><strong>Greek:</strong> ${myth2.greek}</p>
                <p class="compare-myth"><strong>Persian/Zoroastrian:</strong> ${myth2.persian}</p>
                <p class="compare-myth-source">${myth2.source}</p>
            </div>
            ` : ''}

            <button class="birthday-compare-reset" id="birthday-compare-reset">Compare a different birthday</button>
        `;

        const resetBtn = container.querySelector('#birthday-compare-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                container.classList.add('hidden');
                container.innerHTML = '';
                elements.birthdayCompareForm.classList.remove('hidden');
            });
        }
    }

    function getModalityText(m1, m2) {
        if (m1 === m2) return `Both ${m1} \u2014 you share the same approach to change and action.`;
        const combos = {
            'Cardinal-Fixed': 'One initiates, the other sustains. Cardinal energy starts things; Fixed energy completes them. Complementary if you respect each other\'s rhythm.',
            'Cardinal-Mutable': 'One initiates, the other adapts. Cardinal leads, Mutable adjusts. A fluid partnership that can move quickly.',
            'Fixed-Mutable': 'One stabilizes, the other flexes. Fixed provides anchor; Mutable provides versatility. Grounding meets adaptability.',
        };
        const key = [m1, m2].sort().join('-');
        return combos[key] || 'Different approaches to change.';
    }

    function populateKnowledgeContent() {
        // Science cards
        const scienceContainer = document.getElementById('science-cards');
        scienceContainer.innerHTML = CosmicKnowledge.modernScience.map(item => {
            const citationsHtml = item.citations.map(c =>
                `<div class="citation">${c.text}</div>`
            ).join('');
            return `
                <div class="science-card" data-id="${item.id}">
                    <div class="science-card-header">
                        <span class="science-card-icon">${item.icon}</span>
                        <span class="science-card-title">${item.title}</span>
                        <span class="verdict-badge verdict-${item.verdict}">${item.verdict}</span>
                    </div>
                    <div class="science-card-finding">${item.finding}</div>
                    <div class="science-card-details">${item.details}</div>
                    <div class="science-card-citations">${citationsHtml}</div>
                    <button class="science-card-toggle">Read more</button>
                </div>
            `;
        }).join('');

        scienceContainer.addEventListener('click', (e) => {
            const toggle = e.target.closest('.science-card-toggle');
            if (!toggle) return;
            const card = toggle.closest('.science-card');
            card.classList.toggle('expanded');
            toggle.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more';
        });

        // Ancient tradition cards
        const ancientContainer = document.getElementById('ancient-cards');
        ancientContainer.innerHTML = CosmicKnowledge.ancientTraditions.map(item => `
            <div class="ancient-card" data-id="${item.id}">
                <div class="ancient-card-header">
                    <span class="ancient-card-icon">${item.icon}</span>
                    <div class="ancient-card-title-group">
                        <div class="ancient-card-title">${item.title}</div>
                        <div class="ancient-card-period">${item.period}</div>
                    </div>
                </div>
                <div class="ancient-card-summary">${item.summary}</div>
                <div class="ancient-card-body">${item.content}</div>
                <div class="ancient-card-insight">
                    <div class="ancient-card-insight-label">Key Insight</div>
                    <div class="ancient-card-insight-text">${item.keyInsight}</div>
                </div>
                <div class="ancient-card-source">${item.source}</div>
                <button class="ancient-card-toggle">Read more</button>
            </div>
        `).join('');

        ancientContainer.addEventListener('click', (e) => {
            const toggle = e.target.closest('.ancient-card-toggle');
            if (!toggle) return;
            const card = toggle.closest('.ancient-card');
            card.classList.toggle('expanded');
            toggle.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more';
        });

        // Deeper question
        const deeperContainer = document.getElementById('deeper-question-content');
        const dq = CosmicKnowledge.deeperQuestion;
        deeperContainer.innerHTML = `
            <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: var(--text-bright); margin-bottom: 20px;">${dq.title}</h3>
            ${dq.paragraphs.map(p => `<div class="deeper-paragraph">${p}</div>`).join('')}
        `;
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
