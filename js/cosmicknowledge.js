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
    // Birthday Cosmic Profile: Layered Content
    // ──────────────────────────────────────────────

    // Zodiac sign profiles with seasonal/solar mythology context
    const zodiacProfiles = {
        'Aries':       { element: 'Fire', modality: 'Cardinal', rulingPlanet: 'Mars', season: 'Spring begins — the equinox. Day overtakes night. In solar mythology, this is the resurrection moment: light reborn after the dark half of the year.', glyph: '♈' },
        'Taurus':      { element: 'Earth', modality: 'Fixed', rulingPlanet: 'Venus', season: 'Mid-spring — the Sun gains strength. Agricultural cultures celebrated this as the time of planting. The Bull was sacred across Mesopotamia, Egypt, and Crete.', glyph: '♉' },
        'Gemini':      { element: 'Air', modality: 'Mutable', rulingPlanet: 'Mercury', season: 'Late spring — the longest twilights. In Babylonian tradition, the Twins (MUL.MAŠ.TAB.BA) marked the transition toward summer.', glyph: '♊' },
        'Cancer':      { element: 'Water', modality: 'Cardinal', rulingPlanet: 'Moon', season: 'Summer solstice — the Sun reaches its highest point and begins its descent. The "turning point" — Cancer means "crab," which walks sideways, as the Sun appears to reverse direction.', glyph: '♋' },
        'Leo':         { element: 'Fire', modality: 'Fixed', rulingPlanet: 'Sun', season: 'High summer — the Sun at peak power. The Lion was associated with solar kingship in Egypt (the Sphinx faces due east, greeting the equinox sunrise).', glyph: '♌' },
        'Virgo':       { element: 'Earth', modality: 'Mutable', rulingPlanet: 'Mercury', season: 'Late summer, the harvest. Virgo holds Spica — the "ear of grain." Across cultures, this constellation was associated with the harvest goddess (Demeter, Ishtar, Isis).', glyph: '♍' },
        'Libra':       { element: 'Air', modality: 'Cardinal', rulingPlanet: 'Venus', season: 'Autumn equinox — day and night in perfect balance. The Scales are the only zodiac symbol that is an object, not a living being. Balance, judgment, the weighing of souls.', glyph: '♎' },
        'Scorpio':     { element: 'Water', modality: 'Fixed', rulingPlanet: 'Mars', season: 'The descent into darkness. Days shorten rapidly. Cross-culturally associated with death, transformation, and the underworld. Scorpio\'s brightest star, Antares, means "rival of Mars" — red like blood.', glyph: '♏' },
        'Sagittarius': { element: 'Fire', modality: 'Mutable', rulingPlanet: 'Jupiter', season: 'Late autumn — the Archer aims toward the galactic center. The Milky Way\'s densest region sits in Sagittarius. The ancients pointed their arrow at the heart of the galaxy without knowing what they were aiming at.', glyph: '♐' },
        'Capricorn':   { element: 'Earth', modality: 'Cardinal', rulingPlanet: 'Saturn', season: 'Winter solstice — the Sun "dies." It reaches its lowest declination and appears to stand still (sol-stice = "sun stands still") for approximately 3 days before beginning to rise again around December 25th. The death and rebirth of the solar hero.', glyph: '♑' },
        'Aquarius':    { element: 'Air', modality: 'Fixed', rulingPlanet: 'Saturn', season: 'Deep winter — but the days are growing longer. The Water-Bearer pours out the waters of knowledge. In Egypt, the Nile god Hapi was shown pouring from two vases in the same pose.', glyph: '♒' },
        'Pisces':      { element: 'Water', modality: 'Mutable', rulingPlanet: 'Jupiter', season: 'The end of the zodiacal year — dissolution before renewal. Two fish swimming in opposite directions: spirit and matter, past and future. The vernal equinox point precessed into Pisces around the time of Christ.', glyph: '♓' },
    };

    // Solar mythology layer
    const solarMythology = [
        {
            id: 'solstice-death-rebirth',
            title: 'The Death and Rebirth of the Sun',
            badge: 'tradition',
            icon: '☀️',
            summary: 'At the winter solstice (~December 21), the Sun reaches its lowest point in the sky. For approximately 3 days, it appears to "stand still" at this lowest declination — the word solstice literally means "Sun stands still" (Latin: sol + sistere). Around December 25, it begins to rise again.',
            details: 'This astronomical fact — observable by anyone tracking the Sun\'s position — is the foundation of solar mythology across civilizations. The Sun "dies," lies in darkness for 3 days, and is "reborn." The parallels to the Christ narrative are well-documented in comparative religion: Charles Dupuis (The Origin of All Religious Worship, 1795) first systematically traced them. Joseph Campbell, Mircea Eliade, and the entire field of comparative mythology treat the solar death-rebirth cycle as one of the most universal mythic patterns in human culture.',
            source: 'Dupuis, Origine de tous les cultes (1795); Campbell, The Hero with a Thousand Faces (1949); Eliade, The Sacred and the Profane (1957)',
        },
        {
            id: 'equinox-resurrection',
            title: 'The Equinox and Resurrection',
            badge: 'tradition',
            icon: '🌅',
            summary: 'Easter falls near the spring equinox — the moment when day overcomes night. The Sun "crosses over" the celestial equator, moving from the southern to the northern hemisphere. Light triumphs over darkness.',
            details: 'The Council of Nicaea (325 CE) defined Easter as the first Sunday after the first full moon after the spring equinox — an explicitly astronomical formula. The word "Easter" may derive from Eostre/Ostara, a dawn goddess. "Passover" (Pesach) is also calibrated to the spring full moon. Across traditions, the equinox marks transcendence: the Egyptian "weighing of the heart," the Zoroastrian Nowruz, the Japanese cherry blossom season — all calibrated to the moment light and dark achieve balance, then light prevails.',
            source: 'Council of Nicaea historical records; Bede, De temporum ratione (725 CE) on Easter calculation',
        },
        {
            id: 'solar-heroes',
            title: 'Solar Heroes Across Cultures',
            badge: 'tradition',
            icon: '👑',
            summary: 'The pattern of a divine figure who dies and is reborn appears across cultures whose primary astronomical observation was the annual solar cycle: Osiris, Mithras, Dionysus, Baldur, Quetzalcoatl.',
            details: 'Scholars debate how far to push these parallels. Some (Dupuis, Kuhn, Murdock) argue for direct solar allegory. Others (C.S. Lewis, N.T. Wright) argue the parallels exist but the Christ event is the "true myth" that the solar pattern foreshadowed. Still others (Bart Ehrman) acknowledge mythological context while arguing for historical elements. The scholarly consensus is not "all the same story" but rather that solar death-rebirth is a deep mythic pattern that different cultures express in different ways. The pattern itself is undeniable.',
            source: 'Kuhn, Who Is This King of Glory? (1944); Campbell, The Hero with a Thousand Faces; Eliade, Patterns in Comparative Religion (1958)',
        },
    ];

    // Anatomy-mythology correspondence layer
    const anatomyPatterns = [
        {
            id: '33-vertebrae',
            title: 'The 33 Vertebrae',
            badge: 'symbolic',
            icon: '🦴',
            summary: 'The human spine has 33 vertebrae: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), and 4 coccygeal (fused). Jesus is said to have died at age 33. Freemasonry\'s highest degree is the 33rd.',
            details: 'Whether these correspondences were intentionally constructed by ancient mythmakers or are coincidental is a matter of interpretation. What is factual: the spine has exactly 33 vertebrae (this is standard human anatomy), the Gospel tradition places Jesus\'s death at ~33, and the Scottish Rite added its 33rd degree in the 18th century. The "sacred secretion" theory (Santos Bonacci, Kelly-Ann Maddox) claims a fluid descends through these 33 vertebrae — this specific narrative is modern (21st century), not ancient. But the symbolic register — the spine as the axis mundi, the central pillar connecting earth and heaven — IS found in yogic (sushumna nadi), Kabbalistic (the middle pillar of the Tree of Life), and Egyptian (the djed pillar of Osiris) traditions.',
            source: 'Gray\'s Anatomy (vertebral count); Yogic: Hatha Yoga Pradipika; Kabbalah: Sefer Yetzirah; Egyptian: Djed pillar symbolism',
        },
        {
            id: 'pineal-gland',
            title: 'The Pineal Gland: Anatomy Meets Mythology',
            badge: 'symbolic',
            icon: '👁️',
            summary: 'The pineal gland is a real endocrine organ, about 8mm long, sitting in the geometric center of the brain. It genuinely has photoreceptor-like cells (vestigial third eye), produces melatonin in response to light/dark cycles, and is bathed in cerebrospinal fluid.',
            details: 'What different traditions say about it — and what science confirms:\n\nDescartes (1649) called it "the principal seat of the soul" and "the place in which all our thoughts are formed" — this is real, documented in his Treatise on Man and Passions of the Soul (Stanford Encyclopedia of Philosophy confirms).\n\nHindu/Yogic: The ajna chakra ("third eye," located between the eyebrows) and sahasrara (crown) map to the pineal region. These are described in texts like the Sat-Cakra-Nirupana (16th century) and earlier tantric literature.\n\nEvolutionary biology: The pineal gland genuinely evolved from a photoreceptive organ. In lampreys and some lizards, it still functions as a literal "third eye" with a lens and retina (Mano, Photochemistry and Photobiology, 2007). In humans, it retains photoreceptor proteins.\n\nDMT: Rick Strassman hypothesized the pineal produces DMT. A 2019 study (Barker et al., Scientific Reports/Nature) found DMT in rat brains but at the same levels with or without a pineal gland — the pineal is likely not the primary source. The hypothesis remains unconfirmed in humans.\n\nMelatonin: The pineal genuinely regulates sleep-wake cycles via melatonin — this IS confirmed science, not speculation.',
            source: 'Stanford Encyclopedia of Philosophy, "Descartes and the Pineal Gland"; Mano, Photochem & Photobiol (2007); Barker et al., Scientific Reports (2019); Sat-Cakra-Nirupana (Avalon/Woodroffe translation, 1919)',
        },
        {
            id: 'solar-plexus',
            title: 'The Solar Plexus',
            badge: 'symbolic',
            icon: '☀️',
            summary: 'The celiac plexus — the largest autonomic nerve bundle in the abdomen — is called the "solar plexus" because its radiating nerve fibers resemble the rays of the sun. This is real anatomy, not metaphor.',
            details: 'The solar plexus sits behind the stomach and in front of the aorta, roughly at the level of the 12th thoracic vertebra. It controls digestion, adrenal response, and the "gut feeling" — the reason a blow to this area causes such distress. In yogic tradition, this corresponds to the manipura chakra ("city of jewels"), described as a lotus with 10 petals, associated with fire and personal power. The correspondence between anatomical naming (solar = sun) and esoteric tradition (fire chakra at the same location) is either a meaningful pattern or a coincidence — but the anatomy and the naming are facts.',
            source: 'Gray\'s Anatomy (celiac plexus); Hatha Yoga Pradipika, Ch. 3 (manipura)',
        },
    ];

    // Yogic tradition layer
    const yogicTradition = [
        {
            id: 'amrita-nectar',
            title: 'Amrita: The Nectar of Immortality',
            badge: 'tradition',
            icon: '🕉️',
            summary: 'The Hatha Yoga Pradipika (15th century, Svatmarama) describes a substance called "amrita" or "soma" that drips from the "moon center" (bindu/soma chakra) at the crown of the head. This is a real teaching from a real text — not internet invention.',
            details: 'Hatha Yoga Pradipika, Chapter 3, verses 43-53: "The moon, being at the root of the palate, constantly pours nectar day and night. The nectar falling from the moon is taken up by the sun [at the navel]; hence the body wears out." The entire purpose of certain yogic practices (inversions, khechari mudra, bandhas) is described as preventing the amrita from being "consumed" by the digestive fire. The Shiva Samhita (Ch. 2) similarly describes soma dripping from the "thousand-petaled lotus" (sahasrara). Whether you interpret amrita as cerebrospinal fluid, as a neurochemical, or as a purely spiritual metaphor is a matter of framework — but the textual tradition is real and centuries old.',
            source: 'Svatmarama, Hatha Yoga Pradipika (15th c.), Ch. 3, trans. Pancham Sinh (1914); Shiva Samhita, Ch. 2; Akers translation (2002)',
        },
        {
            id: 'khechari-mudra',
            title: 'Khechari Mudra: Catching the Nectar',
            badge: 'tradition',
            icon: '👅',
            summary: 'Khechari mudra — placing the tongue behind the soft palate into the nasal cavity — is described in the Hatha Yoga Pradipika as the technique for "catching" the descending amrita before it is lost. This practice is considered the highest mudra in hatha yoga.',
            details: 'HYP Ch. 3, v. 32-43 devotes extensive instruction to khechari mudra, including progressive tongue-lengthening practices. The text claims: "The yogi who sits even for a moment with the tongue turned upward is freed from poisons, disease, death, old age, etc." Modern researchers have noted that the soft palate region is richly supplied with nerve endings connecting to the hypothalamus and pituitary-pineal axis. Whether the yogic description of "catching the nectar" refers to stimulating these neural pathways, redirecting actual fluid (CSF does flow through this region), or something entirely non-physical is debated.',
            source: 'Hatha Yoga Pradipika, Ch. 3, v. 32-43; Mallinson, "Khechari Mudra" in Roots of Yoga (Penguin, 2017)',
        },
        {
            id: 'sushumna',
            title: 'Sushumna Nadi: The Central Channel',
            badge: 'tradition',
            icon: '🔥',
            summary: 'Yogic anatomy describes three main channels (nadis): ida (left/moon/cooling), pingala (right/sun/heating), and sushumna (central). Sushumna runs from the base of the spine to the crown of the head — the same path as the spinal cord.',
            details: 'The goal of kundalini yoga is to raise energy from the muladhara (base) through sushumna to sahasrara (crown), piercing each chakra along the way. The seven major chakras map roughly to nerve plexuses along the spine: sacral, lumbar, solar, cardiac, cervical, and cranial. Whether the nadis ARE the nervous system described in different language, or are a distinct subtle-body anatomy, is a matter of interpretive framework. But the structural correspondence between sushumna/spinal cord, chakras/nerve plexuses, and ida-pingala/sympathetic-parasympathetic nervous system is striking enough that multiple researchers have noted it.',
            source: 'Sat-Cakra-Nirupana (Woodroffe, 1919); Motoyama, Theories of the Chakras (1981); Saraswati, Kundalini Tantra (Bihar School of Yoga, 1984)',
        },
    ];

    // Sufi tradition layer
    const sufiTradition = [
        {
            id: 'lataif',
            title: 'Lataif-e-Sitta: The Six Subtle Centers',
            badge: 'tradition',
            icon: '☪️',
            summary: 'Sufi psychology describes six (or more) lataif — subtle spiritual centers in the human being, each associated with a color, a spiritual quality, and a stage of the soul\'s journey toward God.',
            details: 'Shah Wali Allah of Delhi (1703-1762) provided the most systematic scholarly treatment in his Altaf al-Quds. The six lataif are: nafs (lower self/yellow), qalb (heart/red), ruh (spirit/white), sirr (secret/green), khafi (hidden/black), akhfa (most hidden/no color). The qalb (heart) is central — but this is NOT the physical heart. It is a spiritual organ of perception. Sufi practice involves concentrating on each latifa in sequence as one advances on the spiritual path. This is a genuine, centuries-old contemplative psychology with its own internal logic and experiential basis — it is NOT about cerebrospinal fluid or the pineal gland. Modern attempts to map lataif onto chakras or neural anatomy are recent conflations.',
            source: 'Hermansen, "Shah Wali Allah\'s Theory of the Subtle Spiritual Centers," Journal of Near Eastern Studies 47(1), 1988; Chittick, The Sufi Path of Knowledge (1989)',
        },
        {
            id: 'dhikr-heart',
            title: 'The Heart as Organ of Spiritual Perception',
            badge: 'tradition',
            icon: '💚',
            summary: 'In Sufi tradition, the heart (qalb) is the primary organ of spiritual knowledge — distinct from intellectual knowledge (\'aql). Al-Ghazali describes the "eye of the heart" that perceives divine realities invisible to the physical senses.',
            details: 'Al-Ghazali (1058-1111), in his Ihya Ulum al-Din (Revival of the Religious Sciences), describes the heart as possessing a form of direct perception that transcends rational thought. This is developed through dhikr (remembrance of God) — repetitive invocation of divine names that produces measurable physiological effects (heart rate coherence, altered brainwave states). Modern HeartMath research has documented measurable electromagnetic fields from the heart and heart-brain communication via the vagus nerve. Whether this validates the Sufi metaphysics or merely parallels it is, again, a matter of interpretive framework.',
            source: 'Al-Ghazali, Ihya Ulum al-Din, Book 21 ("Wonders of the Heart"); Helminski, The Knowing Heart (1999)',
        },
    ];

    // Christian mystical alchemy layer
    const christianAlchemy = [
        {
            id: 'christos-etymology',
            title: 'Christos: What It Actually Means',
            badge: 'tradition',
            icon: '✝️',
            summary: 'Greek χριστός (christos) means "anointed one" — from χρίω (chriō), "to anoint or smear with oil." It does NOT mean "oil." But: anointing IS oil. The anointed one is literally "the one covered in sacred oil" (χρῖσμα, chrisma). The connection to oil is embedded in the word\'s original meaning.',
            details: 'The claim that "Christos literally means oil" (popular in Santos Bonacci\'s work) is etymologically wrong — Christos is the RESULT of being anointed with oil, not the oil itself. However, the deeper pattern is real: in the Hebrew Bible, kings and priests were literally anointed with sacred oil (shemen). The Messiah (mashiach) means "anointed one" in Hebrew, just as Christos does in Greek. Sacred oil — the medium of divine designation — runs through the entire tradition. The question of whether this oil is also an internal substance (CSF, a neurochemical, a spiritual substance) is where ancient tradition ends and modern interpretation begins.',
            source: 'Liddell-Scott-Jones Greek Lexicon (χριστός entry); Strong\'s Concordance H4899 (mashiach); 1 Samuel 16:13 (anointing of David)',
        },
        {
            id: 'boehme-tincture',
            title: 'Jacob Boehme: The Inner Alchemist',
            badge: 'tradition',
            icon: '⚗️',
            summary: 'Jacob Boehme (1575-1624), the German mystic, described inner spiritual transformation using alchemical language: "tincture," "fire," "light," "mercury," "sulphur." He was NOT describing physical chemistry but an interior spiritual process — and he was clear about this.',
            details: 'Boehme\'s Aurora (1612) and De Signatura Rerum (1622) use alchemical terminology to describe stages of spiritual awakening within the human soul. The "tincture" is a divine quality that transforms base spiritual states into gold — not literal lead into literal gold. His work directly influenced William Blake, German Idealism (Schelling, Hegel), and the entire tradition of Christian theosophy. Mike Zuber\'s Spiritual Alchemy: From Jacob Boehme to Mary Anne Atwood (Oxford UP, 2021) is the definitive scholarly treatment, tracing how spiritual alchemy was always distinct from laboratory alchemy — using the same language for radically different purposes.',
            source: 'Zuber, Spiritual Alchemy (Oxford UP, 2021); Boehme, Aurora (1612); Weeks, Boehme: An Intellectual Biography (SUNY, 1991)',
        },
        {
            id: 'ten-virgins',
            title: 'The Parable of the Ten Virgins',
            badge: 'symbolic',
            icon: '🕯️',
            summary: 'In Matthew 25:1-13, five wise virgins keep oil in their lamps; five foolish ones let their oil run out. Biblical scholars interpret this as a parable about spiritual preparedness for the coming of the bridegroom (Christ). But the metaphor of "oil" as a spiritual substance that must be preserved and not wasted runs deep.',
            details: 'The oil (elaion) in the parable is lamp oil — olive oil in the literal context. Mainstream biblical scholarship interprets it as representing faith, good works, or spiritual readiness (see Keener, A Commentary on the Gospel of Matthew, 1999). However, in the esoteric Christian tradition, the oil takes on a different valence: it becomes the inner spiritual substance that must not be "squandered" — a preserved and refined essence. Whether you read this as metaphor for spiritual discipline, as allegory for internal physiology, or as straightforward moral teaching depends on your interpretive framework. The text supports multiple readings.',
            source: 'Matthew 25:1-13; Keener, A Commentary on the Gospel of Matthew (Eerdmans, 1999); Origen\'s allegorical method (3rd century)',
        },
    ];

    // The "sacred secretion" — honest assessment
    const sacredSecretion = [
        {
            id: 'what-it-claims',
            title: 'The Sacred Secretion: What Is Claimed',
            badge: 'synthesis',
            icon: '🧪',
            summary: 'A modern theory (primarily associated with Santos Bonacci and Kelly-Ann Maddox) claims that cerebrospinal fluid is the "Christos oil," that it descends from the brain once per month when the Moon transits your natal Sun sign, travels down the 33 vertebrae, and can be "raised" back up through spiritual practices to activate the pineal gland.',
            details: 'This theory synthesizes elements from: yogic amrita teachings (real), the etymology of Christos/anointing (partially accurate), the anatomy of the spine (33 vertebrae — real), the pineal gland\'s location in CSF (real), lunar cycles (real), and the solar mythology death-rebirth pattern (real). Each individual element has a genuine basis in tradition or anatomy. The SPECIFIC WIRING — connecting these elements into a single narrative about monthly CSF descent triggered by lunar transit — is modern. It does not appear in any historical alchemical text, Hindu scripture, Sufi teaching, or biblical source that scholars have identified.',
        },
        {
            id: 'whats-real',
            title: 'What\'s Real In It',
            badge: 'synthesis',
            icon: '✓',
            summary: 'The individual components are mostly real: CSF does flow through the brain and spinal cord; the pineal gland IS bathed in CSF; the spine HAS 33 vertebrae; the Moon DOES affect human biology (sleep, melatonin); the yogic amrita tradition IS centuries old; the Christos/anointing connection IS embedded in the etymology.',
            details: 'The pattern recognition at work here is not random. Someone looked at: (1) yogic texts describing a substance descending from the crown, (2) the anatomy of CSF flow, (3) the pineal gland sitting in CSF with vestigial photoreceptor cells, (4) the 33 vertebrae, (5) confirmed lunar effects on melatonin and sleep, (6) the Christos/oil etymology — and saw a pattern. Whether that pattern is a genuine hidden teaching, a meaningful coincidence, or an example of apophenia (seeing patterns where none exist) depends on your epistemological framework. What we CAN say is: each piece has a real basis, but the specific synthesis is modern.',
        },
        {
            id: 'whats-not-real',
            title: 'What Science Doesn\'t Support',
            badge: 'synthesis',
            icon: '✗',
            summary: 'No peer-reviewed evidence shows CSF flow is affected by lunar transits through zodiac signs. No evidence that CSF "activates" the pineal gland in any special way on birthdays or during specific moon phases. The pineal gland already constantly sits in CSF — it doesn\'t need to be "activated" by it.',
            details: 'Specific claims that lack scientific support: (1) CSF does not "descend" in a monthly cycle triggered by the Moon — it circulates continuously at ~500ml/day; (2) there is no mechanism by which the Moon\'s position relative to a zodiac constellation would alter CSF flow; (3) the pineal gland is always in CSF — it doesn\'t need to be "reached" by it; (4) while the pineal has photoreceptor proteins, it does not function as a literal third eye in adult humans. The "god particle" connection is also a misnomer: the Higgs boson was called the "God particle" because publisher of Leon Lederman\'s book changed his original title "The Goddamn Particle" (because it was so hard to find) — it has nothing to do with spirituality.',
        },
        {
            id: 'charitable-reading',
            title: 'A Charitable Reading',
            badge: 'synthesis',
            icon: '🔮',
            summary: 'If you strip away the scientifically unsupported claims about monthly CSF cycles, what remains is a genuinely interesting question: did multiple ancient traditions independently describe an internal physiological/spiritual process using different languages — and does the spine/brain/pineal anatomy actually correspond to what they described?',
            details: 'The yogic tradition describes energy rising through the spine to the crown (sushumna → sahasrara). The Kabbalistic tradition maps the Tree of Life onto the human body with three pillars. The Egyptian djed pillar of Osiris represents the spinal column as the axis of resurrection. The Christian tradition places anointing oil on the head. The Sufi tradition describes ascending through subtle centers. These are independent traditions separated by centuries and continents. That they all describe something moving upward through the body to the head could be: (a) a universal physiological experience described in different cultural languages, (b) diffusion of a single original teaching, or (c) coincidental convergence. None of these explanations requires pseudoscience — the question itself is legitimate.',
        },
    ];

    // Modern neuroscience layer
    const neuroscienceLayer = [
        {
            id: 'pineal-evolution',
            title: 'The Pineal as Vestigial Third Eye',
            badge: 'confirmed',
            icon: '🧬',
            summary: 'In lampreys and some lizards (tuatara), the pineal organ still functions as a literal photoreceptive "third eye" — with a lens, cornea, and retina. In humans, the pineal retains photoreceptor proteins (opsins) but no longer functions as an eye.',
            details: 'Mano (2007) traced the evolutionary lineage: the pineal gland in vertebrates evolved from a photoreceptive organ at the top of the skull. The "parietal eye" is still visible in tuataras as a translucent patch on the skull. In mammals, the direct photoreception was replaced by an indirect pathway (retina → suprachiasmatic nucleus → pineal), but the fundamental light-sensing role was preserved. The ancients who called this the "third eye" were, in evolutionary terms, describing something real — just millions of years too late.',
            source: 'Mano, "A Median Third Eye: Pineal Gland Retraces Evolution of Vertebrate Photoreceptive Organs," Photochemistry and Photobiology (2007)',
        },
        {
            id: 'csf-flow',
            title: 'Cerebrospinal Fluid: What It Actually Does',
            badge: 'confirmed',
            icon: '💧',
            summary: 'The brain produces ~500ml of CSF daily. It circulates through the ventricular system, bathes the brain and spinal cord, cushions against trauma, removes metabolic waste, and transports hormones. The pineal gland protrudes into the third ventricle and is directly bathed in CSF.',
            details: 'Recent research on the glymphatic system (Nedergaard, Science, 2013) revealed that CSF flow increases dramatically during sleep, flushing metabolic waste (including amyloid-beta, implicated in Alzheimer\'s). This "brain washing" during sleep is a real discovery — and intriguingly, it peaks during deep sleep, which IS affected by lunar phase (Cajochen 2013). The pineal\'s melatonin IS released into CSF. So there IS a real connection between CSF, the pineal gland, melatonin, sleep, and lunar cycles — just not the specific mechanism the sacred secretion theory proposes.',
            source: 'Nedergaard & Goldman, "Brain Drain," Scientific American (2016); Xie et al., Science 342(6156), 2013 (glymphatic system)',
        },
        {
            id: 'birthday-effect',
            title: 'The Birthday Effect',
            badge: 'confirmed',
            icon: '🎂',
            summary: 'A statistically significant finding: mortality increases on birthdays. A study of 2.4 million deaths over 40 years found 13.8% excess deaths on birthdays, driven by cardiovascular events.',
            details: 'Ajdacic-Gross et al. (2012) analyzed 2.4 million Swiss deaths between 1969-2008. Birthday mortality was elevated across demographics, with cardiovascular deaths showing the strongest signal. The mechanism is likely psychosomatic — the stress or excitement of the birthday itself — not astronomical. But it demonstrates that the body DOES respond to calendrical markers in measurable ways, even when the mechanism is psychological rather than celestial. Your birthday is, in a quantifiable sense, a day your body "notices."',
            source: 'Ajdacic-Gross et al., "Death has a preference for birthdays — an analysis of death time series," Annals of Epidemiology 22(8), 2012',
        },
    ];

    // ──────────────────────────────────────────────
    // Public API
    // ──────────────────────────────────────────────

    return {
        modernScience,
        ancientTraditions,
        deeperQuestion,
        planetWisdom,
        zodiacProfiles,
        solarMythology,
        anatomyPatterns,
        yogicTradition,
        sufiTradition,
        christianAlchemy,
        sacredSecretion,
        neuroscienceLayer,
    };

})();
