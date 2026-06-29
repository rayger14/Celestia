/**
 * Celestia — Engagement Module
 * Interactive features: Discovery, Briefing, Quiz, Bookmarks, Alignment, Share
 */

const Engagement = (() => {
    'use strict';

    // ── Persistence Layer ───────────────────────────────────────
    const Store = {
        KEY: 'celestia-engagement',

        defaults() {
            return {
                version: 1,
                discovery: { activePath: null, paths: {}, completedPaths: [] },
                briefing: { lastViewedDate: null, dismissedToday: false },
                quiz: {
                    totalAnswered: 0, totalCorrect: 0,
                    streak: 0, bestStreak: 0, lastQuizDate: null,
                    categoryScores: {},
                    badges: [], answeredIds: []
                },
                bookmarks: { items: [] },
                alignment: { checkIns: {} }
            };
        },

        load() {
            try {
                const raw = localStorage.getItem(this.KEY);
                if (!raw) return this.defaults();
                const data = JSON.parse(raw);
                const def = this.defaults();
                Object.keys(def).forEach(k => {
                    if (data[k] === undefined) data[k] = def[k];
                });
                return data;
            } catch { return this.defaults(); }
        },

        save(state) {
            try { localStorage.setItem(this.KEY, JSON.stringify(state)); } catch {}
        },

        get(path) {
            const state = this.load();
            return path.split('.').reduce((o, k) => o && o[k], state);
        },

        set(path, value) {
            const state = this.load();
            const keys = path.split('.');
            let obj = state;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!obj[keys[i]]) obj[keys[i]] = {};
                obj = obj[keys[i]];
            }
            obj[keys[keys.length - 1]] = value;
            this.save(state);
            return state;
        },

        getBirthday() {
            const engagement = this.load();
            return localStorage.getItem('celestia-birthday') || null;
        }
    };

    // ── Discovery Paths Data ────────────────────────────────────
    const DISCOVERY_PATHS = [
        {
            id: 'three-kings-trail',
            title: 'The Three Kings Trail',
            subtitle: 'From Orion to Bethlehem — astronomy, myth, and meaning',
            icon: '⭐',
            difficulty: 'beginner',
            estimatedMinutes: 12,
            steps: [
                {
                    title: 'Look Up: Three Stars in a Row',
                    narrative: 'On any winter night, you can see three bright stars in a nearly perfect line. The ancient Egyptians called them the "string of stars." Across the Middle East, they are "the Three Kings." In astronomy, they are the belt of the constellation Orion — Alnitak, Alnilam, and Mintaka.',
                    cards: [{ source: 'cosmicNarratives', id: 'star-ancestors' }],
                    quiz: {
                        question: 'What did the ancient Egyptians track Sirius\'s rising to predict?',
                        options: ['Earthquakes', 'The Nile flood', 'Solar eclipses', 'Volcanic eruptions'],
                        correct: 1,
                        explanation: 'Sirius\'s heliacal rising predicted the Nile flood — the most important annual event in Egyptian civilization.'
                    }
                },
                {
                    title: 'Follow the Line to the Brightest Star',
                    narrative: 'If you extend the line of the Three Kings downward and to the left, it points directly to Sirius — the brightest star in the entire night sky. The Egyptians called it Sopdet; the Greeks, Sothis. On December 25, this alignment points to where the Sun rises on the horizon. The Three Kings follow the Star in the East to find the newborn Sun.',
                    cards: [{ source: 'thesisStatement', id: 'zodiac-every-religion' }],
                    quiz: null
                },
                {
                    title: 'The Solar Death and Rebirth',
                    narrative: 'At the winter solstice, the Sun reaches its lowest point in the sky. For roughly 3 days, its noon altitude barely changes — it appears to "stand still." Then on ~December 25, it begins measurably rising again. The Sun dies for 3 days and is reborn. This is the astronomical event behind the oldest story in human civilization.',
                    cards: [{ source: 'cosmicNarratives', id: 'dying-rising-god' }],
                    quiz: null
                },
                {
                    title: 'The Constellation Virgo',
                    narrative: 'On December 25, one more alignment occurs. Just before sunrise, the constellation Virgo — the Virgin — rises on the eastern horizon. The Virgin "gives birth" to the new Sun. This astronomical event was observed by every civilization that tracked the sky.',
                    cards: [{ source: 'cosmicNarratives', id: 'virgin-birth' }],
                    quiz: {
                        question: 'What does "solstice" literally mean in Latin?',
                        options: ['Sun returns', 'Dark night', 'Sun stands still', 'Sky turns'],
                        correct: 2,
                        explanation: 'Solstice = sol (sun) + sistere (to stand still). The Sun appears to stand still at its lowest point for ~3 days.'
                    }
                },
                {
                    title: 'The Pattern Across Cultures',
                    narrative: 'Osiris, Mithras, Dionysus, Attis, Baldur, Christ — each tradition tells the same arc: a divine figure of light who dies and is reborn. Not because they copied each other, but because they all observed the same sky. The ancients encoded astronomical events in the only language available: story.',
                    cards: [{ source: 'thesisStatement', id: 'the-pattern' }],
                    quiz: null
                },
                {
                    title: 'Synthesis: What the Three Kings Really Are',
                    narrative: 'The "Three Kings" who follow the "Star in the East" to find the newborn Sun on December 25 are three stars — Alnitak, Alnilam, and Mintaka — whose alignment with Sirius points to the sunrise location at the winter solstice. The story is not metaphor. It is an observation of the sky, told as narrative, preserved for 5,000+ years. You can go outside tonight and verify it yourself.',
                    cards: [],
                    quiz: null,
                    completionMessage: 'You have walked the Three Kings Trail. Every winter night, you can now see this story written in the sky.'
                }
            ],
            rewardBadge: { id: 'three-kings', name: 'Three Kings', icon: '⭐⭐⭐' }
        },
        {
            id: 'solar-body-map',
            title: 'The Solar Body Map',
            subtitle: 'How planets map to your body — iron, copper, and ancient medicine',
            icon: '🦴',
            difficulty: 'intermediate',
            estimatedMinutes: 10,
            steps: [
                {
                    title: 'Mars, Iron, and Blood',
                    narrative: 'Mars appears red because its surface is coated in iron oxide — rust. Your blood is red because hemoglobin uses iron to carry oxygen. Every tradition assigned Mars to iron and blood. Coincidence, or observation?',
                    cards: [{ source: 'anatomyPatterns', id: 'mars-body' }],
                    quiz: { question: 'What metal did the ancients assign to Mars?', options: ['Gold', 'Silver', 'Iron', 'Copper'], correct: 2, explanation: 'Iron (Fe) was universally linked to Mars across alchemy, Ayurveda, and Western tradition.' }
                },
                {
                    title: 'The Sun and Gold',
                    narrative: 'Gold does not tarnish. It resists corrosion. In the body, the solar plexus — named after the sun — is the nerve center that governs digestion, energy distribution, and autonomic function. The alchemists called gold "the Sun\'s metal" and the heart "the Sun of the body."',
                    cards: [{ source: 'anatomyPatterns', id: 'sun-body' }],
                    quiz: null
                },
                {
                    title: 'Venus, Copper, and Hormones',
                    narrative: 'Venus was assigned copper — and copper is essential for estrogen metabolism. The island of Cyprus, sacred to Aphrodite (Venus), was the ancient world\'s primary copper source. The chemical symbol for copper, Cu, comes from Cuprum — Cyprus.',
                    cards: [{ source: 'anatomyPatterns', id: 'venus-body' }],
                    quiz: null
                },
                {
                    title: 'The Complete Map',
                    narrative: 'Mercury → nervous system. Jupiter → liver. Saturn → bones and teeth. Moon → fluids and hormones. Every planet maps to a metal, a body system, and a gland. This is not astrology — it is the oldest classification system in medicine.',
                    cards: [{ source: 'thesisStatement', id: 'as-above-so-below-map' }],
                    quiz: { question: 'Which planet did alchemists link to mercury (quicksilver)?', options: ['Jupiter', 'Saturn', 'Mercury', 'Neptune'], correct: 2, explanation: 'Mercury the planet shares its name with the element because both were seen as swift, mutable, and mediating.' }
                }
            ],
            rewardBadge: { id: 'body-map', name: 'Body Cartographer', icon: '🦴' }
        },
        {
            id: 'circadian-alignment',
            title: 'Living with the Light',
            subtitle: 'How sunlight governs your biology — Nobel Prize-winning science',
            icon: '☀️',
            difficulty: 'beginner',
            estimatedMinutes: 8,
            steps: [
                {
                    title: 'The 2017 Nobel Prize',
                    narrative: 'In 2017, three scientists won the Nobel Prize in Physiology for discovering the molecular mechanisms of circadian rhythms. Every cell in your body runs on a 24-hour clock synchronized to sunlight. This is not alternative medicine — it is the foundation of chronobiology.',
                    cards: [{ source: 'liveAligned', id: 'circadian-nobel' }],
                    quiz: null
                },
                {
                    title: 'Morning Light Protocol',
                    narrative: 'Viewing bright light within 30-60 minutes of waking triggers a cortisol pulse that sets your circadian master clock in the suprachiasmatic nucleus. This single behavior cascades through every downstream clock: metabolism, immune function, mood, and sleep timing.',
                    cards: [{ source: 'liveAligned', id: 'morning-light-protocol' }],
                    quiz: { question: 'Where is the body\'s master circadian clock located?', options: ['Pineal gland', 'Suprachiasmatic nucleus', 'Hypothalamus', 'Retina'], correct: 1, explanation: 'The SCN in the hypothalamus receives direct light input from the retina via the retinohypothalamic tract.' }
                },
                {
                    title: 'The Danger of Night Light',
                    narrative: 'Artificial light at night suppresses melatonin and disrupts circadian timing. The WHO classified night shift work as a probable carcinogen (Group 2A). Your body was designed for fire and starlight after dark — not screens.',
                    cards: [{ source: 'liveAligned', id: 'light-at-night' }],
                    quiz: null
                },
                {
                    title: 'Seasonal Rhythms',
                    narrative: 'Over 5,000 genes change expression seasonally. Immune genes peak in winter, repair genes peak in summer. You are not a fixed machine — you are a seasonal organism, oscillating with the Earth\'s tilt.',
                    cards: [{ source: 'liveAligned', id: 'seasonal-circannual' }],
                    quiz: null,
                    completionMessage: 'You now understand the science of living in rhythm with light. Tomorrow morning, step outside within 30 minutes of waking.'
                }
            ],
            rewardBadge: { id: 'light-aligned', name: 'Light Aligned', icon: '☀️' }
        },
        {
            id: 'cosmic-serpent',
            title: 'The Serpent & the Spine',
            subtitle: 'Kundalini, caduceus, DNA — the universal serpent symbol',
            icon: '🐍',
            difficulty: 'advanced',
            estimatedMinutes: 14,
            steps: [
                {
                    title: 'The Serpent in Every Tradition',
                    narrative: 'The serpent appears in virtually every world mythology: the Kundalini serpent coiled at the base of the spine, the caduceus of Hermes, the feathered serpent Quetzalcoatl, the Ouroboros eating its own tail, the Naga kings of Hindu-Buddhist tradition, the serpent in Eden. No other symbol is this universal.',
                    cards: [{ source: 'cosmicNarratives', id: 'cosmic-serpent' }],
                    quiz: null
                },
                {
                    title: 'The Double Helix',
                    narrative: 'The caduceus — two serpents intertwined around a central staff — is the oldest medical symbol. DNA is two helical strands intertwined around a central axis. The ratio of the DNA helix width to length per turn is approximately 1:1.6, close to the golden ratio. Francis Crick reportedly saw the double helix structure during an altered state of consciousness.',
                    cards: [{ source: 'thesisStatement', id: 'fractal-proof' }],
                    quiz: { question: 'What is the approximate ratio of DNA helix width to length per turn?', options: ['1:1.2', '1:1.6', '1:2.0', '1:3.14'], correct: 1, explanation: 'The DNA double helix has a width-to-turn-length ratio of approximately 1:1.609, close to the golden ratio (1.618).' }
                },
                {
                    title: 'Kundalini and the Chakras',
                    narrative: 'In yogic tradition, Kundalini is a serpent energy coiled at the base of the spine that rises through 7 energy centers (chakras) to the crown. Each chakra maps to a nerve plexus, endocrine gland, and element. The spine has 33 vertebrae; 33 is sacred in Freemasonry, Christianity, and Vedic tradition.',
                    cards: [{ source: 'yogicTradition', id: 'chakra-planets' }],
                    quiz: null
                },
                {
                    title: 'The Serpent and the Tree',
                    narrative: 'The serpent around the tree appears in Eden, in Norse Yggdrasil (where Nidhogg gnaws the roots), in the Greek Garden of Hesperides, and in Mesoamerican cosmology. The tree is the spine. The serpent is the energy that ascends it. The fruit is the activation of higher consciousness.',
                    cards: [{ source: 'cosmicNarratives', id: 'world-tree' }],
                    quiz: null,
                    completionMessage: 'The serpent is not a creature. It is a shape — the sine wave, the helix, the spiral. It appears everywhere because it IS everywhere.'
                }
            ],
            rewardBadge: { id: 'serpent-wisdom', name: 'Serpent Wisdom', icon: '🐍' }
        },
        {
            id: 'music-of-spheres',
            title: 'The Music of the Spheres',
            subtitle: 'Kepler, cymatics, and the vibration that creates form',
            icon: '🎵',
            difficulty: 'intermediate',
            estimatedMinutes: 10,
            steps: [
                {
                    title: 'Kepler\'s Discovery',
                    narrative: 'In 1619, Johannes Kepler published Harmonices Mundi, showing that planetary orbital ratios correspond to musical intervals. The ratio between Earth\'s and Venus\'s orbital periods produces a near-perfect musical third. Kepler believed the solar system was a cosmic instrument.',
                    cards: [{ source: 'thesisStatement', id: 'the-pattern' }],
                    quiz: { question: 'Who wrote Harmonices Mundi (The Harmony of the World)?', options: ['Copernicus', 'Galileo', 'Kepler', 'Newton'], correct: 2, explanation: 'Johannes Kepler published Harmonices Mundi in 1619, linking planetary orbits to musical harmony.' }
                },
                {
                    title: 'Cymatics: Sound Made Visible',
                    narrative: 'Sprinkle sand on a metal plate and vibrate it with sound. The sand arranges itself into geometric patterns — circles, hexagons, mandalas. Higher frequencies produce more complex patterns. This is cymatics: the study of how vibration creates form. Every sacred geometric pattern can be produced by a specific frequency.',
                    cards: [{ source: 'thesisStatement', id: 'cymatics-vibration' }],
                    quiz: null
                },
                {
                    title: 'The Golden Ratio in Sound',
                    narrative: 'The golden ratio (1.618...) appears in the cochlea of your inner ear — a logarithmic spiral that converts pressure waves into neural signals. Musical consonance correlates with simple frequency ratios. The most pleasing intervals (octave 2:1, fifth 3:2, fourth 4:3) are the same ratios found in planetary orbits and architectural proportions.',
                    cards: [{ source: 'thesisStatement', id: 'golden-ratio' }],
                    quiz: null
                },
                {
                    title: 'Vibration Creates Reality',
                    narrative: '"In the beginning was the Word" (John 1:1). "Nada Brahma" — the world is sound (Vedic tradition). "And God said, Let there be light" — creation by utterance. Every tradition says the same thing: vibration precedes form. Cymatics demonstrates this literally. String theory proposes it mathematically.',
                    cards: [{ source: 'cosmicNarratives', id: 'creation-by-word' }],
                    quiz: null,
                    completionMessage: 'Form follows frequency. The ancients encoded this truth in every creation myth. Modern physics is rediscovering it.'
                }
            ],
            rewardBadge: { id: 'harmony', name: 'Harmony Seeker', icon: '🎵' }
        },
        {
            id: 'flood-precession',
            title: 'The Great Flood & the Astronomical Clock',
            subtitle: 'Precession, ages, and why every civilization remembers a flood',
            icon: '🌊',
            difficulty: 'advanced',
            estimatedMinutes: 12,
            steps: [
                {
                    title: 'The Flood That Everyone Remembers',
                    narrative: 'Over 200 cultures have a flood myth: Noah, Utnapishtim (Sumerian), Manu (Hindu), Deucalion (Greek), Nü Wa (Chinese), the Hopi emergence. These are not independent inventions of fiction. They record a shared memory — likely the rapid sea level rise at the end of the last Ice Age (~11,600 years ago, the Younger Dryas boundary).',
                    cards: [{ source: 'cosmicNarratives', id: 'flood-myth' }],
                    quiz: { question: 'Approximately how many cultures have a flood myth?', options: ['About 20', 'About 50', 'Over 200', 'Over 1000'], correct: 2, explanation: 'Over 200 distinct cultures across every inhabited continent preserve a catastrophic flood narrative.' }
                },
                {
                    title: 'The Precession of the Equinoxes',
                    narrative: 'Earth\'s axis wobbles like a top, tracing a circle in the sky over ~25,772 years. This means the spring equinox sunrise slowly drifts backward through the zodiac constellations — spending ~2,160 years in each sign. We are currently transitioning from the Age of Pisces to the Age of Aquarius.',
                    cards: [{ source: 'cosmicNarratives', id: 'four-ages' }],
                    quiz: null
                },
                {
                    title: 'The Four Ages',
                    narrative: 'Hindu Yugas, Greek Ages (Gold/Silver/Bronze/Iron), Hopi Worlds, Aztec Suns — every major civilization describes cyclical ages of rise and fall. The durations and transition markers map suspiciously well to precessional mathematics. The "Great Year" of Plato is 25,920 years — remarkably close to the actual precession period.',
                    cards: [{ source: 'cosmicNarratives', id: 'four-ages' }],
                    quiz: null
                },
                {
                    title: 'The Clock in the Sky',
                    narrative: 'Precession is the slowest cycle visible to humans. It takes 72 years for the equinox to shift by 1 degree — a lifetime to notice. Yet the Egyptians, Maya, and Hindu astronomers all recorded it. The Great Sphinx faces due east at the equinox. The temples of Angkor Wat encode precessional numbers. These civilizations were tracking a 26,000-year clock.',
                    cards: [{ source: 'cosmicNarratives', id: 'seven-heavens' }],
                    quiz: null,
                    completionMessage: 'The flood myths remember the last great transition. The precessional clock predicts the next. We are living in one now.'
                }
            ],
            rewardBadge: { id: 'timekeeper', name: 'Cosmic Timekeeper', icon: '🌊' }
        }
    ];

    // ── P4: Bookmarks ───────────────────────────────────────────
    const Bookmarks = {
        init() {
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('.bookmark-btn');
                if (!btn) return;
                e.stopPropagation();
                const cardId = btn.dataset.cardId;
                const source = btn.dataset.cardSource;
                if (!cardId) return;

                const state = Store.load();
                const idx = state.bookmarks.items.findIndex(b => b.cardId === cardId);
                if (idx >= 0) {
                    state.bookmarks.items.splice(idx, 1);
                    btn.classList.remove('bookmarked');
                } else {
                    state.bookmarks.items.push({ cardId, source, savedAt: new Date().toISOString() });
                    btn.classList.add('bookmarked');
                }
                Store.save(state);
            });
        },

        isBookmarked(cardId) {
            const items = Store.get('bookmarks.items') || [];
            return items.some(b => b.cardId === cardId);
        },

        render(container) {
            const items = Store.get('bookmarks.items') || [];
            if (!items.length) {
                container.innerHTML = `
                    <div class="engagement-header">
                        <h2>🔖 My Collection</h2>
                        <button class="engagement-close" data-close-modal="bookmarks-modal">✕</button>
                    </div>
                    <div class="bookmarks-empty">
                        <div class="bookmarks-empty-icon">🔖</div>
                        <p>Your collection is empty.<br>Tap the bookmark icon on any card to save it here.</p>
                    </div>`;
                return;
            }

            const groups = {};
            const sourceLabels = {
                thesisStatement: 'The Pattern', modernScience: 'Modern Science',
                ancientTraditions: 'Ancient Traditions', liveAligned: 'Live Aligned',
                cosmicNarratives: 'Cosmic Narratives', solarMythology: 'Solar Mythology',
                yogicTradition: 'Yogic Tradition', sufiTradition: 'Sufi Tradition',
                christianAlchemy: 'Christian Alchemy', anatomyPatterns: 'Symbolic Patterns',
                entheogens: 'Entheogens', gatewayProcess: 'Gateway Process',
                consciousnessConvergence: 'Consciousness', sacredSecretion: 'The Synthesis',
                neuroscienceLayer: 'Neuroscience'
            };

            items.forEach(b => {
                const group = sourceLabels[b.source] || b.source || 'Other';
                if (!groups[group]) groups[group] = [];
                const card = this.findCard(b.cardId, b.source);
                if (card) groups[group].push(card);
            });

            let html = `
                <div class="engagement-header">
                    <h2>🔖 My Collection (${items.length})</h2>
                    <button class="engagement-close" data-close-modal="bookmarks-modal">✕</button>
                </div>`;

            Object.entries(groups).forEach(([label, cards]) => {
                html += `<div class="bookmarks-group">
                    <div class="bookmarks-group-header">${label}</div>
                    ${cards.map(c => UI.buildLayerCard(c, { source: label, isBookmarked: true })).join('')}
                </div>`;
            });

            container.innerHTML = html;
            UI.bindLayerCardToggles(container);
        },

        findCard(cardId, source) {
            const arrays = [
                'thesisStatement', 'modernScience', 'ancientTraditions', 'liveAligned',
                'cosmicNarratives', 'solarMythology', 'yogicTradition', 'sufiTradition',
                'christianAlchemy', 'anatomyPatterns', 'entheogens', 'gatewayProcess',
                'consciousnessConvergence', 'sacredSecretion', 'neuroscienceLayer'
            ];
            if (source && CosmicKnowledge[source]) {
                const arr = CosmicKnowledge[source];
                if (Array.isArray(arr)) {
                    const found = arr.find(c => c.id === cardId);
                    if (found) return found;
                }
            }
            for (const key of arrays) {
                const arr = CosmicKnowledge[key];
                if (Array.isArray(arr)) {
                    const found = arr.find(c => c.id === cardId);
                    if (found) return found;
                }
            }
            return null;
        }
    };

    // ── P6: Share Cards ─────────────────────────────────────────
    const Share = {
        activePopover: null,

        init() {
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('.share-btn');
                if (btn) {
                    e.stopPropagation();
                    this.togglePopover(btn);
                    return;
                }
                const opt = e.target.closest('.share-option');
                if (opt) {
                    e.stopPropagation();
                    const action = opt.dataset.action;
                    const cardEl = opt.closest('.layer-card');
                    if (cardEl) this.handleAction(action, cardEl);
                    this.closePopover();
                    return;
                }
                this.closePopover();
            });
        },

        togglePopover(btn) {
            this.closePopover();
            const card = btn.closest('.layer-card');
            if (!card) return;

            const wrapper = btn.parentElement;
            wrapper.style.position = 'relative';
            const hasNativeShare = !!navigator.share;

            const popover = document.createElement('div');
            popover.className = 'share-popover';
            popover.innerHTML = `
                <button class="share-option" data-action="copy">
                    <svg viewBox="0 0 24 24" width="16" height="16"><rect x="9" y="9" width="13" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                    Copy Text
                </button>
                <button class="share-option" data-action="image">
                    <svg viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5L5 21" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                    Download Image
                </button>
                ${hasNativeShare ? `<button class="share-option" data-action="native">
                    <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="18" cy="5" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="19" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" stroke-width="1.5"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" stroke-width="1.5"/></svg>
                    Share...
                </button>` : ''}`;

            wrapper.appendChild(popover);
            this.activePopover = popover;
        },

        closePopover() {
            if (this.activePopover) {
                this.activePopover.remove();
                this.activePopover = null;
            }
        },

        getCardData(cardEl) {
            const icon = cardEl.querySelector('.layer-card-icon')?.textContent || '';
            const title = cardEl.querySelector('.layer-card-title')?.textContent || '';
            const summary = cardEl.querySelector('.layer-card-summary')?.textContent || '';
            return { icon, title, summary };
        },

        handleAction(action, cardEl) {
            const data = this.getCardData(cardEl);
            switch (action) {
                case 'copy': this.copyText(data); break;
                case 'image': this.downloadImage(data); break;
                case 'native': this.nativeShare(data); break;
            }
        },

        copyText(data) {
            const text = `${data.icon} ${data.title}\n\n${data.summary}\n\n— Celestia`;
            navigator.clipboard.writeText(text).then(() => this.showToast('Copied to clipboard'));
        },

        downloadImage(data) {
            const canvas = document.createElement('canvas');
            canvas.width = 600;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');

            const bg = ctx.createLinearGradient(0, 0, 0, 400);
            bg.addColorStop(0, '#0a0a2e');
            bg.addColorStop(1, '#030014');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, 600, 400);

            for (let i = 0; i < 40; i++) {
                ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.random() * 0.25})`;
                ctx.beginPath();
                ctx.arc(Math.random() * 600, Math.random() * 400, Math.random() * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.font = '600 22px "Space Grotesk", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${data.icon}  ${data.title}`, 30, 50);

            ctx.font = '400 14px "Inter", sans-serif';
            ctx.fillStyle = '#c8c6d8';
            this.wrapText(ctx, data.summary, 30, 85, 540, 21);

            ctx.font = '400 11px "Space Grotesk", sans-serif';
            ctx.fillStyle = '#6b6890';
            ctx.fillText('CELESTIA — rayger14.github.io/Celestia', 30, 380);

            const link = document.createElement('a');
            link.download = `celestia-${data.title.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            this.showToast('Image downloaded');
        },

        wrapText(ctx, text, x, y, maxWidth, lineHeight) {
            const words = text.split(' ');
            let line = '';
            let currentY = y;
            for (const word of words) {
                const test = line + word + ' ';
                if (ctx.measureText(test).width > maxWidth && line) {
                    ctx.fillText(line.trim(), x, currentY);
                    line = word + ' ';
                    currentY += lineHeight;
                    if (currentY > 350) { ctx.fillText(line.trim() + '...', x, currentY); return; }
                } else {
                    line = test;
                }
            }
            if (line.trim()) ctx.fillText(line.trim(), x, currentY);
        },

        async nativeShare(data) {
            try {
                await navigator.share({
                    title: data.title,
                    text: `${data.icon} ${data.title}\n\n${data.summary}`,
                    url: 'https://rayger14.github.io/Celestia/'
                });
            } catch {}
        },

        showToast(msg) {
            const existing = document.querySelector('.share-toast');
            if (existing) existing.remove();
            const toast = document.createElement('div');
            toast.className = 'share-toast';
            toast.textContent = msg;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2200);
        }
    };

    // ── P2: Daily Briefing ──────────────────────────────────────
    const Briefing = {
        init() {
            const panel = document.getElementById('briefing-panel');
            if (!panel) return;

            document.getElementById('briefing-btn')?.addEventListener('click', () => this.toggle());
            panel.addEventListener('click', (e) => {
                if (e.target.closest('.engagement-close')) this.hide();
                if (e.target.closest('.briefing-cta')) {
                    this.hide();
                    Discovery.openModal();
                }
                if (e.target.closest('.briefing-open-birthday')) {
                    this.hide();
                    document.getElementById('birthday-btn')?.click();
                }
            });

            this.checkAutoShow();
        },

        checkAutoShow() {
            const today = new Date().toISOString().slice(0, 10);
            const state = Store.load();
            if (state.briefing.lastViewedDate !== today) {
                setTimeout(() => this.show(), 2000);
            }
        },

        toggle() {
            const panel = document.getElementById('briefing-panel');
            if (panel.classList.contains('visible')) this.hide();
            else this.show();
        },

        show() {
            const panel = document.getElementById('briefing-panel');
            this.render(panel);
            panel.classList.remove('hidden');
            requestAnimationFrame(() => panel.classList.add('visible'));

            const today = new Date().toISOString().slice(0, 10);
            Store.set('briefing.lastViewedDate', today);
        },

        hide() {
            const panel = document.getElementById('briefing-panel');
            panel.classList.remove('visible');
            setTimeout(() => panel.classList.add('hidden'), 400);
        },

        render(container) {
            const birthday = Store.getBirthday();
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

            if (!birthday) {
                container.innerHTML = `
                    <div class="briefing-header">
                        <span class="briefing-date">${dateStr}</span>
                        <button class="engagement-close">✕</button>
                    </div>
                    <div class="briefing-no-birthday">
                        <p>Enter your birthday to unlock your personalized cosmic briefing — daily insights based on your birth sky and current planetary positions.</p>
                        <button class="briefing-open-birthday">Enter Birthday</button>
                    </div>`;
                return;
            }

            const jd = Astronomy.dateToJulian(now);
            const sunLon = Astronomy.sunLongitude(jd);
            const zodiac = Astronomy.getZodiacSign(sunLon);
            const moon = Astronomy.getMoonPhase(jd);
            const birthSky = Astronomy.getBirthSky(new Date(birthday + 'T12:00:00'));
            const solarReturn = Astronomy.calculateSolarReturn(birthSky.sunLongitude, now);
            const daysUntil = Math.ceil((solarReturn - now) / 86400000);
            const aspect = Astronomy.computeAspect(birthSky.sunLongitude, sunLon);

            const score = this.computeScore(aspect, moon, now);
            const tip = this.getDailyTip(moon, now);

            container.innerHTML = `
                <div class="briefing-header">
                    <span class="briefing-date">${dateStr}</span>
                    <button class="engagement-close">✕</button>
                </div>
                <div class="briefing-sky-row">
                    <span class="briefing-pill">☉ Sun in ${zodiac.name}</span>
                    <span class="briefing-pill">${moon.emoji} ${moon.name} (${moon.illumination}%)</span>
                </div>
                <div class="briefing-score-section">
                    <canvas class="briefing-score-gauge" width="160" height="160"></canvas>
                    <div>
                        <div class="briefing-score-label">${score.label}</div>
                        <div class="briefing-score-desc">${score.description}</div>
                    </div>
                </div>
                <div class="briefing-tip">
                    <div class="briefing-tip-title">${tip.title}</div>
                    <div class="briefing-tip-text">${tip.text}</div>
                </div>
                <div class="briefing-solar-return">
                    ☉ <span>Solar Return in <strong>${daysUntil} days</strong> ${daysUntil <= 30 ? '— your cosmic new year approaches!' : ''}</span>
                </div>
                <button class="briefing-cta">Explore a Discovery Path →</button>`;

            this.drawGauge(container.querySelector('.briefing-score-gauge'), score.value);
        },

        computeScore(aspect, moon, date) {
            let score = 50;
            if (aspect) {
                const aspectScores = { conjunction: 30, trine: 25, sextile: 20, opposition: 10, square: 5 };
                score += aspectScores[aspect.name] || 0;
            }
            const moonBonus = { 'New Moon': 15, 'Full Moon': 15, 'Waxing Crescent': 10, 'Waxing Gibbous': 10, 'First Quarter': 8, 'Last Quarter': 8, 'Waning Crescent': 5, 'Waning Gibbous': 5 };
            score += moonBonus[moon.name] || 0;

            const month = date.getMonth();
            const equinoxSolstice = [2, 5, 8, 11];
            if (equinoxSolstice.includes(month)) score += 10;

            score = Math.min(100, Math.max(0, score));

            let label, description;
            if (score >= 80) { label = 'Deeply Aligned'; description = 'Strong cosmic resonance with your birth chart. A powerful day for intention and reflection.'; }
            else if (score >= 60) { label = 'Flowing'; description = 'Harmonious energy between current sky and your birth positions. Go with the current.'; }
            else if (score >= 40) { label = 'Neutral'; description = 'A balanced day. Neither pushing nor pulling — good for steady progress.'; }
            else if (score >= 20) { label = 'Building Tension'; description = 'Creative friction between current and natal positions. Growth often comes from tension.'; }
            else { label = 'Transformative'; description = 'Deep restructuring energy. Rest, reflect, and trust the process.'; }

            return { value: score, label, description };
        },

        getDailyTip(moon, date) {
            const month = date.getMonth();
            if (moon.name === 'Full Moon' || moon.name === 'Waning Gibbous') {
                return { title: '🌕 Full Moon Awareness', text: 'Studies show sleep duration decreases by ~20 minutes near the full moon (Cajochen et al., 2013). Melatonin levels drop. Plan lighter evening activities and consider earlier bedtime.' };
            }
            if (moon.name === 'New Moon' || moon.name === 'Waxing Crescent') {
                return { title: '🌑 New Moon Reset', text: 'The new moon phase correlates with deeper sleep and higher melatonin. A good time to set intentions, start new habits, and align your circadian rhythm.' };
            }
            if (month >= 11 || month <= 1) {
                return { title: '❄️ Winter Light Protocol', text: 'Shorter days mean less light exposure. Prioritize morning sunlight within 30 min of waking. Over 5,000 genes shift expression in winter — your immune system is naturally more active.' };
            }
            if (month >= 5 && month <= 7) {
                return { title: '☀️ Summer Alignment', text: 'Longer days support natural circadian optimization. Take advantage with outdoor morning activity. UV exposure triggers vitamin D synthesis — essential for immune and bone health.' };
            }
            return { title: '🌿 Grounding Practice', text: 'Direct skin contact with the earth ("grounding") has shown measurable effects on cortisol rhythms and inflammation markers (Oschman et al., 2015). Even 15 minutes barefoot outside counts.' };
        },

        drawGauge(canvas, value) {
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const size = 80;
            const center = size / 2;
            const radius = 32;
            const lineWidth = 5;

            ctx.clearRect(0, 0, size * 2, size * 2);
            ctx.scale(2, 2);

            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            const endAngle = -Math.PI / 2 + (Math.PI * 2 * value / 100);
            ctx.beginPath();
            ctx.arc(center, center, radius, -Math.PI / 2, endAngle);
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, '#d4af37');
            gradient.addColorStop(1, '#f59e0b');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.stroke();

            ctx.font = '600 18px "Space Grotesk", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(value, center, center);
        }
    };

    // ── P3: Quiz System ─────────────────────────────────────────
    const Quiz = {
        currentSession: null,

        init() {
            document.getElementById('quiz-btn')?.addEventListener('click', () => this.openModal());
        },

        openModal() {
            const modal = document.getElementById('quiz-modal');
            if (!modal) return;
            modal.classList.remove('hidden');
            this.renderCategoryPicker(document.getElementById('quiz-content'));
        },

        closeModal() {
            document.getElementById('quiz-modal')?.classList.add('hidden');
        },

        renderCategoryPicker(container) {
            const state = Store.load();
            const stats = state.quiz;
            container.innerHTML = `
                <div class="engagement-header">
                    <h2>🧠 Cosmic Quiz</h2>
                    <button class="engagement-close" data-close-modal="quiz-modal">✕</button>
                </div>
                ${stats.bestStreak > 0 ? `<div class="quiz-streak-display">🔥 Best streak: ${stats.bestStreak}</div>` : ''}
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">Choose a category to test your cosmic knowledge.</p>
                <div class="quiz-category-picker">
                    <button class="quiz-category-chip" data-cat="all">✨ All Topics</button>
                    <button class="quiz-category-chip" data-cat="astronomy">🔭 Astronomy</button>
                    <button class="quiz-category-chip" data-cat="mythology">🏛️ Mythology</button>
                    <button class="quiz-category-chip" data-cat="health">🧬 Health Science</button>
                    <button class="quiz-category-chip" data-cat="synthesis">🧩 Synthesis</button>
                </div>
                ${stats.badges.length ? `<div class="quiz-badges">${stats.badges.map(b => `<span class="quiz-badge">${b}</span>`).join('')}</div>` : ''}`;

            container.querySelectorAll('.quiz-category-chip').forEach(chip => {
                chip.addEventListener('click', () => this.startSession(chip.dataset.cat));
            });

            container.querySelector('.engagement-close')?.addEventListener('click', () => this.closeModal());
        },

        startSession(category) {
            const questions = this.generateQuestions(category, 5);
            this.currentSession = { category, questions, current: 0, correct: 0 };
            this.renderQuestion();
        },

        generateQuestions(category, count) {
            const generators = [];

            if (category === 'all' || category === 'astronomy') {
                generators.push(() => this.genZodiacQuestion());
                generators.push(() => this.genGlossaryQuestion());
            }
            if (category === 'all' || category === 'mythology') {
                generators.push(() => this.genNarrativeQuestion());
                generators.push(() => this.genTraditionQuestion());
            }
            if (category === 'all' || category === 'health') {
                generators.push(() => this.genHealthQuestion());
            }
            if (category === 'all' || category === 'synthesis') {
                generators.push(() => this.genSynthesisQuestion());
            }

            if (!generators.length) generators.push(() => this.genZodiacQuestion());

            const questions = [];
            const usedIds = new Set();
            let attempts = 0;
            while (questions.length < count && attempts < 50) {
                const gen = generators[Math.floor(Math.random() * generators.length)];
                const q = gen();
                if (q && !usedIds.has(q.id)) {
                    usedIds.add(q.id);
                    questions.push(q);
                }
                attempts++;
            }
            return questions;
        },

        genZodiacQuestion() {
            const profiles = CosmicKnowledge.zodiacProfiles;
            if (!profiles) return null;
            const signs = Object.keys(profiles);
            const sign = signs[Math.floor(Math.random() * signs.length)];
            const p = profiles[sign];
            const elements = ['Fire', 'Earth', 'Air', 'Water'];
            return {
                id: `zodiac-el-${sign}`, category: 'astronomy',
                question: `What element is ${sign} in classical astrology?`,
                options: this.shuffle(elements),
                correct: p.element,
                explanation: `${sign} is a ${p.element} sign with ${p.modality} modality.`
            };
        },

        genGlossaryQuestion() {
            const glossary = CosmicKnowledge.glossary;
            if (!glossary) return null;
            const terms = Object.keys(glossary);
            const term = terms[Math.floor(Math.random() * terms.length)];
            const correctDef = glossary[term].length > 90 ? glossary[term].slice(0, 87) + '...' : glossary[term];
            const distractors = terms.filter(t => t !== term).sort(() => Math.random() - 0.5).slice(0, 3)
                .map(t => glossary[t].length > 90 ? glossary[t].slice(0, 87) + '...' : glossary[t]);
            return {
                id: `glossary-${term}`, category: 'astronomy',
                question: `What does "${term}" refer to?`,
                options: this.shuffle([correctDef, ...distractors]),
                correct: correctDef,
                explanation: glossary[term]
            };
        },

        genNarrativeQuestion() {
            const narratives = CosmicKnowledge.cosmicNarratives;
            if (!narratives || narratives.length < 4) return null;
            const shuffled = [...narratives].sort(() => Math.random() - 0.5);
            const target = shuffled[0];
            const summary = target.summary.length > 100 ? target.summary.slice(0, 97) + '...' : target.summary;
            const options = shuffled.slice(0, 4).map(n => n.title);
            return {
                id: `narrative-${target.id}`, category: 'synthesis',
                question: `Which mythological pattern does this describe: "${summary}"`,
                options: this.shuffle(options),
                correct: target.title,
                explanation: target.summary
            };
        },

        genTraditionQuestion() {
            const traditions = CosmicKnowledge.ancientTraditions;
            if (!traditions || traditions.length < 4) return null;
            const shuffled = [...traditions].sort(() => Math.random() - 0.5);
            const target = shuffled[0];
            const options = shuffled.slice(0, 4).map(t => t.title);
            return {
                id: `tradition-${target.id}`, category: 'mythology',
                question: `Which tradition is from the period "${target.period}"?`,
                options: this.shuffle(options),
                correct: target.title,
                explanation: `${target.title}: ${target.summary || ''}`
            };
        },

        genHealthQuestion() {
            const aligned = CosmicKnowledge.liveAligned;
            if (!aligned || aligned.length < 4) return null;
            const shuffled = [...aligned].sort(() => Math.random() - 0.5);
            const target = shuffled[0];
            const summary = target.summary?.length > 80 ? target.summary.slice(0, 77) + '...' : (target.summary || target.title);
            const options = shuffled.slice(0, 4).map(a => a.title);
            return {
                id: `health-${target.id}`, category: 'health',
                question: `Which health science topic does this describe: "${summary}"`,
                options: this.shuffle(options),
                correct: target.title,
                explanation: target.details || target.summary || ''
            };
        },

        genSynthesisQuestion() {
            const thesis = CosmicKnowledge.thesisStatement;
            if (!thesis || thesis.length < 4) return null;
            const shuffled = [...thesis].sort(() => Math.random() - 0.5);
            const target = shuffled[0];
            const summary = target.summary?.length > 80 ? target.summary.slice(0, 77) + '...' : (target.summary || target.title);
            const options = shuffled.slice(0, 4).map(t => t.title);
            return {
                id: `synth-${target.id}`, category: 'synthesis',
                question: `Which thesis concept is this: "${summary}"`,
                options: this.shuffle(options),
                correct: target.title,
                explanation: target.summary || ''
            };
        },

        shuffle(arr) {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },

        renderQuestion() {
            const container = document.getElementById('quiz-content');
            const session = this.currentSession;
            if (!session || session.current >= session.questions.length) {
                this.renderSummary(container);
                return;
            }

            const q = session.questions[session.current];
            const dots = session.questions.map((_, i) => {
                let cls = 'quiz-dot';
                if (i < session.current) cls += session.questions[i]._wasCorrect ? ' correct' : ' incorrect';
                if (i === session.current) cls += ' current';
                return `<span class="${cls}"></span>`;
            }).join('');

            container.innerHTML = `
                <div class="engagement-header">
                    <h2>🧠 Question ${session.current + 1} of ${session.questions.length}</h2>
                    <button class="engagement-close" data-close-modal="quiz-modal">✕</button>
                </div>
                <div class="quiz-progress-dots">${dots}</div>
                <div class="quiz-question-text">${q.question}</div>
                <div class="quiz-options">
                    ${q.options.map(opt => `<button class="quiz-option" data-answer="${opt.replace(/"/g, '&quot;')}">${opt}</button>`).join('')}
                </div>
                <div id="quiz-feedback"></div>`;

            container.querySelector('.engagement-close')?.addEventListener('click', () => this.closeModal());

            container.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', () => this.answerQuestion(btn.dataset.answer));
            });
        },

        answerQuestion(answer) {
            const session = this.currentSession;
            const q = session.questions[session.current];
            const isCorrect = answer === q.correct;
            q._wasCorrect = isCorrect;

            if (isCorrect) session.correct++;

            const container = document.getElementById('quiz-content');
            container.querySelectorAll('.quiz-option').forEach(btn => {
                btn.classList.add('disabled');
                if (btn.dataset.answer === q.correct) btn.classList.add('correct');
                else if (btn.dataset.answer === answer && !isCorrect) btn.classList.add('incorrect');
            });

            const feedback = document.getElementById('quiz-feedback');
            feedback.innerHTML = `
                <div class="quiz-explanation">
                    <strong>${isCorrect ? '✅ Correct!' : '❌ Not quite.'}</strong><br>
                    ${q.explanation}
                </div>
                <button class="quiz-next-btn">${session.current + 1 < session.questions.length ? 'Next Question →' : 'See Results →'}</button>`;

            feedback.querySelector('.quiz-next-btn').addEventListener('click', () => {
                session.current++;
                this.renderQuestion();
            });

            this.updateStats(isCorrect, q.category);
        },

        updateStats(isCorrect, category) {
            const state = Store.load();
            const quiz = state.quiz;
            quiz.totalAnswered++;
            if (isCorrect) {
                quiz.totalCorrect++;
                quiz.streak++;
                if (quiz.streak > quiz.bestStreak) quiz.bestStreak = quiz.streak;
            } else {
                quiz.streak = 0;
            }
            quiz.lastQuizDate = new Date().toISOString().slice(0, 10);

            if (!quiz.categoryScores[category]) quiz.categoryScores[category] = { answered: 0, correct: 0 };
            quiz.categoryScores[category].answered++;
            if (isCorrect) quiz.categoryScores[category].correct++;

            const newBadges = [];
            if (quiz.totalAnswered === 1 && !quiz.badges.includes('🌟 First Quiz')) {
                quiz.badges.push('🌟 First Quiz');
                newBadges.push('🌟 First Quiz');
            }
            if (quiz.streak >= 5 && !quiz.badges.includes('🔥 Streak 5')) {
                quiz.badges.push('🔥 Streak 5');
                newBadges.push('🔥 Streak 5');
            }
            if (quiz.streak >= 10 && !quiz.badges.includes('⚡ Streak 10')) {
                quiz.badges.push('⚡ Streak 10');
                newBadges.push('⚡ Streak 10');
            }
            if (quiz.totalCorrect >= 50 && !quiz.badges.includes('🏆 50 Correct')) {
                quiz.badges.push('🏆 50 Correct');
                newBadges.push('🏆 50 Correct');
            }

            Store.save(state);
        },

        renderSummary(container) {
            const session = this.currentSession;
            const state = Store.load();
            const pct = Math.round((session.correct / session.questions.length) * 100);

            container.innerHTML = `
                <div class="engagement-header">
                    <h2>🧠 Quiz Complete</h2>
                    <button class="engagement-close" data-close-modal="quiz-modal">✕</button>
                </div>
                <div class="quiz-summary">
                    <div class="quiz-summary-score">${session.correct}/${session.questions.length}</div>
                    <div class="quiz-summary-label">${pct}% correct</div>
                    ${state.quiz.streak > 0 ? `<div class="quiz-streak-display">🔥 Streak: ${state.quiz.streak}</div>` : ''}
                    ${state.quiz.badges.length ? `<div class="quiz-badges">${state.quiz.badges.map(b => `<span class="quiz-badge">${b}</span>`).join('')}</div>` : ''}
                </div>
                <button class="quiz-next-btn" id="quiz-retry">Play Again</button>
                <button class="quiz-next-btn" id="quiz-done" style="margin-top:8px; background:transparent; border:1px solid rgba(255,255,255,0.1); color:var(--text-secondary);">Done</button>`;

            container.querySelector('.engagement-close')?.addEventListener('click', () => this.closeModal());
            container.querySelector('#quiz-retry')?.addEventListener('click', () => this.renderCategoryPicker(container));
            container.querySelector('#quiz-done')?.addEventListener('click', () => this.closeModal());
        }
    };

    // ── P5: Alignment Tracker ───────────────────────────────────
    const Alignment = {
        ITEMS: [
            { key: 'morningSun', label: 'Morning Sunlight', desc: 'Bright light within 30-60 min of waking' },
            { key: 'noScreenBed', label: 'Screen-Free Evening', desc: 'No screens 1hr before bed' },
            { key: 'grounding', label: 'Grounding / Earthing', desc: 'Direct skin contact with earth' },
            { key: 'nature', label: 'Nature Time', desc: 'Time spent in natural environment' },
            { key: 'seasonal', label: 'Seasonal Eating', desc: 'Ate local, seasonal foods' }
        ],

        init() {
            document.getElementById('alignment-btn')?.addEventListener('click', () => this.openModal());
        },

        openModal() {
            const modal = document.getElementById('alignment-modal');
            if (!modal) return;
            modal.classList.remove('hidden');
            this.render(document.getElementById('alignment-content'));
        },

        closeModal() {
            document.getElementById('alignment-modal')?.classList.add('hidden');
        },

        render(container) {
            const today = new Date().toISOString().slice(0, 10);
            const state = Store.load();
            const todayData = state.alignment.checkIns[today] || {};

            let html = `
                <div class="engagement-header">
                    <h2>🌿 Alignment Tracker</h2>
                    <button class="engagement-close" data-close-modal="alignment-modal">✕</button>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 16px;">Track your daily alignment with natural rhythms.</p>
                <div class="alignment-checkin">`;

            this.ITEMS.forEach(item => {
                const checked = todayData[item.key] || false;
                html += `
                    <div class="alignment-checkin-item">
                        <button class="alignment-checkbox ${checked ? 'checked' : ''}" data-key="${item.key}">${checked ? '✓' : ''}</button>
                        <div class="alignment-checkin-label">
                            ${item.label}
                            <small>${item.desc}</small>
                        </div>
                    </div>`;
            });

            html += `<textarea class="alignment-note" placeholder="Today's note (optional)...">${todayData.note || ''}</textarea>`;
            html += `</div>`;
            html += this.renderHeatmap(state.alignment.checkIns);
            html += this.renderStats(state.alignment.checkIns);

            container.innerHTML = html;

            container.querySelector('.engagement-close')?.addEventListener('click', () => this.closeModal());

            container.querySelectorAll('.alignment-checkbox').forEach(btn => {
                btn.addEventListener('click', () => {
                    const key = btn.dataset.key;
                    const state = Store.load();
                    if (!state.alignment.checkIns[today]) state.alignment.checkIns[today] = {};
                    state.alignment.checkIns[today][key] = !state.alignment.checkIns[today][key];
                    Store.save(state);
                    btn.classList.toggle('checked');
                    btn.textContent = btn.classList.contains('checked') ? '✓' : '';
                });
            });

            const noteEl = container.querySelector('.alignment-note');
            let noteTimer;
            noteEl?.addEventListener('input', () => {
                clearTimeout(noteTimer);
                noteTimer = setTimeout(() => {
                    const state = Store.load();
                    if (!state.alignment.checkIns[today]) state.alignment.checkIns[today] = {};
                    state.alignment.checkIns[today].note = noteEl.value;
                    Store.save(state);
                }, 500);
            });
        },

        renderHeatmap(checkIns) {
            const today = new Date();
            const days = [];
            for (let i = 29; i >= 0; i--) {
                const d = new Date(today);
                d.setDate(d.getDate() - i);
                const key = d.toISOString().slice(0, 10);
                const data = checkIns[key] || {};
                const count = this.ITEMS.filter(item => data[item.key]).length;
                days.push({ key, count, isToday: i === 0 });
            }

            const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            let html = `<div class="alignment-heatmap-section">
                <div class="alignment-heatmap-title">Last 30 Days</div>
                <div class="alignment-heatmap">
                    ${dayLabels.map(d => `<span class="alignment-heatmap-day-label">${d}</span>`).join('')}`;

            const startDow = new Date(today);
            startDow.setDate(startDow.getDate() - 29);
            const pad = startDow.getDay();
            for (let i = 0; i < pad; i++) html += `<div class="alignment-heatmap-cell" data-level="0"></div>`;

            days.forEach(d => {
                html += `<div class="alignment-heatmap-cell ${d.isToday ? 'today' : ''}" data-level="${d.count}" title="${d.key}: ${d.count}/5"></div>`;
            });

            html += `</div></div>`;
            return html;
        },

        renderStats(checkIns) {
            const today = new Date();
            let weekTotal = 0, weekPossible = 0, currentStreak = 0;

            for (let i = 0; i < 7; i++) {
                const d = new Date(today);
                d.setDate(d.getDate() - i);
                const key = d.toISOString().slice(0, 10);
                const data = checkIns[key] || {};
                const count = this.ITEMS.filter(item => data[item.key]).length;
                weekTotal += count;
                weekPossible += this.ITEMS.length;
            }

            for (let i = 0; i < 30; i++) {
                const d = new Date(today);
                d.setDate(d.getDate() - i);
                const key = d.toISOString().slice(0, 10);
                const data = checkIns[key] || {};
                const count = this.ITEMS.filter(item => data[item.key]).length;
                if (count > 0) currentStreak++;
                else break;
            }

            const weekPct = weekPossible ? Math.round((weekTotal / weekPossible) * 100) : 0;

            return `<div class="alignment-stats">
                <div class="alignment-stat">
                    <div class="alignment-stat-value">${weekPct}%</div>
                    <div class="alignment-stat-label">This Week</div>
                </div>
                <div class="alignment-stat">
                    <div class="alignment-stat-value">${currentStreak}</div>
                    <div class="alignment-stat-label">Day Streak</div>
                </div>
                <div class="alignment-stat">
                    <div class="alignment-stat-value">${weekTotal}</div>
                    <div class="alignment-stat-label">Check-ins</div>
                </div>
            </div>`;
        }
    };

    // ── P1: Discovery Mode ──────────────────────────────────────
    const Discovery = {
        init() {
            document.getElementById('discover-btn')?.addEventListener('click', () => this.openModal());
        },

        openModal() {
            const modal = document.getElementById('discovery-modal');
            if (!modal) return;
            modal.classList.remove('hidden');
            this.renderPathList(document.getElementById('discovery-content'));
        },

        closeModal() {
            document.getElementById('discovery-modal')?.classList.add('hidden');
        },

        renderPathList(container) {
            const state = Store.load();
            const completed = state.discovery.completedPaths || [];

            let html = `
                <div class="engagement-header">
                    <h2>✨ Discovery Paths</h2>
                    <button class="engagement-close" data-close-modal="discovery-modal">✕</button>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">Guided journeys through cosmic knowledge. Each path connects the dots between astronomy, myth, and science.</p>
                <div class="discovery-paths-grid">`;

            DISCOVERY_PATHS.forEach(path => {
                const pathState = state.discovery.paths[path.id] || {};
                const isCompleted = completed.includes(path.id);
                const progress = pathState.completedSteps ? pathState.completedSteps.length / path.steps.length : 0;
                const circumference = 2 * Math.PI * 18;
                const offset = circumference * (1 - progress);

                html += `
                    <div class="discovery-path-card ${isCompleted ? 'completed' : ''}" data-path="${path.id}">
                        <span class="discovery-path-icon">${path.icon}</span>
                        <div class="discovery-path-info">
                            <div class="discovery-path-title">${path.title}</div>
                            <div class="discovery-path-subtitle">${path.subtitle}</div>
                            <div class="discovery-path-meta">
                                <span>${path.steps.length} steps</span>
                                <span>~${path.estimatedMinutes} min</span>
                                <span>${path.difficulty}</span>
                            </div>
                        </div>
                        <svg class="discovery-progress-ring" viewBox="0 0 44 44">
                            <circle class="discovery-progress-bg" cx="22" cy="22" r="18"/>
                            <circle class="discovery-progress-fill" cx="22" cy="22" r="18"
                                stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                                transform="rotate(-90 22 22)"/>
                            ${isCompleted ? '<text x="22" y="23" text-anchor="middle" dominant-baseline="middle" fill="#4ade80" font-size="14">✓</text>' : ''}
                        </svg>
                    </div>`;
            });

            html += `</div>`;
            container.innerHTML = html;

            container.querySelector('.engagement-close')?.addEventListener('click', () => this.closeModal());
            container.querySelectorAll('.discovery-path-card').forEach(card => {
                card.addEventListener('click', () => this.startPath(card.dataset.path));
            });
        },

        startPath(pathId) {
            const path = DISCOVERY_PATHS.find(p => p.id === pathId);
            if (!path) return;

            const state = Store.load();
            if (!state.discovery.paths[pathId]) {
                state.discovery.paths[pathId] = { currentStep: 0, completedSteps: [], completed: false, startedAt: new Date().toISOString().slice(0, 10) };
            }
            state.discovery.activePath = pathId;
            Store.save(state);

            this.renderStep(pathId);
        },

        renderStep(pathId) {
            const path = DISCOVERY_PATHS.find(p => p.id === pathId);
            const state = Store.load();
            const pathState = state.discovery.paths[pathId];
            const stepIdx = pathState.currentStep;

            if (stepIdx >= path.steps.length) {
                this.renderCompletion(path);
                return;
            }

            const step = path.steps[stepIdx];
            const container = document.getElementById('discovery-content');

            let html = `
                <div class="discovery-step-view">
                    <div class="discovery-step-header">
                        <button class="discovery-back-btn">←</button>
                        <div class="discovery-step-title-bar">
                            <div class="discovery-step-path-name">${path.title}</div>
                            <div class="discovery-step-counter">${step.title}</div>
                        </div>
                    </div>
                    <div class="discovery-step-progress">
                        ${path.steps.map((_, i) => {
                            let cls = 'discovery-step-dot';
                            if (i < stepIdx) cls += ' done';
                            if (i === stepIdx) cls += ' active';
                            return `<div class="${cls}"></div>`;
                        }).join('')}
                    </div>
                    <div class="discovery-narrative">${step.narrative}</div>`;

            if (step.cards && step.cards.length) {
                html += `<div class="discovery-inline-cards">`;
                step.cards.forEach(ref => {
                    const card = Bookmarks.findCard(ref.id, ref.source);
                    if (card) html += UI.buildLayerCard(card, { source: ref.source, isBookmarked: Bookmarks.isBookmarked(card.id) });
                });
                html += `</div>`;
            }

            if (step.quiz) {
                html += `
                    <div class="discovery-micro-quiz">
                        <div class="discovery-micro-quiz-label">🧠 Quick Check</div>
                        <div class="quiz-question-text" style="font-size:1rem; text-align:left;">${step.quiz.question}</div>
                        <div class="quiz-options">
                            ${step.quiz.options.map((opt, i) => `<button class="quiz-option discovery-quiz-opt" data-idx="${i}">${opt}</button>`).join('')}
                        </div>
                        <div class="discovery-quiz-feedback"></div>
                    </div>`;
            }

            html += `<button class="discovery-continue-btn">Continue →</button>`;
            html += `</div>`;

            container.innerHTML = html;
            UI.bindLayerCardToggles(container);

            container.querySelector('.discovery-back-btn')?.addEventListener('click', () => this.renderPathList(container));

            if (step.quiz) {
                container.querySelectorAll('.discovery-quiz-opt').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const idx = parseInt(btn.dataset.idx);
                        const isCorrect = idx === step.quiz.correct;
                        container.querySelectorAll('.discovery-quiz-opt').forEach(b => {
                            b.classList.add('disabled');
                            if (parseInt(b.dataset.idx) === step.quiz.correct) b.classList.add('correct');
                            else if (b === btn && !isCorrect) b.classList.add('incorrect');
                        });
                        const fb = container.querySelector('.discovery-quiz-feedback');
                        fb.innerHTML = `<div class="quiz-explanation" style="margin-top:10px;">${isCorrect ? '✅ ' : '❌ '}${step.quiz.explanation}</div>`;
                    });
                });
            }

            container.querySelector('.discovery-continue-btn')?.addEventListener('click', () => {
                const state = Store.load();
                const ps = state.discovery.paths[pathId];
                if (!ps.completedSteps.includes(stepIdx)) ps.completedSteps.push(stepIdx);
                ps.currentStep = stepIdx + 1;
                Store.save(state);
                this.renderStep(pathId);
            });
        },

        renderCompletion(path) {
            const container = document.getElementById('discovery-content');
            const state = Store.load();
            if (!state.discovery.completedPaths.includes(path.id)) {
                state.discovery.completedPaths.push(path.id);
            }
            state.discovery.paths[path.id].completed = true;
            state.discovery.activePath = null;
            Store.save(state);

            const lastStep = path.steps[path.steps.length - 1];
            container.innerHTML = `
                <div class="discovery-completion">
                    <div class="discovery-completion-icon">${path.rewardBadge.icon}</div>
                    <div class="discovery-completion-title">Path Complete</div>
                    <div class="discovery-completion-msg">${lastStep.completionMessage || 'You have completed this discovery path.'}</div>
                    <div class="discovery-badge-earned">${path.rewardBadge.icon} ${path.rewardBadge.name}</div>
                </div>
                <button class="discovery-continue-btn" style="margin-top:24px;">Back to Paths</button>`;

            container.querySelector('.discovery-continue-btn')?.addEventListener('click', () => this.renderPathList(container));
        }
    };

    // ── Main Init ───────────────────────────────────────────────
    function init() {
        Bookmarks.init();
        Share.init();
        Briefing.init();
        Quiz.init();
        Alignment.init();
        Discovery.init();

        document.addEventListener('click', (e) => {
            const closeBtn = e.target.closest('[data-close-modal]');
            if (closeBtn) {
                const modalId = closeBtn.dataset.closeModal;
                document.getElementById(modalId)?.classList.add('hidden');
            }
            if (e.target.classList.contains('modal-backdrop')) {
                e.target.closest('.modal')?.classList.add('hidden');
            }
        });
    }

    return {
        init,
        Discovery,
        Briefing,
        Quiz,
        Bookmarks,
        Alignment,
        Share
    };
})();
