/**
 * Celestia — Cosmic Knowledge
 * Ancient wisdom traditions and modern science on planetary observation.
 * All content sourced from peer-reviewed journals and academic scholarship.
 */

const CosmicKnowledge = (() => {

    // ──────────────────────────────────────────────
    // Modern Science: What peer-reviewed research shows
    // ──────────────────────────────────────────────

    const modernScience = [
        {
            id: 'lunar-sleep',
            title: 'The Moon Affects Human Sleep',
            icon: '🌙',
            finding: 'Around the full moon, deep sleep brain activity drops 30%, sleep onset takes 5 minutes longer, and total sleep decreases by 20 minutes — even in sealed laboratories with no moon visibility.',
            details: 'A 2021 study across indigenous Toba/Qom communities in Argentina and University of Washington students found sleep starts later and is 46–58 minutes shorter in the days before the full moon. This held true for urbanized students with no awareness of moon phase, suggesting mechanisms beyond moonlight alone.',
            citations: [
                { text: 'Cajochen et al., Current Biology 23(15), 2013', doi: '10.1016/j.cub.2013.06.029' },
                { text: 'Casiraghi et al., Science Advances 7(5), 2021', doi: '10.1126/sciadv.abe0465' },
            ],
            verdict: 'confirmed',
        },
        {
            id: 'geomagnetic',
            title: 'Solar Storms Affect the Heart',
            icon: '☀️',
            finding: 'Geomagnetic storms from solar activity increase heart attack risk by 30–50% and stroke risk by up to 52%. A meta-analysis of 36 studies found 78% showed significant correlations.',
            details: 'The mechanism operates through disruption of circadian rhythms, reduced heart rate variability, blood pressure changes, and altered melatonin secretion. An estimated 10–15% of people are measurably affected, with stronger effects at higher geomagnetic latitudes.',
            citations: [
                { text: 'Vencloviene et al., Environmental Health, 2019 — 263 U.S. cities', doi: '10.1186/s12940-019-0516-0' },
                { text: 'Rezende et al., Communications Medicine (Nature), 2025', doi: '10.1038/s43856-025-00887-7' },
            ],
            verdict: 'confirmed',
        },
        {
            id: 'circalunar',
            title: 'Lunar Biological Clocks Exist',
            icon: '🔄',
            finding: 'Women\'s menstrual cycles showed intermittent synchronization with the Moon\'s 29.53-day synodic cycle — tracked over 32 years. This synchrony has weakened since ~2010, coinciding with LED lighting and smartphone screens.',
            details: 'Marine organisms have well-documented circalunar clocks (~29.5 day cycles). In humans, melatonin secretion in children shows sensitivity to lunar phase, with lower melatonin near the full moon — the first evidence the human circadian system responds to the Moon at an early age.',
            citations: [
                { text: 'Helfrich-Förster et al., Science Advances 7(5), 2021 — 22 women, up to 32 years', doi: '10.1126/sciadv.abe1358' },
                { text: 'Helfrich-Förster et al., Science Advances, 2025 — 176 women follow-up', doi: '10.1126/sciadv.adw4096' },
            ],
            verdict: 'suggestive',
        },
        {
            id: 'planetary-gravity',
            title: 'Planetary Tidal Forces Are Negligible',
            icon: '⚖️',
            finding: 'Jupiter\'s tidal force on Earth is 50,000 times weaker than the Moon\'s. Venus at closest approach exerts only 0.005% of lunar tidal force. The gravitational effect of a nearby building exceeds that of any planet.',
            details: 'Tidal force scales as mass divided by the cube of distance (M/R³). Despite Jupiter being 318× Earth\'s mass, its enormous distance crushes its tidal contribution to physically undetectable levels. There is no mechanism by which planetary positions could influence individual humans through gravity.',
            citations: [
                { text: 'Tidal force calculations — standard orbital mechanics (M/R³ scaling law)' },
            ],
            verdict: 'debunked',
        },
        {
            id: 'full-moon-myth',
            title: 'Full Moon ER Visits: A Myth',
            icon: '🏥',
            finding: 'A meta-analysis of 37 studies found moon phases account for no more than 1% of variance in hospital admissions, psychiatric episodes, or criminal behavior. The "lunar lunacy" effect does not exist.',
            details: 'The persistence of this belief is explained by illusory correlation — when something unusual happens during a full moon, we notice and remember it because it matches our expectation. When nothing unusual happens, the non-event is forgotten. This creates a false perception of association.',
            citations: [
                { text: 'Rotton & Kelly, Psychological Bulletin 97(2), 1985 — meta-analysis of 37 studies', doi: '10.1037/0033-2909.97.2.286' },
                { text: 'Margot, Nursing Research 64(3), 2015 — comprehensive review', doi: '10.1097/NNR.0000000000000086' },
            ],
            verdict: 'debunked',
        },
    ];

    // ──────────────────────────────────────────────
    // Ancient Traditions: Real historical scholarship
    // ──────────────────────────────────────────────

    const ancientTraditions = [
        {
            id: 'babylonian',
            title: 'Babylonian Astronomy',
            period: '1600–200 BCE',
            icon: '𒀭',
            summary: 'The most sustained program of planetary observation in the ancient world, spanning over a millennium of continuous record-keeping.',
            content: 'The Venus Tablet of Ammisaduqa (c. 1646 BCE) records 21 years of Venus observations — the oldest surviving systematic planetary record. The MUL.APIN tablets catalog 66 stars and constellations, give heliacal rising dates, and provide planetary period calculations. The Enuma Anu Enlil series comprises 68–70 tablets containing ~7,000 omens interpreting celestial phenomena for the state.',
            keyInsight: 'Babylonian astronomers did not separate "science" from "divination." As scholar Francesca Rochberg argues, treating their work as proto-science waiting to shed religious trappings misunderstands the actual historical record. They developed rigorous mathematical prediction within a framework where celestial and terrestrial events were fundamentally interconnected.',
            source: 'Rochberg, The Heavenly Writing (Cambridge, 2004); Hunger & Pingree, Astral Sciences in Mesopotamia (Brill, 1999)',
        },
        {
            id: 'hermetic',
            title: 'The Hermetic Tradition',
            period: '100–300 CE',
            icon: '☿',
            summary: '"As above, so below" — one of the most influential ideas in Western intellectual history, often misunderstood.',
            content: 'The Corpus Hermeticum presents a structured ontological hierarchy: "Eternity is an image of God; the cosmos is an image of eternity; the sun is an image of the cosmos; the human is an image of the sun." This is not vague mysticism but a formal macrocosm-microcosm correspondence system rooted in Alexandrian syncretism of Greek, Egyptian, and Persian thought.',
            keyInsight: 'The famous phrase "as above, so below" does not appear in the Corpus Hermeticum. It comes from the Emerald Tablet (6th–8th century Arabic text). The original reads: "That which is Below corresponds to that which is Above, and that which is Above corresponds to that which is Below, to accomplish the miracle of the One Thing."',
            source: 'Copenhaver, Hermetica (Cambridge, 1992); Fowden, The Egyptian Hermes (Cambridge, 1986)',
        },
        {
            id: 'greek',
            title: 'Greek Cosmic Philosophy',
            period: '500 BCE – 200 CE',
            icon: '🏛️',
            summary: 'From Pythagoras to Ptolemy, the Greeks built an intellectual framework that placed astronomy at the center of understanding reality.',
            content: 'Plato\'s Timaeus describes the universe as created by a divine Craftsman who imposes mathematical order on chaos. The World Soul is structured by the same mathematical harmonies found in music. Aristotle sanctioned celestial influence on the terrestrial world, writing: "This world is tied in some way and in a necessary manner to the movements of the superior world." Ptolemy\'s Tetrabiblos attempted to ground planetary influence in natural physics — heating, cooling, moistening, drying — not supernatural agency.',
            keyInsight: 'Ptolemy was not a mystic. He dismissed practices he considered baseless (like numerological name interpretation) and insisted on natural causation. The Tetrabiblos was companion to his Almagest — astronomy came first; interpreting planetary influence was "second and less self-sufficient."',
            source: 'Feke, Ptolemy\'s Philosophy: Mathematics as a Way of Life; Plato, Timaeus; Aristotle, On the Heavens & Meteorology',
        },
        {
            id: 'kepler',
            title: 'Kepler & the Music of the Spheres',
            period: '1571–1630 CE',
            icon: '🎵',
            summary: 'A real scientist who believed in planetary harmony — and whose belief led to one of the most important discoveries in physics.',
            content: 'Johannes Kepler discovered that the ratio of each planet\'s maximum and minimum orbital speeds approximates a consonant musical interval. Earth varies by a semitone (16:15). Saturn and Jupiter sing bass, Mars is tenor, Venus and Earth alto, Mercury soprano. While searching for these musical patterns in 1618, Kepler discovered his Third Law of Planetary Motion: the square of a planet\'s orbital period is proportional to the cube of its semi-major axis.',
            keyInsight: 'Kepler\'s Third Law — the foundation Newton used to derive universal gravitation — was discovered by a man literally searching for the Music of the Spheres. The "mystical" pursuit produced rigorous physics. Kepler considered Harmonices Mundi (1619) his greatest work.',
            source: 'Stephenson, The Music of the Heavens (Princeton); American Physical Society, "May 1618: Kepler\'s Discovery of Solar System Harmonics"',
        },
        {
            id: 'vedic',
            title: 'Vedic Astronomy (Jyotish)',
            period: '1500 BCE – present',
            icon: '🕉️',
            summary: 'One of the six Vedangas — auxiliary sciences of the Vedas — integrating mathematical astronomy, calendar science, and cosmic correspondence.',
            content: 'The Vedanga Jyotisha (c. 1400–1200 BCE) tracks solar and lunar motions for ritual timing. The Surya Siddhanta employs advanced trigonometry and spherical geometry for eclipse prediction, with planetary models comparable to Ptolemy. Indian and Greek traditions cross-pollinated: the Surya Siddhanta parallels Hipparchus\'s work, while Muhammad al-Fazari\'s Arabic translation (8th century) fed Indian methods into medieval European scholarship.',
            keyInsight: 'Jyotish never separated mathematical astronomy from understanding planetary significance. Siddhanta (computational astronomy), Samhita (mundane astrology), and Hora (natal astrology) were three branches of a single discipline — the "science of light."',
            source: 'Pingree, Jyotihsastra (Harrassowitz, 1981); Census of the Exact Sciences in Sanskrit, 5 vols.',
        },
        {
            id: 'egyptian',
            title: 'Egyptian Star Knowledge',
            period: '2400 BCE – 50 BCE',
            icon: '𓇳',
            summary: 'From the Pyramid Texts to the Dendera Zodiac, Egypt developed indigenous sky-tracking systems that preceded and later merged with Babylonian and Greek traditions.',
            content: 'The Pyramid Texts (c. 2400 BCE) contain references to Sirius, Orion, and the Bull Leg constellation (Ursa Major). The Egyptians divided the sky into 36 decans — star groups used for nighttime timekeeping. The Dendera Zodiac (c. 50 BCE), carved into the ceiling of Hathor\'s temple, is the only complete ancient sky map that survives. Scholar John H. Rogers called it "the only complete map we have of an ancient sky."',
            keyInsight: 'Sirius\'s heliacal rising predicted the Nile flood — the most important annual event in Egyptian civilization. Tracking stars was not abstract philosophy; it was survival. The priests who watched the sky literally fed the nation.',
            source: 'Buchwald & Josefowicz, The Zodiac of Paris (Princeton, 2010); Winkler, "Traversing the ancient Egyptian skies" (JRAS, 2025)',
        },
    ];

    // ──────────────────────────────────────────────
    // The Deeper Question: Why they watched the sky
    // ──────────────────────────────────────────────

    const deeperQuestion = {
        title: 'Why the Ancients Watched the Sky',
        paragraphs: [
            'Across every major civilization — Babylonian, Egyptian, Greek, Indian, Chinese, Mesoamerican — people tracked the planets with extraordinary precision for millennia. The Babylonians maintained continuous astronomical records for over 1,000 years. Why?',
            'Historians identify interconnected motivations that cannot be cleanly separated: agricultural timing (when to plant, when to harvest), navigation (crossing open ocean by the stars), calendrical science (organizing society around time), political legitimation (celestial portents bearing on the ruler\'s mandate), and the philosophical quest for cosmic order.',
            'The modern dichotomy between "science" and "religion" does not map onto ancient practice. As Francesca Rochberg argues in The Heavenly Writing, Babylonian celestial divination, horoscopy, and mathematical astronomy were aspects of a single intellectual enterprise with its own epistemological standards. The Babylonians were not proto-scientists waiting to shed superstition — they were rigorous observers working within a framework where celestial and terrestrial events were fundamentally connected.',
            'And here is the irony: the assumption that celestial events are meaningfully related to terrestrial affairs — the very idea modern science largely rejects — drove centuries of careful observation that eventually produced the rigorous data enabling purely physical astronomy. Kepler discovered his Third Law while searching for the Music of the Spheres. Newton derived universal gravitation from Kepler\'s laws. The "mystical" pursuit produced the foundation of modern physics.',
        ],
    };

    // ──────────────────────────────────────────────
    // Planet-specific ancient associations
    // ──────────────────────────────────────────────

    const planetWisdom = {
        mercury: {
            ancientName: 'Nabu (Babylonian) · Hermes (Greek) · Budha (Vedic)',
            association: 'Messenger of the gods. The Babylonians called it "the jumping planet" for its rapid, erratic motion near the horizon. Ptolemy assigned it qualities of drying and absorbing moisture, fitting its proximity to the Sun.',
            tradition: 'In the Hermetic tradition, Mercury/Hermes Trismegistus was the divine revealer of cosmic knowledge — the bridge between heaven and earth.',
        },
        venus: {
            ancientName: 'Ishtar (Babylonian) · Aphrodite (Greek) · Shukra (Vedic)',
            association: 'The oldest systematically observed planet. The Venus Tablet of Ammisaduqa (c. 1646 BCE) records 21 years of observations — the earliest surviving planetary data. Babylonians recognized it as both the morning and evening star.',
            tradition: 'The Maya tracked Venus with extraordinary precision, calculating its 584-day synodic period to within 2 hours of the modern value. Venus warfare — timing military campaigns to Venus\'s first appearance as morning star — was practiced across Mesoamerica.',
        },
        earth: {
            ancientName: 'Ki (Sumerian) · Gaia (Greek) · Prithvi (Vedic)',
            association: 'Not recognized as a planet until Copernicus. For most of human history, Earth was the immovable center around which all celestial bodies revolved.',
            tradition: 'The Hermetic principle of correspondence — "as above, so below" — placed Earth as the microcosmic reflection of celestial order. Plato\'s Timaeus describes humans as images of the cosmos, our souls sharing the same mathematical structure as the World Soul.',
        },
        mars: {
            ancientName: 'Nergal (Babylonian) · Ares (Greek) · Mangala (Vedic)',
            association: 'God of war across multiple cultures, likely due to its blood-red color. Ptolemy described Mars as primarily "drying and burning" in the Tetrabiblos. Its retrograde motion was one of the great puzzles that eventually led to the heliocentric model.',
            tradition: 'Michel Gauquelin\'s controversial "Mars effect" (1955) claimed eminent athletes were born disproportionately when Mars was rising — the most statistically tested astrological claim in history. After decades of debate, it is generally considered not replicated.',
        },
        jupiter: {
            ancientName: 'Marduk (Babylonian) · Zeus (Greek) · Brihaspati (Vedic)',
            association: 'King of the gods. The Babylonians dedicated the most extensive omen series to Jupiter (Marduk), whose movements were interpreted as bearing directly on the fate of the state and king.',
            tradition: 'In Kepler\'s celestial choir, Jupiter sings bass alongside Saturn. Its orbital speed varies by a minor third (6:5). Kepler saw this as evidence of divine mathematical harmony governing the cosmos.',
        },
        saturn: {
            ancientName: 'Ninurta (Babylonian) · Kronos (Greek) · Shani (Vedic)',
            association: 'The slowest visible planet, taking ~29.5 years to orbit. Ancient observers associated it with time, limits, and fate. Ptolemy described Saturn as "chiefly cooling and moderately drying."',
            tradition: 'Saturn\'s ~29.5-year cycle was linked to generational change. The "Saturn return" — when Saturn returns to its natal position — became one of the most enduring concepts in astrological tradition, marking ages ~29 and ~58.',
        },
        uranus: {
            ancientName: 'Discovered 1781 by William Herschel',
            association: 'Invisible to the naked eye, Uranus was unknown to ancient astronomers. Its discovery doubled the known size of the solar system and shattered the classical model of seven celestial bodies.',
            tradition: 'Herschel wanted to name it "Georgium Sidus" (George\'s Star) after King George III. The astronomical community chose Uranus — the Greek god of the sky and father of Kronos (Saturn) — maintaining the mythological naming convention.',
        },
        neptune: {
            ancientName: 'Discovered 1846 — first planet found by mathematics',
            association: 'Predicted by Urbain Le Verrier and John Couch Adams independently, from perturbations in Uranus\'s orbit. Neptune was found within 1° of Le Verrier\'s predicted position — a triumph of Newtonian mechanics.',
            tradition: 'Named for the Roman god of the sea. Neptune\'s discovery proved that mathematical physics could reveal invisible bodies — the same principle later used to predict and discover Pluto, dark matter candidates, and exoplanets.',
        },
    };

    // ──────────────────────────────────────────────
    // Public API
    // ──────────────────────────────────────────────

    return {
        modernScience,
        ancientTraditions,
        deeperQuestion,
        planetWisdom,
    };

})();
