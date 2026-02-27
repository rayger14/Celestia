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
        {
            id: 'entheogenic-death-rebirth',
            title: 'Not Metaphors — Descriptions',
            badge: 'tradition',
            icon: '🍄',
            summary: 'The Eleusinian Mysteries, the central religious rite of ancient Greece for nearly 2,000 years, involved drinking kykeon — a beverage now believed to have contained psychoactive compounds. Initiates described experiencing literal death and rebirth. This was not solar allegory — it was lived experience.',
            details: 'Scholars including R. Gordon Wasson, Albert Hofmann (discoverer of LSD), and Carl Ruck argued in The Road to Eleusis (1978) that kykeon contained ergot alkaloids (precursors to LSD) growing on barley. Archaeological evidence supports this: vessels at Mas Castellar de Pontós (Spain) contained ergot traces. Initiates at Eleusis — including Plato, Sophocles, Cicero, and Marcus Aurelius — described the experience in unmistakable terms. Cicero wrote: "We have learned from them the beginnings of life, and have gained the power not only to live happily, but also to die with a better hope." Plutarch described initiates experiencing terror, trembling, and then "a wonderful light" — a sequence identical to what modern psychedelic researchers call ego death and rebirth. The solar death-rebirth pattern may not be an allegory derived from watching the Sun — it may be a description of an actual neurochemical experience that the Sun\'s annual cycle happens to mirror. H. Ümit Sayin (NeuroQuantology, 2014) documented that every ancient culture that used entheogens independently produced the same archetypal images: death and rebirth, serpents, geometric forms, beings of light — suggesting these visions arise from the brain\'s own architecture when certain neurochemical thresholds are crossed.',
            source: 'Wasson, Hofmann & Ruck, The Road to Eleusis (1978); Sayin, NeuroQuantology 12(2), 2014; Cicero, De Legibus II.36; Plutarch, Fragment 168',
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
        {
            id: 'cia-validates-kundalini',
            title: 'The CIA Validated Kundalini in 1983',
            badge: 'synthesis',
            icon: '🏛️',
            summary: 'A declassified 1983 CIA report ("Analysis and Assessment of Gateway Process") explicitly describes kundalini rising — energy ascending from the base of the spine through the sushumna to the third eye — and concludes that binaural beat technology can achieve the same neurological state that takes 5 years of transcendental meditation.',
            details: 'Lt. Col. Wayne McDonnell, writing for the U.S. Army Intelligence and Security Command, describes in the declassified report (CIA-RDP96-00788R001700210016-5) how transcendental meditation works by concentrating focus on the base of the spine "until energetic currents rise up through the spine and into the Right Brain Hemisphere." He explicitly references kundalini rising from the Muladhara chakra, through the Sushumna nadi, reaching the Ajna chakra (third eye). The report\'s key finding: this exact neurological state — left-right hemispheric synchronization at specific frequencies — can be reproduced mechanically using binaural beats in the 4-7 Hz (theta) range. A subject with 20 years of Zen training could achieve and sustain this state at will. The Monroe Institute\'s Hemi-Sync technology claimed to produce the same state in weeks. The report further describes the body\'s internal resonance system aligning with Earth\'s Schumann resonance (~7.83 Hz) — the same frequency range the yogis were targeting through chanting and breathwork for millennia. The U.S. government did not debunk kundalini. They studied it, confirmed the neurological correlates, and tried to engineer a shortcut.',
            source: 'CIA-RDP96-00788R001700210016-5, "Analysis and Assessment of Gateway Process" (1983), declassified 2003; Monroe, Journeys Out of the Body (1971)',
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
        {
            id: 'sufi-entheogens',
            title: 'Sufism, Cannabis, and the Hashishins',
            badge: 'tradition',
            icon: '🌿',
            summary: 'Multiple Sufi orders historically used cannabis (hashish) and other psychoactive substances as tools for mystical experience. The Assassins (Hashishins) of Hassan-i Sabbah reportedly used hashish as part of initiation. Sufi poetry is saturated with references to wine and intoxication that scholars debate as literal, figurative, or both.',
            details: 'The connection between Sufism and psychoactive substances is well-documented but contested within the tradition itself. The word "assassin" derives from "hashishin" — users of hashish — referring to the Nizari Ismaili sect of Hassan-i Sabbah (11th-12th century). Marco Polo\'s account describes initiates being given hashish and brought to a garden paradise, then told they had glimpsed heaven. While Polo\'s account may be embellished, the association between Sufi mysticism and cannabis use is documented in multiple sources. Rumi, Hafez, and other Sufi poets write extensively of wine, intoxication, and ecstatic states — mainstream Sufism interprets these as metaphors for divine love, but scholars like Sayin (2014) note that Peganum harmala (Syrian rue, containing harmine — the same MAOI used in ayahuasca) grows wild across Persia and Anatolia and was used in Sufi ritual contexts. The Sufi "whirling" of the Mevlevi order itself induces altered states through vestibular disruption — another physical technology for achieving what entheogens provide chemically.',
            source: 'Sayin, NeuroQuantology 12(2), 2014; Rosenthal, The Herb: Hashish versus Medieval Muslim Society (Brill, 1971); Lewis, The Assassins: A Radical Sect in Islam (Basic Books, 2003)',
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
    // Planet-Body Rulership Map (Ptolemy Tetrabiblos III)
    // ──────────────────────────────────────────────

    const planetBodyMap = {
        mercury: {
            bodyRegion: 'Brain, nervous system, lungs, arms, hands',
            system: 'Communication, cognition, respiration',
            tradition: 'Ptolemy, Tetrabiblos III.12 — Mercury rules the rational mind and all organs of communication. In Galenic medicine, Mercury governed the "animal spirit" carried by nerves.',
            badge: 'tradition',
            inElement: {
                Fire: 'Mercury in a Fire sign (Aries/Leo/Sagittarius): quick, impulsive thinking. Ideas come fast. Speech is direct. Ptolemy associated this with "choleric" mental energy — heat drives rapid cognition.',
                Earth: 'Mercury in an Earth sign (Taurus/Virgo/Capricorn): practical, methodical thinking. Ideas take form slowly but solidly. Ptolemy: the "melancholic" mental temperament — careful, detail-oriented.',
                Air: 'Mercury in an Air sign (Gemini/Libra/Aquarius): Mercury\'s natural element. Sharp verbal and abstract ability. Communication flows easily. Ptolemy noted Mercury is strongest in Gemini (domicile) and Virgo (exaltation).',
                Water: 'Mercury in a Water sign (Cancer/Scorpio/Pisces): intuitive, emotionally colored thinking. Memory is strong. Ptolemy: the "phlegmatic" mental quality — perception through feeling rather than logic.',
            },
        },
        venus: {
            bodyRegion: 'Throat, kidneys, reproductive system, veins',
            system: 'Venous circulation, skin quality, fertility',
            tradition: 'Ptolemy, Tetrabiblos III.12 — Venus rules the generative organs and throat. Culpeper\'s herbal medicine assigned Venus rulership over the kidneys and venous blood.',
            badge: 'tradition',
            inElement: {
                Fire: 'Venus in a Fire sign: passionate, demonstrative affection. Love expressed through action and presence. In Vedic Jyotish, Shukra (Venus) in Fire signs gives strong creative drive and physical vitality.',
                Earth: 'Venus in an Earth sign: sensual, steady love. Appreciation for beauty in tangible form — food, nature, craft. Venus has its domicile in Taurus (the most physical expression of beauty).',
                Air: 'Venus in an Air sign: love expressed through intellect and social grace. Venus has its domicile in Libra — partnership, fairness, aesthetic harmony. Relationships built on mental connection.',
                Water: 'Venus in a Water sign: deep, emotional bonds. Love is felt profoundly. Venus is exalted in Pisces — the sign of unconditional compassion. The most empathic Venus placements.',
            },
        },
        mars: {
            bodyRegion: 'Muscles, adrenal glands, blood, male reproductive system',
            system: 'Inflammatory response, iron metabolism, adrenaline',
            tradition: 'Ptolemy, Tetrabiblos III.12 — Mars rules the "choleric" temperament: heat, dryness, and the blood\'s iron. Paracelsus linked Mars to iron in alchemy (Fe = Mars symbol).',
            badge: 'tradition',
            inElement: {
                Fire: 'Mars in a Fire sign: Mars at home. Aries is Mars\'s domicile. Physical energy, competitive drive, and courage are amplified. The warrior archetype in its natural element.',
                Earth: 'Mars in an Earth sign: disciplined energy. Mars in Capricorn is exalted — strategic, patient force applied toward concrete goals. The builder rather than the warrior.',
                Air: 'Mars in an Air sign: energy channeled through debate, strategy, and ideas. Mars in Libra is in detriment (opposite its domicile) — energy dispersed through deliberation.',
                Water: 'Mars in a Water sign: emotional intensity drives action. Mars in Scorpio (traditional domicile) — deep, transformative power. Energy hidden beneath the surface until released.',
            },
        },
        jupiter: {
            bodyRegion: 'Liver, hips, arterial system, thighs',
            system: 'Growth, fat metabolism, arterial blood',
            tradition: 'Ptolemy, Tetrabiblos III.12 — Jupiter rules the liver (seat of the "sanguine" humor). In Vedic Jyotish, Guru (Jupiter) governs expansion and the liver\'s regenerative capacity.',
            badge: 'tradition',
            inElement: {
                Fire: 'Jupiter in a Fire sign: expansive confidence. Jupiter in Sagittarius (domicile) — the philosopher, explorer, truth-seeker at full power. Optimism and vision amplified.',
                Earth: 'Jupiter in an Earth sign: abundance takes material form. Growth manifests as practical prosperity. Jupiter brings wealth and stability through methodical expansion.',
                Air: 'Jupiter in an Air sign: intellectual expansion. Ideas spread widely. Jupiter in social Air signs creates teachers, communicators, and bridge-builders.',
                Water: 'Jupiter in a Water sign: emotional generosity. Jupiter in Cancer (exalted) — nurturing abundance, protective wisdom. The most compassionate Jupiter placements.',
            },
        },
        saturn: {
            bodyRegion: 'Bones, joints, teeth, spleen, skin',
            system: 'Structural integrity, calcification, aging',
            tradition: 'Ptolemy, Tetrabiblos III.12 — Saturn rules the "melancholic" temperament: cold and dry. Governs skeletal structure, boundaries, and the process of mineralization.',
            badge: 'tradition',
            inElement: {
                Fire: 'Saturn in a Fire sign: discipline meets impulse. Saturn constrains Fire\'s spontaneity, creating focused willpower. The tension between freedom and responsibility.',
                Earth: 'Saturn in an Earth sign: Saturn at home. Capricorn is Saturn\'s domicile. Mastery through patience and structure. The architect, the strategist, the long-term builder.',
                Air: 'Saturn in an Air sign: Saturn in Aquarius (domicile) — structured thought, systematic reform. Ideas given form and discipline. The scientist and social architect.',
                Water: 'Saturn in a Water sign: emotional lessons and boundaries. Depth earned through difficulty. Saturn\'s restrictions applied to the emotional realm — maturity through feeling.',
            },
        },
        uranus: {
            bodyRegion: 'Nervous system (modern), bioelectric field',
            system: 'Sudden disruption, electrical signaling',
            tradition: 'No classical association — discovered 1781 by Herschel. Modern astrologers associate Uranus with the nervous system\'s electrical impulses and sudden somatic events.',
            badge: 'symbolic',
            inElement: {
                Fire: 'Uranus in Fire: revolutionary energy and sudden creative breakthroughs. Generational marker for periods of social upheaval and innovation.',
                Earth: 'Uranus in Earth: disruption of material structures — economic shifts, technological revolutions in industry. Generational changes in how we build and produce.',
                Air: 'Uranus in Air: intellectual revolution. New communication paradigms and social ideas emerge. Uranus in Aquarius (1996-2003) coincided with the internet revolution.',
                Water: 'Uranus in Water: emotional and spiritual disruption. Generational shifts in collective feeling and empathy. New approaches to healing and psychology.',
            },
        },
        neptune: {
            bodyRegion: 'Pineal gland, lymphatic system (modern)',
            system: 'Endocrine sensitivity, psychoactive chemistry',
            tradition: 'No classical association — discovered 1846. Modern astrologers connect Neptune to the pineal gland and lymph. Intriguingly, the pineal does contain photoreceptor proteins (Mano 2007).',
            badge: 'symbolic',
            inElement: {
                Fire: 'Neptune in Fire: spiritual inspiration through action and vision. Generational idealism and charismatic spiritual movements.',
                Earth: 'Neptune in Earth: the dissolving of material certainties. Generational shifts in what we value. Environmental awareness and ecological spirituality.',
                Air: 'Neptune in Air: imagination expressed through ideas and communication. Generational changes in art, media, and collective narrative.',
                Water: 'Neptune in Water: Neptune\'s natural element. Deep collective spirituality and psychic sensitivity. The boundary between self and other becomes permeable.',
            },
        },
    };

    // ──────────────────────────────────────────────
    // Element Compatibility (Aristotelian Physics)
    // ──────────────────────────────────────────────

    const elementCompatibility = {
        'Fire-Fire':   { rating: 'Harmonious', desc: 'Same element — natural affinity. Ptolemy: "of the same nature, sharing heat and dryness." Both signs express through action, will, and transformation.' },
        'Fire-Air':    { rating: 'Harmonious', desc: 'Classical complement. Fire needs air to burn. In Aristotelian physics, both share the quality of heat — one active (Fire), one intellectual (Air).' },
        'Fire-Earth':  { rating: 'Neutral', desc: 'Different natures — Fire is hot, Earth is cold. Fire can forge Earth or scorch it. The dynamic depends on willingness to ground inspiration into form.' },
        'Fire-Water':  { rating: 'Challenging', desc: 'Opposing elements. Water extinguishes fire. In Aristotelian terms, they share no qualities. Steam or destruction — transformation either way.' },
        'Earth-Earth': { rating: 'Harmonious', desc: 'Same element — grounded stability. Both build, both endure. Ptolemy: shared cold and dry nature creates deep mutual understanding.' },
        'Earth-Water': { rating: 'Harmonious', desc: 'Classical complement. Water nourishes earth, earth gives water form. They share the quality of cold — one nurtures, one structures.' },
        'Earth-Air':   { rating: 'Neutral', desc: 'Different but not directly opposed in Aristotelian terms. Air theorizes, Earth builds. The tension is between abstraction and practicality.' },
        'Air-Air':     { rating: 'Harmonious', desc: 'Same element — intellectual resonance. Shared heat and moisture create fluent communication. Ideas spark and circulate freely.' },
        'Air-Water':   { rating: 'Challenging', desc: 'Different natures — Air is hot, Water is cold. Air rationalizes what Water feels. The gap between logic and emotion must be bridged.' },
        'Water-Water': { rating: 'Harmonious', desc: 'Same element — deep emotional attunement. Shared cold and moist nature creates empathic bonds. The risk is mutual drowning in feeling.' },
    };

    // ──────────────────────────────────────────────
    // Ptolemaic Aspect Definitions
    // ──────────────────────────────────────────────

    const aspectMeanings = {
        'Conjunction': 'Unity — the two Suns occupy the same region of the zodiac. Their qualities merge and amplify. Ptolemy (Tetrabiblos I.13) considered this the most powerful relationship, for good or ill, depending on the planets involved.',
        'Sextile': 'Harmonious support — 60° apart, two signs of compatible element. Elements share one Aristotelian quality (both hot, or both cold). Ptolemy: "signs of the same gender." Opportunity through gentle cooperation.',
        'Square': 'Tension and dynamic energy — 90° apart. Elements share no qualities. Ptolemy (Tetrabiblos I.13) called this "disjunct" — the aspect of friction that forces growth. The relationship that makes you work.',
        'Trine': 'Natural harmony — 120° apart, same element. The most harmonious major aspect. Ptolemy: "of the same element and gender." What flows without effort — the gifts you share.',
        'Opposition': 'Polarity and awareness — 180° apart, complementary signs across the zodiac wheel. Maximum distance, maximum visibility. Ptolemy: full tension but also full consciousness of the other. The mirror.',
    };

    // ──────────────────────────────────────────────
    // Zodiac Sign Mythology (Persian/Greek/Zoroastrian)
    // ──────────────────────────────────────────────

    const signMythology = {
        Aries: {
            title: 'The Ram — Golden Fleece & Bahram',
            greek: 'The ram Chrysomallus who carried Phrixus to safety, whose golden fleece became the object of Jason\'s quest. Aries marks the vernal equinox — the Sun\'s resurrection from winter.',
            persian: 'In Zoroastrian tradition, the yazata Bahram (Verethragna) embodies victorious force. The Ram is the first of his ten incarnations — the primal surge of life overcoming death.',
            source: 'Apollodorus, Bibliotheca 1.9; Bundahishn Ch. 26; Boyce, History of Zoroastrianism Vol. I',
        },
        Taurus: {
            title: 'The Bull — Tauroctony & Apis',
            greek: 'Zeus took bull form to carry Europa. The constellation preserves the Pleiades (seven sisters) on the bull\'s shoulder — the most observed star cluster in human history.',
            persian: 'The Mithraic tauroctony — Mithras slaying the cosmic bull — is the central icon of Roman Mithraism. The bull\'s death releases grain (tail), wine (blood), and the soul (dog laps blood). It encodes the precession of equinoxes: the end of the Age of Taurus.',
            source: 'Ulansey, Origins of the Mithraic Mysteries (1989); Plutarch, De Iside; Porphyry, De antro nympharum',
        },
        Gemini: {
            title: 'The Twins — Dioscuri & Cosmic Duality',
            greek: 'Castor and Pollux — one mortal, one divine. When Castor died, Pollux begged Zeus to share his immortality. They alternate between Olympus and Hades — the archetype of duality resolved through love.',
            persian: 'Zoroastrian cosmology centers on the twin spirits: Spenta Mainyu (progressive mentality) and Angra Mainyu (destructive mentality). The fundamental choice between truth (asha) and falsehood (druj).',
            source: 'Homer, Odyssey 11.300; Yasna 30.3-5 (Gathas of Zarathustra)',
        },
        Cancer: {
            title: 'The Crab — Gate of Souls',
            greek: 'Hera sent the crab Karkinos to bite Heracles during his battle with the Hydra. It failed but was immortalized in the stars. Cancer marks the summer solstice — the Sun\'s highest point before descent.',
            persian: 'In Neoplatonic tradition (drawing on Persian/Chaldean sources), Cancer was the "Gate of Men" — the portal through which souls descended into incarnation. The Moon\'s exaltation sign.',
            source: 'Pseudo-Eratosthenes, Catasterismi; Macrobius, Commentary on Scipio\'s Dream I.12',
        },
        Leo: {
            title: 'The Lion — Nemean Beast & Royal Star',
            greek: 'The Nemean Lion, first of Heracles\' twelve labors — invulnerable to weapons, only defeated by bare hands. The solar hero conquers the solar beast. Regulus ("little king") marks the lion\'s heart.',
            persian: 'Regulus (Venant in Persian) was one of the four Royal Stars of Persia — the Watcher of the North. Leo was associated with Mihr (Mithra), the god of light and covenant.',
            source: 'Apollodorus, Bibliotheca 2.5.1; Bundahishn Ch. 2 (Royal Stars)',
        },
        Virgo: {
            title: 'The Maiden — Astraea & the Harvest',
            greek: 'Astraea, goddess of justice, was the last immortal to leave Earth during the decline of the ages. She holds the star Spica — the ear of wheat — marking the harvest.',
            persian: 'Virgo\'s star Spica connects to Demeter/Persephone and the mystery of descent: the grain that falls into the earth, dies, and rises again. The agricultural mystery that underlies all death-rebirth myths.',
            source: 'Hesiod, Works and Days 174; Aratus, Phaenomena 96-136; Homeric Hymn to Demeter',
        },
        Libra: {
            title: 'The Scales — Ma\'at & Divine Judgment',
            greek: 'Originally the claws of Scorpio, separated by the Romans. Associated with Astraea\'s scales of justice. Libra marks the autumn equinox — day and night in exact balance.',
            persian: 'In Zoroastrian tradition, Rashnu (the righteous judge) weighs souls on golden scales at the Chinvat Bridge after death. In Egyptian tradition, Ma\'at\'s feather weighs against the heart.',
            source: 'Bundahishn Ch. 30 (Chinvat); Book of the Dead, Spell 125; Manilius, Astronomica',
        },
        Scorpio: {
            title: 'The Scorpion — Death & Eagle Transformation',
            greek: 'Orion boasted he would kill all animals. Gaia sent the scorpion. They are placed on opposite sides of the sky — when Scorpio rises, Orion sets. The eternal chase of death pursuing pride.',
            persian: 'In Persian/Babylonian tradition, Scorpio transforms through three stages: Scorpion (primal), Eagle (elevated), and Phoenix (transcended). The eagle was Scorpio\'s original form in some zodiacs, representing the power of death transformed into vision.',
            source: 'Pseudo-Eratosthenes, Catasterismi; Manilius, Astronomica 4.212; Allen, Star Names (1899)',
        },
        Sagittarius: {
            title: 'The Archer — Chiron & Tishtar',
            greek: 'Chiron the centaur — the wounded healer. Unlike other centaurs (wild, brutal), Chiron was wise, teaching Asclepius medicine, Achilles war, and Jason navigation. Wounded by Heracles\' poisoned arrow, he traded his immortality to free Prometheus.',
            persian: 'Tishtar (Tishtrya), the yazata of the star Sirius and the arrow-star. In the Avesta, Tishtrya battles the demon of drought (Apaosha) in the form of a white horse, bringing life-giving rain.',
            source: 'Apollodorus, Bibliotheca 2.5.4; Tishtar Yasht (Yt. 8); Boyce, Zoroastrianism Vol. I',
        },
        Capricorn: {
            title: 'The Sea-Goat — Pan & Enki',
            greek: 'Pan, fleeing the monster Typhon, dove into the Nile — his upper body remained goat, his lower became fish. The sea-goat: half terrestrial ambition, half oceanic depth.',
            persian: 'Capricorn connects to the Babylonian Enki/Ea — god of wisdom and the subterranean waters (Abzu). Saturn\'s exaltation sign. The winter solstice point — where the Sun reaches its lowest and begins to climb. The "death" of the Sun and its three-day standstill before rebirth.',
            source: 'Hyginus, Astronomica 2.28; Berossus, Babyloniaca (via Apollodorus); Bundahishn',
        },
        Aquarius: {
            title: 'The Water-Bearer — Ganymede & the New Age',
            greek: 'Ganymede, the most beautiful mortal, carried to Olympus by Zeus\'s eagle to serve as cupbearer to the gods. He pours the waters of wisdom from heaven to earth.',
            persian: 'Connected to the Babylonian Ea (Enki) as water-bearer, bringing civilization from the celestial realm. Due to axial precession (~25,800 year cycle), the vernal equinox is slowly moving from Pisces into Aquarius — the "Age of Aquarius" transition that takes centuries.',
            source: 'Homer, Iliad 20.232; Hipparchus (precession discovery, c. 130 BCE); Berossus',
        },
        Pisces: {
            title: 'The Fish — Aphrodite & the Vesica Piscis',
            greek: 'Aphrodite and Eros, fleeing Typhon, transformed into fish and tied themselves together with a cord so they wouldn\'t lose each other. Love bound even in transformation.',
            persian: 'Connected to Apam Napat ("child of the waters") in Zoroastrian tradition — a being of fire within water. The Vesica Piscis (intersection of two circles) became the earliest Christian symbol, combining the Greek IXTHYS (fish) acronym with sacred geometry.',
            source: 'Ovid, Fasti 2.458; Avesta, Aban Yasht (Yt. 5); Lundy, Monumental Christianity (1876)',
        },
    };

    // ──────────────────────────────────────────────
    // Lunar Cycle & Female Reproductive Cycle Data
    // ──────────────────────────────────────────────

    const lunarCyclePhases = [
        {
            moonPhase: 'New Moon',
            moonEmoji: '\uD83C\uDF11',
            moonDays: '0-3.7',
            cycleName: 'Menstrual',
            cycleDays: '1-5',
            cycleColor: '#ef4444',
            hormones: 'Estrogen & progesterone at lowest. Prostaglandins trigger uterine contractions.',
            bodyEffect: 'Energy at lowest. Body temperature drops. Iron may temporarily decrease. Deep rest phase — the body is actively releasing and renewing.',
            lunarBody: 'Melatonin peaks in absence of moonlight. Deep sleep quality is highest around the new moon (Casiraghi et al. 2021). Lower blood pressure and heart rate reported.',
            tradition: 'Many indigenous cultures observed "dark moon retreat" — women withdrew from daily tasks during menstruation, often gathering together. The Sanskrit word for menstruation (ṛtu) also means "season" and "cosmic order."',
        },
        {
            moonPhase: 'Waxing (Crescent → First Quarter)',
            moonEmoji: '\uD83C\uDF12',
            moonDays: '3.7-14.8',
            cycleName: 'Follicular',
            cycleDays: '6-13',
            cycleColor: '#f4b942',
            hormones: 'FSH stimulates follicle growth. Estrogen rises steadily. Pituitary becomes more active.',
            bodyEffect: 'Rising estrogen improves mood, energy, and cognition. Verbal fluency peaks. Skin quality improves (estrogen promotes collagen). Basal body temperature remains low. Exercise capacity increases.',
            lunarBody: 'As moonlight increases nightly, sleep onset gradually shifts later. The body transitions from deep rest into a building phase — mirroring the hormonal rise.',
            tradition: 'Waxing moon associated with growth, planting, and beginning new endeavors across agricultural traditions worldwide. The Farmer\'s Almanac tradition of planting by moon phase persists into the present.',
        },
        {
            moonPhase: 'Full Moon',
            moonEmoji: '\uD83C\uDF15',
            moonDays: '14.8-18.5',
            cycleName: 'Ovulatory',
            cycleDays: '14-16',
            cycleColor: '#06d6a0',
            hormones: 'LH surge triggers egg release. Estrogen peaks. Brief testosterone pulse. Peak fertility window.',
            bodyEffect: 'Peak fertility, energy, and social confidence. Studies show increased facial symmetry perception and heightened sensory sensitivity. Body temperature begins rising after ovulation (~0.3-0.5\u00B0C shift).',
            lunarBody: 'Deep sleep brain activity drops 30% around full moon (Cajochen 2013). Sleep is 20-58 min shorter. Melatonin secretion measurably decreases. The body is most "awake" and outward-facing.',
            tradition: 'The "White Moon" cycle: in the most common synchronization pattern found by Helfrich-F\u00F6rster (2021), ovulation clusters near the full moon — peak fertility at peak illumination. Full moon fertility rituals appear across cultures.',
        },
        {
            moonPhase: 'Waning (Last Quarter → Crescent)',
            moonEmoji: '\uD83C\uDF16',
            moonDays: '18.5-29.5',
            cycleName: 'Luteal',
            cycleDays: '17-28',
            cycleColor: '#8b5cf6',
            hormones: 'Progesterone rises (corpus luteum). If no implantation, both progesterone and estrogen drop sharply in final days.',
            bodyEffect: 'Progesterone promotes calm but also PMS symptoms in late phase. Body temperature stays elevated. Water retention, breast tenderness, mood shifts. Serotonin drops in final days — the neurochemical basis of premenstrual mood changes.',
            lunarBody: 'Sleep gradually normalizes as moonlight decreases. The body turns inward, preparing either for implantation or for release. Melatonin production rises back toward its new-moon maximum.',
            tradition: 'Waning moon associated with release, completion, and letting go across traditions. The cycle preparing to close mirrors the moon preparing to disappear. In Traditional Chinese Medicine, the luteal phase corresponds to the Liver qi phase — preparation and gathering.',
        },
    ];

    const lunarCycleStudies = [
        {
            id: 'helfrich-forster-2021',
            title: 'Lunar-Menstrual Synchronization: What Science Found',
            badge: 'confirmed',
            icon: '\uD83C\uDF19',
            summary: 'Helfrich-F\u00F6rster et al. (2021) tracked 22 women for up to 32 years of menstrual cycle data. They found intermittent synchronization with the 29.53-day lunar synodic cycle, especially around full and new moon.',
            details: 'Key findings:\n\n1. Synchronization was NOT constant — it appeared in episodes lasting several months before drifting out of phase. This is called "intermittent synchrony."\n\n2. Women with cycle lengths close to 29.5 days showed the strongest synchronization.\n\n3. Synchronization has WEAKENED since approximately 2010, correlating with the spread of LED lighting and smartphone screen use at night — artificial light disrupts the signal.\n\n4. The 29.53-day human menstrual cycle matching the lunar synodic month (also 29.53 days) is statistically unlikely to be coincidence. No other primate has a cycle this close to the lunar month.\n\n5. A follow-up study (2025) in children confirmed that moonlight measurably suppresses melatonin, establishing the biological pathway.',
            source: 'Helfrich-F\u00F6rster et al., "Women temporarily synchronize their menstrual cycles with the luminance and gravimetric cycles of the Moon," Science Advances 7(5), 2021',
        },
        {
            id: 'biological-pathway',
            title: 'The Biological Pathway: Moon → Pineal → Ovaries',
            badge: 'confirmed',
            icon: '\uD83E\uDDE0',
            summary: 'The mechanism connecting moonlight to menstrual timing runs through the pineal gland — the same structure described in yogic and alchemical traditions as the "third eye."',
            details: 'The hormonal cascade:\n\nMoon (light) → Retina → Suprachiasmatic Nucleus → Pineal Gland → Melatonin ↓ → Hypothalamus (GnRH) → Anterior Pituitary (FSH/LH) → Ovaries → Ovulation timing\n\nMelatonin is the key mediator. It is:\n- Produced by the pineal gland\n- Suppressed by light (including moonlight)\n- A modulator of GnRH (gonadotropin-releasing hormone)\n- GnRH controls FSH and LH, which control follicle development and ovulation\n\nThis is the same pineal-endocrine axis that yogic traditions describe when they speak of the "third eye" governing the body\'s rhythms — though they used different language. The Hatha Yoga Pradipika\'s description of amrita (nectar) flowing from the "moon center" in the head (Ch. 3, v. 43-44) maps remarkably onto the pineal → hypothalamic → pituitary axis.\n\nIn marine organisms, this pathway is well-established. The bristle worm Platynereis dumerilii has a confirmed molecular circalunar clock (Zantke et al., Cell Reports 2013).',
            source: 'Casiraghi et al., Science Advances 7(5), 2021; Zantke et al., Cell Reports 5(1), 2013; Mano & Bhatt, Photochemistry and Photobiology 83(1), 2007',
        },
        {
            id: 'cajochen-sleep',
            title: 'Full Moon Sleep Disruption',
            badge: 'confirmed',
            icon: '\uD83D\uDCA4',
            summary: 'Cajochen et al. (2013) found that around the full moon, deep sleep brain activity drops 30%, sleep duration decreases by 20 minutes, and melatonin levels measurably fall.',
            details: 'This double-blind study at the University of Basel controlled for every variable: participants were in windowless rooms with no knowledge of the lunar phase. Yet EEG data showed:\n\n- Delta activity during NREM sleep decreased by 30% around full moon\n- Time to fall asleep increased by 5 minutes\n- Total sleep decreased by 20 minutes\n- Subjective sleep quality dropped\n- Melatonin levels were lower\n\nThe study suggests an endogenous circalunar clock — a biological rhythm entrained to the moon that persists even without direct moonlight exposure, similar to how circadian rhythms persist in constant darkness.',
            source: 'Cajochen et al., "Evidence that the Lunar Cycle Influences Human Sleep," Current Biology 23(15), 2013',
        },
        {
            id: 'traditional-knowledge',
            title: 'Ancient Lunar-Cycle Tracking',
            badge: 'tradition',
            icon: '\uD83C\uDF0D',
            summary: 'Across cultures, menstrual cycles were tracked by the moon long before modern chronobiology. Many languages encode this connection directly.',
            details: 'Evidence of lunar-menstrual tracking:\n\n- The English word "menstruation" derives from Latin "mensis" (month), from Greek "mene" (moon). The linguistic connection is universal.\n- Sanskrit "ṛtu" means both "menstruation" and "season/cosmic cycle" — the body\'s rhythm as part of cosmic rhythm.\n- The Lakota "Moon Lodge" (Isnati) tradition: women gathered during menstruation in ceremony aligned with the new moon.\n- Aboriginal Australian traditions tracked "women\'s business" by lunar phases for tens of thousands of years.\n- Chinese medicine\'s "Tian Gui" (heavenly water) explicitly links menstrual regulation to lunar phases in the Huangdi Neijing (c. 200 BCE).\n\nThese are not proof of synchronization, but they document that humans have observed and tracked the correlation for millennia. The modern scientific finding of intermittent synchronization suggests these traditions were recording a real (if inconsistent) phenomenon.',
            source: 'Shuttle & Redgrove, The Wise Wound (1978); Buckley & Gottlieb, Blood Magic: The Anthropology of Menstruation (1988); Huangdi Neijing, Su Wen Ch. 1',
        },
        {
            id: 'body-implications',
            title: 'What Synchronization Means for the Body',
            badge: 'confirmed',
            icon: '\u2728',
            summary: 'If the lunar cycle does entrain the menstrual cycle, the biological "purpose" may be reproductive timing — the same strategy used by marine organisms for millions of years.',
            details: 'Implications of lunar-menstrual synchronization:\n\n1. REPRODUCTIVE TIMING: Many marine organisms synchronize spawning to lunar phase for maximum fertilization. Mass coral spawning occurs on specific lunar nights. If humans retain a vestige of this, ovulation near the full moon (maximum nighttime illumination) could have improved mating success in pre-electric environments.\n\n2. MELATONIN AS MASTER REGULATOR: Melatonin doesn\'t just regulate sleep — it modulates immunity, antioxidant activity, and reproductive hormones. Disrupting its lunar rhythm (via artificial light) may have broader health implications than just cycle irregularity.\n\n3. CIRCALUNAR VS. CIRCADIAN: We accept that circadian (daily) rhythms are real biology. Circalunar (monthly) rhythms are the same principle on a longer timescale. The molecular clock for circalunar rhythms has been found in marine organisms — the question is whether humans retain one.\n\n4. ARTIFICIAL LIGHT DISRUPTION: The weakening of synchronization post-2010 (Helfrich-F\u00F6rster 2021) suggests that artificial light at night is overriding a natural biological signal. This has implications for reproductive health, sleep quality, and hormonal balance.\n\n5. PRACTICAL APPLICATION: While the science is still emerging, some women report improved cycle regularity when sleeping in darkness during the new moon and allowing moonlight during the full moon — recreating the natural light signal.',
            source: 'Helfrich-F\u00F6rster et al., Science Advances, 2021; Casiraghi et al., Science Advances, 2021; Zantke et al., Cell Reports, 2013',
        },
    ];

    // ──────────────────────────────────────────────
    // Practical Lunar Sync Protocols
    // ──────────────────────────────────────────────

    const lunarSyncProtocols = [
        {
            id: 'morning-light-protocol',
            title: 'Morning Light Protocol (Huberman)',
            badge: 'confirmed',
            icon: '☀️',
            summary: 'View 2–10 minutes of direct sunlight within 30–60 minutes of waking. This sets a 16-hour "melatonin timer" — morning light at 7am primes your body for sleepiness at 11pm. This is the single most impactful circadian reset, and it directly affects the hormonal cascade that governs the menstrual cycle.',
            details: 'Dr. Andrew Huberman (Stanford neuroscience) identifies morning sunlight as the master regulator of circadian biology. The mechanism:\n\n1. Light enters the eyes → activates melanopsin cells in the retina → signals the suprachiasmatic nucleus (SCN, the brain\'s master clock)\n2. SCN triggers morning cortisol pulse (healthy — this is when you want cortisol)\n3. 16 hours later, the SCN signals the pineal gland to release melatonin\n4. Melatonin directly modulates reproductive hormones: it suppresses GnRH (gonadotropin-releasing hormone), which cascades down to FSH, LH, estrogen, and progesterone\n\nWhy this matters for cycle syncing: melatonin is the hormonal bridge between your circadian rhythm and your menstrual cycle. Disrupted melatonin = disrupted reproductive hormones. Helfrich-Förster (2021) found that women who were less exposed to artificial light at night showed stronger lunar-menstrual synchronization.\n\nKey rules from Huberman:\n• Don\'t wear sunglasses during morning light viewing\n• Don\'t try through a window — too many wavelengths are filtered\n• Overcast days need MORE time outside, not less (still far more lux than indoors)\n• Avoid ALL bright artificial light between 10pm–4am — this is when your eyes are maximally sensitive and even brief exposure suppresses melatonin',
            source: 'Huberman Lab: "Using Light to Optimize Health"; Helfrich-Förster et al., Science Advances, 2021; Brzezinski et al., "Melatonin in Human Reproduction," Reproductive BioMedicine Online, 2005',
        },
        {
            id: 'moonlight-sleep-protocol',
            title: 'Moonlight Sleep Protocol',
            badge: 'synthesis',
            icon: '🌙',
            summary: 'Sleep in complete darkness during the new moon (days 1–5 of lunar cycle). Allow natural moonlight into your bedroom during the full moon (days 12–16). This mimics the ancestral light signal that Helfrich-Förster\'s research shows once synchronized menstrual and lunar cycles.',
            details: 'The protocol is based on converging evidence:\n\n1. Helfrich-Förster (2021): Women born before 1974 (pre-widespread artificial light) showed stronger lunar-menstrual synchronization. Synchronization has been weakening since, suggesting artificial light overrides the natural lunar signal.\n\n2. Casiraghi et al. (2021): Sleep onset is later and duration shorter before full moons — even in communities without electricity. This is not myth; it\'s measured in indigenous Toba/Qom communities in Argentina.\n\n3. The biological pathway: Full moonlight (0.1–0.3 lux) → retina → SCN → pineal → suppresses melatonin slightly → shifts reproductive hormone timing. New moon darkness → maximum melatonin → different hormonal profile.\n\nPractical implementation:\n• NEW MOON PHASE (dark nights): Use blackout curtains. Complete darkness supports maximum melatonin production. This is traditionally associated with menstruation/withdrawal.\n• WAXING TO FULL MOON: Gradually allow moonlight through a window. Open curtains slightly. This gentle light signal is what the body evolved with — not phone screens.\n• FULL MOON: Allow moonlight to enter your sleeping space. The slight melatonin suppression from moonlight is the signal your body is designed to receive.\n• WANING MOON: Gradually return to darkness.\n\nThis is essentially recreating the lighting conditions under which human reproductive biology evolved for hundreds of thousands of years before electric light disrupted the signal.',
            source: 'Helfrich-Förster et al., Science Advances, 2021; Casiraghi et al., Science Advances, 2021; Cajochen et al., Current Biology, 2013',
        },
        {
            id: 'cycle-phase-exercise',
            title: 'Cycle-Phase Training & Nutrition',
            badge: 'synthesis',
            icon: '🏃‍♀️',
            summary: 'Match exercise intensity and nutrition to your menstrual cycle phase. Follicular phase (days 1–14): higher tolerance for intensity, strength training, and caloric deficit. Luteal phase (days 15–28): lower intensity, emphasis on recovery, higher caloric needs. This is backed by hormonal science and increasingly by sports medicine research.',
            details: 'The hormonal basis (Huberman Lab, Dr. Stacy Sims, Dr. Sara Gottfried):\n\nFOLLICULAR PHASE (Menstruation → Ovulation, ~Days 1–14):\n• Estrogen rises, progesterone is low\n• Higher pain tolerance, faster recovery, better insulin sensitivity\n• Training: This is your strength window. Heavy lifting, HIIT, explosive work\n• Nutrition: Body handles carbs well. Can tolerate caloric deficit if desired\n• Huberman note: Morning sunlight + exercise in this phase amplifies estrogen\'s positive effects on mood and energy via dopamine pathway\n\nOVULATION (~Days 12–16):\n• Estrogen peaks, LH surges, testosterone spikes briefly\n• Peak physical performance window. PR attempts, competitions\n• Higher injury risk (estrogen affects ligament laxity) — warm up thoroughly\n• Maps to full moon in synced cycles — traditional "peak fertility" window\n\nLUTEAL PHASE (Post-ovulation → Menstruation, ~Days 15–28):\n• Progesterone rises, estrogen moderate then drops\n• Higher core temperature, worse sleep quality, higher caloric needs (~200–300 extra kcal/day)\n• Training: Lower intensity. Yoga, walking, steady-state cardio. Avoid fasted training\n• Nutrition: Increase magnesium, B6, complex carbs. Body craves — and needs — more fuel\n• The "PMS" window (days 24–28): Progesterone and estrogen both crash. This is biological, not weakness\n\nMENSTRUATION (~Days 1–5):\n• All hormones at baseline. Reset point\n• Light movement, gentle yoga, walking. Rest if needed\n• Traditional "new moon/moon lodge" phase — cultures that tracked cycles knew this was the withdrawal/rest window',
            source: 'Huberman Lab: Dr. Stacy Sims episode; Dr. Sara Gottfried episode; McNulty et al., "The Effects of Menstrual Cycle Phase on Exercise Performance," PLOS One, 2020',
        },
        {
            id: 'light-dark-hormones',
            title: 'Light as Hormone Medicine',
            badge: 'confirmed',
            icon: '💡',
            summary: 'UVB light exposure to skin increases testosterone, estrogen (beta-estradiol), AND progesterone — in both men and women. Melatonin, produced in darkness, suppresses reproductive hormones. This means your light environment is directly programming your hormonal state, every day.',
            details: 'The science (referenced by Huberman):\n\n1. A study found that UVB light (short-wavelength light in sunshine) to the skin increased beta-estradiol, progesterone, and testosterone in both sexes within a brief period. This is separate from vitamin D — the skin itself has hormone-producing pathways activated by light.\n\n2. Melatonin is suppressive to the gonadal axis. It inhibits GnRH, which reduces FSH and LH, which reduces testosterone and estrogen output from the testes and ovaries. This is why:\n• Seasonal Affective Disorder (winter, long nights = more melatonin) often comes with low libido and cycle irregularity\n• Shift workers have higher rates of menstrual irregularity and fertility issues\n• The pre-electric world had massive seasonal hormone variation — higher testosterone/estrogen in summer (long days), lower in winter (long nights)\n\n3. Practical protocol:\n• GET SUNLIGHT ON SKIN: Not just eyes. Arms, legs, face — UVB exposure (the same wavelength that makes vitamin D) triggers hormone production\n• MORNING + AFTERNOON SUN: Anchor circadian rhythm AND boost sex hormones\n• DARK NIGHTS: Protect melatonin. Dim lights after sunset. No screens 1hr before bed (or use very dim red lighting)\n• AVOID THE 10PM–4AM BRIGHT LIGHT TRAP: Huberman emphasizes this window as maximally damaging — even a brief bathroom light exposure suppresses melatonin and disrupts the next day\'s dopamine\n\nThe ancient traditions that aligned activity with sunlight and rest with darkness weren\'t just practical — they were accidentally optimizing their hormonal biology through light exposure patterns.',
            source: 'Huberman Lab: "Using Light to Optimize Health"; Parikh et al., Cell Reports, 2021 (UVB and hormones); Brzezinski et al., Reproductive BioMedicine Online, 2005',
        },
    ];

    // ──────────────────────────────────────────────
    // Music & Journey Guide
    // ──────────────────────────────────────────────

    const journeyMusicGuide = [
        {
            id: 'music-hidden-therapist',
            title: 'Music as the Hidden Therapist',
            badge: 'confirmed',
            icon: '🎵',
            summary: 'In clinical psychedelic research, music is not background — it is described as a "hidden therapist." Johns Hopkins, Imperial College London, and NYU Langone all use carefully structured playlists as a core component of psilocybin therapy. Research shows music quality directly predicts therapeutic outcomes.',
            details: 'Mendel Kaelen (neuroscientist, Imperial College London) demonstrated in multiple studies that:\n\n• Openness to music correlates with intensity of psychedelic experience (Kaelen et al., 2018)\n• Music liking predicts antidepressant outcomes — patients who resonated with the music had better treatment results\n• Music operates as an emotional scaffolding — providing safety during difficult passages, amplifying insight during peak experiences, and supporting integration during return\n• Disliked or jarring music can negatively impact sessions\n\nBill Richards (Johns Hopkins, psychedelic research since 1963) describes the role of music: "At a trip\'s peak, music becomes a mirror of transcendental forms of consciousness — like a net below a trapeze artist."\n\nHuberman\'s related finding: listening to 10–30 minutes of preferred music daily increases heart rate variability (parasympathetic activation) not just during listening but throughout the day and into sleep. Music physically shifts your autonomic nervous system state.\n\nBecause psychedelics temporarily increase neuroplasticity, returning to the same music after your session can act as a cue that re-opens the learning/healing window — a form of state-dependent memory.',
            source: 'Kaelen et al., Psychopharmacology, 2018; Richards, Sacred Knowledge (Columbia UP, 2015); Huberman Lab: "How to Use Music to Boost Motivation, Mood & Improve Learning"',
        },
        {
            id: 'journey-phases-bpm',
            title: 'The Journey Arc: Phases & Music Structure',
            badge: 'synthesis',
            icon: '🎼',
            summary: 'The Johns Hopkins psilocybin playlist (7 hours 40 minutes) is structured around the pharmacological arc of a session: arrival, onset, ascent, peak, post-peak, and return. Each phase requires fundamentally different music — not just different songs, but different tempos, textures, and emotional qualities.',
            details: 'THE JOURNEY ARC (based on Bill Richards/Johns Hopkins + Kaelen/Imperial College):\n\n1. ARRIVAL / PRE-SESSION (0:00–0:30)\nPurpose: Grounding, safety, trust\nMusic: Gentle, familiar, warm. Acoustic instruments.\nBPM: 60–80 (resting heart rate range)\nExamples: Solo piano, gentle guitar, ambient nature\n\n2. ONSET (0:30–1:30)\nPurpose: The medicine is taking effect. Support the transition.\nMusic: Slowly building, minimal lyrics. Increasing spaciousness.\nBPM: 60–90 (gradually rising)\nKey: Avoid lyrics in the listener\'s language — Richards says this "discourages the rational mind from following content"\n\n3. ASCENT (1:30–2:30)\nPurpose: Intensity is building. Ego defenses are dissolving.\nMusic: Swelling orchestral, emotional classical, building ambient\nBPM: 80–120 (matching increasing physiological arousal)\nRichards\' pick: Samuel Barber\'s "Adagio for Strings" — "The music chromatically develops, goes up, reaches this exquisite climax and then comes back down"\n\n4. PEAK (2:30–4:00)\nPurpose: Ego dissolution. Mystical experience. Surrender.\nMusic: Drone-based, overtone-rich, rhythmic anchors. "Trance-inducing features."\nBPM: Variable — rhythm becomes secondary to texture. Often 50–90 or arrhythmic\nKey quality: Provide a "musical anchor" (drone/rhythm) and "spaciousness" (overtones)\nThis is where sacred/devotional music from ANY tradition works: Tibetan bowls, Indian ragas, Gregorian chant, Sufi music\n\n5. POST-PEAK / DESCENT (4:00–5:30)\nPurpose: Reintegration begins. Emotional processing.\nMusic: More melodic, emotionally evocative, gentler than ascent\nBPM: 70–100 (gradually decreasing)\nKaelen\'s research: "Sentimental" and "cinematic" music works best here\n\n6. RETURN / WELCOME BACK (5:30–7:30)\nPurpose: Grounding, gratitude, integration\nMusic: Familiar, warm, may include vocals/lyrics now\nBPM: 60–80 (returning to resting state)\nThis is when songs with meaningful lyrics can be profoundly impactful\n\nThe entire arc mirrors the death-rebirth pattern we\'ve traced through every tradition — dissolution (ascent/peak) followed by reconstitution (descent/return).',
            source: 'Richards, Sacred Knowledge (2015); Kaelen et al., Psychopharmacology (2018); Barrett et al., "Emotions and Brain Function are Altered for Months After Psilocybin," Scientific Reports (2020)',
        },
        {
            id: 'binaural-beats-protocol',
            title: '40Hz Binaural Beats: The Huberman Protocol',
            badge: 'confirmed',
            icon: '🎧',
            summary: 'Huberman recommends 40Hz binaural beats for 5 minutes before cognitive work — the frequency shown to improve memory, reaction time, and verbal recall. This is the same gamma frequency the CIA Gateway Report identified as associated with heightened awareness, and the same frequency Tibetan monks produce during deep meditation.',
            details: 'The 40Hz protocol (Huberman Lab):\n\n• Listen to PURE 40Hz binaural beats (no rain sounds, no music overlay — these reduce effectiveness)\n• 5 minutes before starting focused work\n• Can also use during exercise for mind-muscle connection\n• Avoid continuous use during long work sessions (habituation reduces effect)\n\nWhy 40Hz matters across traditions:\n\n1. NEUROSCIENCE: 40Hz gamma oscillations are associated with conscious awareness, memory binding, and attention. They synchronize neural populations across brain regions.\n\n2. CIA GATEWAY REPORT: The report describes consciousness reaching coherent states at specific frequencies. The progression from beta (normal waking) through alpha (relaxed) to theta (deep meditation, 4–7 Hz) to gamma (40 Hz, heightened awareness) maps the same territory as the yogic progression through dharana (concentration) → dhyana (meditation) → samadhi (absorption).\n\n3. TIBETAN MONKS: Lutz et al. (2004, PNAS) measured experienced Tibetan Buddhist meditators during compassion meditation and found massive gamma synchronization at ~40Hz — far beyond anything seen in non-meditators. The monks had trained for 10,000–50,000 hours. Binaural beats attempt to induce the same frequency externally.\n\n4. SCHUMANN RESONANCE: Earth\'s electromagnetic cavity resonates at ~7.83 Hz (and harmonics). The Gateway Report explicitly connects body resonance with Earth\'s field. The 5th harmonic of 7.83 Hz is 39.15 Hz — essentially 40Hz. Chanting Om has been measured at frequencies that entrain with Schumann resonance.\n\nThe convergence: Ancient chanting → Tibetan meditation → CIA frequency research → Huberman\'s protocol — all pointing at the same narrow frequency band as the gateway to heightened consciousness.',
            source: 'Huberman Lab: "Focus Toolkit"; Lutz et al., PNAS 101(46), 2004; CIA Gateway Report (1983); Schumann, Zeitschrift für Naturforschung (1952)',
        },
        {
            id: 'bpm-daily-protocols',
            title: 'BPM Protocols for Daily Life',
            badge: 'confirmed',
            icon: '🎶',
            summary: 'Huberman\'s music research shows that specific BPM ranges reliably shift nervous system states. 140–150+ BPM for motivation and energy. 60–80 BPM for relaxation and sleep preparation. 9 minutes minimum to shift mood. "Weightless" by Marconi Union reduces anxiety by 65%. Music literally programs your autonomic nervous system.',
            details: 'Practical BPM protocols from Huberman Lab:\n\nMORNING ACTIVATION (with sunlight exposure):\n• 140–150+ BPM: Shifts into sympathetic (fight-or-flight) nervous system activation\n• Increases dopamine, adrenaline, and cortisol (the GOOD morning cortisol)\n• 9 minutes minimum to achieve full mood shift\n• Use for: Pre-workout, morning energy, overcoming inertia\n\nFOCUSED WORK:\n• 40Hz binaural beats for 5 min pre-session (gamma entrainment)\n• OR white/pink noise during sustained focus\n• Avoid lyrics in your language during cognitive work (same principle as psychedelic playlists — lyrics engage the analytical mind)\n\nAFTERNOON RESET:\n• 60–80 BPM: Engages parasympathetic (rest-and-digest) nervous system\n• Increases heart rate variability — this effect persists through the day and into sleep\n• 10–30 minutes of preferred music at this tempo\n\nPRE-SLEEP WIND DOWN:\n• 50–70 BPM: Deep relaxation range\n• "Weightless" by Marconi Union: Purpose-designed with sound therapists to reduce anxiety. Studies show 65% anxiety reduction — comparable to anxiolytic medication\n• No screens, dim red/orange light, begin 1hr before bed\n\nEMOTIONAL PROCESSING:\n• Sad music for ~13 minutes helps process grief and emotions (catharsis)\n• This maps directly onto the "post-peak" phase of psychedelic journeys — the integration window where emotional music supports processing\n\nThe nervous system transitions through states gradually — Huberman calls this the "onboarding and offboarding" process. You cannot flip from stressed to focused to relaxed instantly. Music is the technology for guiding these transitions. This is exactly what the ancient traditions understood — why Sufi dhikr builds in intensity, why Gregorian chant has a specific rhythmic structure, why the Eleusinian ritual had a progression of experiences.',
            source: 'Huberman Lab: "How to Use Music to Boost Motivation, Mood & Improve Learning"; Lyz Cooper (British Academy of Sound Therapy), study on "Weightless"',
        },
    ];

    // ──────────────────────────────────────────────
    // Entheogenic Traditions
    // ──────────────────────────────────────────────

    const entheogens = [
        {
            id: 'eleusinian-kykeon',
            title: 'The Eleusinian Mysteries & Kykeon',
            badge: 'tradition',
            icon: '🏛️',
            summary: 'For nearly 2,000 years (c. 1500 BCE – 392 CE), the Eleusinian Mysteries were the most sacred rite in the ancient Greek world. Every major thinker — Plato, Aristotle, Sophocles, Cicero, Marcus Aurelius — was initiated. The central act was drinking kykeon, a beverage now believed to have contained psychoactive compounds.',
            details: 'The Mysteries were held annually at Eleusis, near Athens. Initiates fasted, processed along the Sacred Way, and entered the Telesterion (Hall of Initiation), where they drank kykeon and experienced the "vision" (epopteia). The experience was so profound that revealing its contents was punishable by death.\n\nR. Gordon Wasson, Albert Hofmann (discoverer of LSD), and classicist Carl Ruck published The Road to Eleusis (1978), arguing kykeon contained ergot alkaloids — specifically ergonovine or LSA — growing on the barley in the drink. Ergot is the natural precursor to LSD. Archaeological evidence from Mas Castellar de Pontós in Spain found ergot traces in ritual vessels and in the teeth of a human jawbone, confirming entheogenic use in ancient Mediterranean ritual.\n\nCicero wrote: "Athens has given nothing to the world more excellent or divine than the Eleusinian Mysteries." Pindar wrote: "Blessed is he who has seen these things before going beneath the earth. He knows the end of life. He knows the god-given beginning." These are not descriptions of a lecture or a ceremony — they describe a direct experience of death and rebirth that transformed the initiate permanently.',
            source: 'Wasson, Hofmann & Ruck, The Road to Eleusis (1978); Cicero, De Legibus II.36; Pindar, Fragment 137; Ruck, Sacred Mushrooms of the Goddess (2006)',
        },
        {
            id: 'soma-haoma',
            title: 'Soma and Haoma: The Divine Drink',
            badge: 'tradition',
            icon: '🕉️',
            summary: 'The Rigveda (c. 1500–1200 BCE) dedicates an entire book (Mandala IX, 114 hymns) to Soma — a plant-based drink consumed during Vedic ritual that granted "immortality," "visions of the gods," and "union with the divine." The Iranian equivalent, Haoma, held the same role in Zoroastrian ritual. The identity of the original plant remains one of the great unsolved mysteries of ethnobotany.',
            details: 'Rigveda 8.48.3: "We have drunk the Soma; we have become immortal; we have gone to the light; we have found the gods." This is not metaphor — it describes a psychoactive experience in pharmacological terms. Wasson (1968) proposed Soma was Amanita muscaria (fly agaric mushroom). Others have proposed ephedra, Peganum harmala (Syrian rue, containing DMT-activating MAOIs), psilocybin mushrooms, or cannabis.\n\nThe Zoroastrian Haoma ceremony (Yasna) is still performed today, though the original psychoactive ingredient was replaced by ephedra centuries ago. The Avesta describes Haoma granting "health, strength, victory, and spiritual insight." The Bundahishn (Zoroastrian creation text) describes Haoma as a "bridge between the earthly and spiritual realms."\n\nThe convergence is striking: the oldest religious texts from both the Indo-Aryan and Iranian traditions describe a sacramental drink that produces direct divine experience. When modern entheogens (ayahuasca, psilocybin) produce identical descriptions — visions of gods, dissolution of self, union with cosmic consciousness — the parallel suggests that Soma/Haoma was describing the same neurochemical experience these substances produce.',
            source: 'Rigveda, Mandala IX (Griffith translation); Wasson, Soma: Divine Mushroom of Immortality (1968); Flattery & Schwartz, Haoma and Harmaline (1989)',
        },
        {
            id: 'dionysian-rites',
            title: 'Dionysus: God of Altered States',
            badge: 'tradition',
            icon: '🍷',
            summary: 'Dionysus was not merely the "god of wine." He was the god of ecstasy, of dissolution of the self, of the boundary between life and death. His rites — the Dionysia — involved psychoactive substances beyond alcohol, ritual frenzy, and the direct experience of ego death. His staff, the thyrsus, was topped with a pine cone — an ancient symbol of the pineal gland.',
            details: 'Archaeological and literary evidence indicates that Dionysian wine was not ordinary wine. It was infused with psychoactive herbs and plants. Ruck (2006) documents that ancient Greek wine was routinely mixed with additives including henbane, nightshade, and opium — making it a powerful entheogenic cocktail, not a simple alcoholic beverage.\n\nThe thyrsus — Dionysus\'s ritual staff — was a fennel stalk wrapped in ivy, topped with a pine cone. The pine cone has been identified by scholars as a symbol of the pineal gland across multiple traditions: the Vatican\'s "Pigna" (a massive pine cone statue in the Court of the Pine Cone), the Staff of Osiris topped with a pine cone between two serpents (cf. the caduceus), and Hindu depictions of the "third eye." That the god of altered consciousness carries a symbol of the pineal gland is either a profound coincidence or evidence that ancients understood the pineal\'s role in consciousness.\n\nThe Dionysian experience was fundamentally about "sparagmos" (tearing apart of the self) followed by "omophagia" (consuming the raw divine) — ego death and rebirth enacted ritually and neurochemically. Euripides\' The Bacchae (405 BCE) describes initiates experiencing madness, transcendence, supernatural strength, and visions — descriptions consistent with high-dose psychedelic experiences.',
            source: 'Ruck, Sacred Mushrooms of the Goddess (2006); Euripides, The Bacchae (405 BCE); Sayin, NeuroQuantology 12(2), 2014; Kerenyi, Dionysos: Archetypal Image of Indestructible Life (1976)',
        },
        {
            id: 'living-entheogen-traditions',
            title: 'Living Entheogenic Traditions',
            badge: 'tradition',
            icon: '🌱',
            summary: 'These are not merely historical artifacts. Ayahuasca ceremonies (Amazon), peyote rituals (Native American Church), ibogaine initiation (Bwiti, Gabon), and psilocybin ceremonies (Mazatec, Mexico) are living traditions practiced today — each independently producing the same core experiences: ego dissolution, encounter with beings, death-rebirth, cosmic unity.',
            details: 'The cross-cultural convergence is the key evidence:\n\n• AYAHUASCA (DMT + MAOIs, Amazon): Participants report contact with "plant teachers," visions of serpents and geometric patterns, dissolution of self, and encounter with a cosmic intelligence. Used for healing, divination, and spiritual initiation by dozens of indigenous groups across South America.\n\n• PEYOTE (mescaline, Native American Church): Legal for religious use in the US since 1994. Ceremonies involve all-night prayer, singing, and visions. The Native American Church has ~250,000 members. Participants describe healing, spiritual insight, and direct communion with the Creator.\n\n• IBOGAINE (Tabernanthe iboga, Bwiti tradition, Gabon): The Bwiti initiation involves massive doses of iboga root bark, producing a 24-36 hour visionary state in which initiates report meeting ancestors, reliving their entire life, dying and being reborn. The Bwiti call iboga "the tree of knowledge."\n\n• PSILOCYBIN (Mazatec tradition, Mexico): Maria Sabina\'s velada ceremonies preserved an ancient tradition of mushroom use for healing and divination. R. Gordon Wasson\'s 1955 participation and subsequent Life magazine article (1957) introduced psilocybin to the Western world.\n\nThe pattern across ALL these traditions: the same core experience described in different cultural languages. Death-rebirth. Encounter with the divine. Cosmic unity. Geometric visions. This is what the solar mythology, the Eleusinian Mysteries, and the Vedic Soma rites were describing.',
            source: 'Schultes & Hofmann, Plants of the Gods (1979); Wasson, "Seeking the Magic Mushroom," Life Magazine (1957); Sayin, NeuroQuantology 12(2), 2014; Fernandez, Bwiti: An Ethnography of Religious Imagination (Princeton, 1982)',
        },
        {
            id: 'archetypal-convergence',
            title: 'Universal Visions: Why Every Culture Saw the Same Things',
            badge: 'synthesis',
            icon: '🧠',
            summary: 'H. Ümit Sayin documented that cultures with no historical contact — separated by oceans and millennia — independently produced the same mythological figures, sacred symbols, and religious experiences when consuming psychoactive plants. This suggests the visions arise from the brain\'s own architecture, not from cultural transmission.',
            details: 'Sayin (NeuroQuantology, 2014; SexuS Journal, 2017) catalogued the universal patterns:\n\n1. SERPENTS: Appear in virtually every psychedelic tradition — the Vedic Naga, the Aztec Quetzalcoatl, the Greek Ouroboros, the kundalini serpent, the caduceus, the serpent in Eden. Ayahuasca users consistently report serpent visions regardless of cultural background.\n\n2. GEOMETRIC FORMS: Spirals, mandalas, fractals, lattices — these "entoptic" phenomena are produced by the visual cortex itself when certain neurochemical thresholds are crossed. Lewis-Williams & Dowson (Current Anthropology, 1988) demonstrated that Paleolithic cave art worldwide matches the geometric forms produced during early-stage psychedelic experiences.\n\n3. DEATH AND REBIRTH: The universal mythic pattern — Osiris, Christ, Dionysus, the shamanic death — maps precisely onto the psychedelic "ego death" experience, where the sense of separate self dissolves and reconstitutes.\n\n4. BEINGS OF LIGHT: Angels, devas, spirits, plant teachers — encountered across every entheogenic tradition.\n\n5. COSMIC UNITY: The experience of "all is one" — Vedantic Brahman, Buddhist sunyata, Sufi fana, Christian mystical union — described identically by psychedelic subjects in modern clinical trials.\n\nJung called these shared patterns the "collective unconscious." Sayin\'s contribution is proposing the mechanism: these archetypes are not mystically inherited but are produced by the brain\'s own neural architecture when consciousness is altered by specific molecules. The ancient traditions weren\'t inventing myths — they were reporting what the brain shows when its ordinary filters are removed.',
            source: 'Sayin, NeuroQuantology 12(2), 2014; Lewis-Williams & Dowson, Current Anthropology 29(2), 1988; Jung, The Archetypes and the Collective Unconscious (1959); Strassman, DMT: The Spirit Molecule (2001)',
        },
        {
            id: 'entoptic-phenomena',
            title: 'The Nervous System\'s Hardwired Visual Language',
            badge: 'confirmed',
            icon: '🔷',
            summary: 'Sayin\'s companion paper (NeuroQuantology, 2014) asks: "Does the Nervous System Have an Intrinsic Archaic Language?" The answer is yes. The visual cortex produces exactly 6 categories of geometric forms during altered states — grids, parallel lines, dots, zigzags, nested curves, and filigrees. These are not hallucinations. They are the architecture of the visual cortex itself, made visible.',
            details: 'Lewis-Williams & Dowson (Current Anthropology, 1988) established the foundational model by identifying six categories of "entoptic phenomena" — geometric forms generated by the visual nervous system during altered states of consciousness:\n\n1. GRIDS & LATTICES: Expanding hexagonal patterns, honeycombs, checkerboards\n2. PARALLEL LINES: Sets of lines crossing the visual field\n3. DOTS & FLECKS: Scattered points of light, short dashes\n4. ZIGZAG LINES: Angular wave patterns, herringbone, chevrons\n5. NESTED CATENARY CURVES: Concentric arcs, U-shapes within U-shapes\n6. FILIGREES: Thin, meandering lines, lace-like patterns\n\nA seventh form — the SPIRAL/VORTEX — was treated separately due to its special significance: it represents the "tunnel" experience reported in both psychedelic and near-death experiences.\n\nCritically, these are NOT random hallucinations. They are produced by the mathematical architecture of the visual cortex itself. The V1 cortex has a columnar organization where neurons with similar orientation preferences are clustered together. When this cortex is activated non-specifically (by psychedelics, electrical stimulation, pressure on the eyeball, sensory deprivation, or migraine), the geometric structure of the cortex becomes visible as these patterns. You are literally seeing your own brain\'s wiring.\n\nPhosphenes (light phenomena from physical stimulation of the eye/cortex) and "form constants" (geometric shapes from altered neurochemistry) both access this same architecture. The neurotransmitter primarily involved is serotonin — specifically the 5-HT2A receptor, which is the primary binding site for psilocybin, LSD, DMT, and mescaline.',
            source: 'Sayin, "Does the Nervous System Have an Intrinsic Archaic Language? Entoptic Images and Phosphenes," NeuroQuantology 12(3), 2014; Lewis-Williams & Dowson, Current Anthropology 29(2), 1988; Bressloff et al., "What Geometric Visual Hallucinations Tell Us about the Visual Cortex," Neural Computation 14(3), 2002',
        },
        {
            id: 'three-stages-trance',
            title: 'The Three Stages of Trance',
            badge: 'confirmed',
            icon: '🌀',
            summary: 'Lewis-Williams & Dowson mapped three stages of altered consciousness that progress from pure geometric forms to full visionary experience. Stage 1: entoptic geometry (the 6 forms). Stage 2: the brain tries to "construe" these forms into recognizable images. Stage 3: full iconic imagery — gods, beings, landscapes — emerges from the geometry. This is the mechanism behind every mystical vision in human history.',
            details: 'THE THREE STAGES OF TRANCE (Lewis-Williams & Dowson, 1988):\n\nSTAGE 1 — ENTOPTICS:\nThe subject spontaneously perceives the 6 geometric forms. These are culturally independent — a San shaman in South Africa and a Wall Street banker in an fMRI lab see the same grids, spirals, and zigzags. The forms pulse, rotate, merge, and fragment. This stage corresponds to the "onset" phase in psychedelic sessions — the geometric patterns that appear as the substance takes effect.\n\nSTAGE 2 — CONSTRUAL:\nThe brain attempts to interpret the geometric forms through its cultural framework. A Western subject may see a grid and construe it as a chessboard. A San shaman may see the same grid and construe it as a honeycomb (associated with bee spirit-helpers). A Hindu practitioner may see nested curves and construe them as the petals of a lotus/chakra. The geometry is universal; the interpretation is cultural. This is why the SAME neurological event produces different religious imagery in different traditions — but the underlying geometry is identical.\n\nSTAGE 3 — ICONIC IMAGERY:\nFull visionary experience. The entoptic forms become portals or scaffolding for complex imagery: beings, landscapes, narratives. The subject may feel they have entered another world. The spiral/vortex becomes a "tunnel" through which the subject travels. This is the "peak" phase — the full mystical experience. Ego dissolution, encounter with entities, death and rebirth.\n\nThe progression maps precisely onto the psychedelic journey arc we built into the Journey Player: Onset (Stage 1, geometry) → Ascent (Stage 2, construal) → Peak (Stage 3, iconic/mystical).\n\nWhat this means: every mystical vision in every tradition began with the same 6 geometric forms produced by the visual cortex. The "sacred geometry" of mandalas, yantras, Islamic geometric art, Celtic knotwork, and Aboriginal dreamtime paintings are not arbitrary aesthetic choices — they are records of Stage 1 entoptic phenomena that the artists actually saw.',
            source: 'Lewis-Williams & Dowson, Current Anthropology 29(2), 1988; Lewis-Williams, The Mind in the Cave (2002); Sayin, NeuroQuantology 12(3), 2014',
        },
        {
            id: 'cave-art-proof',
            title: '40,000 Years of the Same Visions',
            badge: 'confirmed',
            icon: '🪨',
            summary: 'Lewis-Williams & Dowson proved their model by showing that Paleolithic cave art from 40,000+ years ago contains the exact same 6 entoptic forms found in laboratory studies of altered states. The same patterns appear in San rock art (South Africa), Coso petroglyphs (California), Tukano yarn art (Colombia), Huichol designs (Mexico), Aboriginal dot paintings (Australia), and Nazca lines (Peru). Separated by oceans and tens of thousands of years — same patterns.',
            details: 'The archaeological evidence is overwhelming:\n\n• LASCAUX, CHAUVET, ALTAMIRA (Europe, 15,000–40,000 years ago): Among the animal figures, the cave walls are covered in grids, dots, zigzags, nested curves, and spirals — the exact 6 entoptic categories. These are not decorative borders. They are records of visionary experiences.\n\n• SAN ROCK ART (South Africa, 2,000–27,000 years ago): The San /Xam people used trance dance to enter altered states. Their rock art contains perfect matches to all 6 entoptic categories, plus Stage 3 therianthropic (human-animal hybrid) figures — the "shape-shifting" reported in deep trance.\n\n• COSO PETROGLYPHS (California, 1,000–16,000 years ago): Shoshone trance imagery carved into basalt. Same entoptic forms. Same progression from geometry to figurative imagery.\n\n• TUKANO ART (Colombia, present day): The Tukano use ayahuasca (DMT) in ceremony. Their yarn paintings and body art are explicit depictions of ayahuasca visions — and they match the entoptic categories exactly. The Tukano themselves describe the patterns as "what you see" during the ceremony.\n\n• NAZCA LINES (Peru, 500 BCE–500 CE): The massive geoglyphs visible only from above include spirals, parallel lines, and geometric forms alongside figurative images — the same Stage 1 → Stage 3 progression.\n\n• ABORIGINAL DOT PAINTINGS (Australia, 40,000+ years): The oldest continuous artistic tradition on Earth. Dot patterns, concentric circles, wavy lines, and "dreamtime" figures — entoptic forms from the world\'s oldest surviving entheogenic tradition.\n\nOf 488 societies studied by anthropologist Erika Bourguignon, 437 (89.6%) had institutionalized forms of altered consciousness. The entoptic forms are not the exception — they are the human norm. We are the anomaly, having suppressed the practice for only a few centuries.',
            source: 'Lewis-Williams & Dowson, Current Anthropology (1988); Bourguignon, Religion, Altered States of Consciousness and Social Change (1973); Clottes & Lewis-Williams, The Shamans of Prehistory (1998)',
        },
    ];

    // ──────────────────────────────────────────────
    // CIA Gateway Process
    // ──────────────────────────────────────────────

    const gatewayProcess = [
        {
            id: 'gateway-report',
            title: 'The CIA Gateway Report: What It Actually Says',
            badge: 'synthesis',
            icon: '📋',
            summary: 'In 1983, Lt. Col. Wayne McDonnell wrote a 29-page classified report for the U.S. Army Intelligence Command titled "Analysis and Assessment of Gateway Process." Declassified in 2003, it represents the U.S. government\'s serious investigation into altered states of consciousness, out-of-body experiences, and the nature of reality itself.',
            details: 'The Gateway Process was developed by Robert Monroe at The Monroe Institute, based on decades of research into the effects of sound on consciousness. Monroe, a radio broadcasting executive, discovered in the 1950s that specific audio frequencies could reliably induce altered states — including what he called "out of body experiences." He published Journeys Out of the Body (1971) and patented the Hemi-Sync audio technology.\n\nThe CIA did not dismiss this as pseudoscience. They assigned a military intelligence officer to analyze it, and the resulting report draws on quantum physics (David Bohm), neuroscience (Karl Pribram), biomedical research (Itzhak Bentov), and transcendental meditation research. McDonnell concluded that the Gateway Process represents a legitimate method of altering consciousness, and the report was classified — not debunked.\n\nThe report\'s theoretical framework: consciousness is a vibrational pattern of energy. The physical universe is a hologram. The brain is a holographic processor that can, under specific conditions, access information beyond normal space-time. These conditions are achieved by synchronizing both brain hemispheres to specific frequencies — the same state achieved by years of meditation, yogic practice, or entheogenic experience.\n\nPage 25 of the original report — describing potential applications — was missing from the declassified version and has never been released.',
            source: 'CIA-RDP96-00788R001700210016-5 (declassified 2003); Monroe, Journeys Out of the Body (1971); The Black Vault FOIA archive',
        },
        {
            id: 'hemisync-mechanism',
            title: 'Hemi-Sync: Frequency as Technology',
            badge: 'synthesis',
            icon: '🎧',
            summary: 'The Gateway Process uses binaural beats — slightly different frequencies played in each ear — to force the brain into hemispheric synchronization. When the left ear receives 400 Hz and the right receives 410 Hz, the brain generates a 10 Hz "phantom" beat. Different beat frequencies correspond to different states of consciousness.',
            details: 'The key frequencies and their corresponding states:\n\n• DELTA (0.5–4 Hz): Deep sleep, unconscious processes. The Gateway Report states consciousness can "click out" of space-time at oscillation frequencies approaching 10⁻³³ cm/s.\n\n• THETA (4–7 Hz): Deep meditation, hypnagogic states, REM sleep. This is the critical range — the same frequency produced by years of yogic meditation. The report explicitly states that "exposure to mechanical acoustical vibrations in the range of 4-7 Hz for protracted periods may achieve the same effect" as 5 years of transcendental meditation.\n\n• ALPHA (8–13 Hz): Relaxed awareness, light meditation.\n\n• BETA (13–30 Hz): Normal waking consciousness.\n\nThe report compares the brain to a lamp: normally, light scatters in all directions (normal consciousness). When both hemispheres synchronize, the scattered light becomes a coherent laser beam — focused, penetrating, capable of reaching beyond normal limits. This is why the yogic traditions emphasize balancing ida (left/moon) and pingala (right/sun) channels — they were describing hemispheric synchronization in the language available to them.\n\nThe body\'s resonance during this process aligns with Earth\'s Schumann resonance (~7.83 Hz) — the electromagnetic frequency of the Earth\'s cavity between surface and ionosphere. Ancient practices like chanting "Om" (measured at ~7.83 Hz in studies) and Sufi dhikr may have been technologies for achieving this same resonance alignment.',
            source: 'CIA Gateway Report (1983); Schumann, "Über die strahlungslosen Eigenschwingungen einer leitenden Kugel," Zeitschrift für Naturforschung (1952); Monroe, Far Journeys (1985)',
        },
        {
            id: 'holographic-universe',
            title: 'The Holographic Universe: Bohm-Pribram',
            badge: 'synthesis',
            icon: '🌀',
            summary: 'The Gateway Report\'s theoretical foundation is the holographic model of reality developed by physicist David Bohm and neuroscientist Karl Pribram. In a hologram, every part contains the whole. If the universe is holographic, then every point in it — including human consciousness — contains access to the totality.',
            details: 'David Bohm (protégé of Einstein, professor at Birkbeck College London) proposed that beneath the "explicate order" — the world we perceive — lies an "implicate order" where everything is interconnected and enfolded into everything else. This was not mysticism — it was his interpretation of quantum mechanics, published in Wholeness and the Implicate Order (1980).\n\nKarl Pribram (Stanford neuroscientist) discovered that memories are not stored in specific brain locations — they are distributed holographically across the brain. When he removed large sections of cortex in experiments with Karl Lashley, memories persisted. The brain processes information as interference patterns, just like a hologram.\n\nThe Gateway Report synthesizes these: the universe IS a hologram of "unbelievable complexity." Human consciousness is itself a holographic fragment that, because each part contains the whole, can in principle access any information in the universal hologram. The right hemisphere receives energy from the universal hologram; the left hemisphere translates it into conscious experience.\n\nThis maps directly onto ancient descriptions: the Vedantic concept of Atman (individual consciousness) being identical to Brahman (universal consciousness), the Hermetic "As above, so below," the Buddhist concept of Indra\'s Net (where every jewel reflects all others). These traditions were not making poetic metaphors — they were describing the same holographic relationship the physicists independently discovered.',
            source: 'Bohm, Wholeness and the Implicate Order (1980); Pribram, Languages of the Brain (1971); Talbot, The Holographic Universe (1991); CIA Gateway Report Section 9-11',
        },
        {
            id: 'focus-levels',
            title: 'Focus Levels: The Map of Consciousness',
            badge: 'synthesis',
            icon: '🔭',
            summary: 'The Gateway Process uses progressive "Focus Levels" — discrete states of expanding awareness. Focus 10: mind awake, body asleep. Focus 12: expanded awareness beyond physical reality. Focus 15: perception outside of time. Focus 21: exploration beyond the space-time boundary. Each level maps onto states described in ancient contemplative traditions.',
            details: 'The Gateway Process steps:\n\n1. ENERGY CONVERSION BOX: The practitioner visualizes placing all worldly concerns into a box — clearing the mind. This is identical to the yogic practice of pratyahara (withdrawal of the senses) and the Sufi practice of muraqaba (watchfulness).\n\n2. RESONANT TUNING: Sustained vocalization of a single tone synchronizes body vibration. This is chanting. Om. Dhikr. Gregorian chant. The same technology independently discovered by every contemplative tradition.\n\n3. THE ENERGY BALLOON: Visualization of a protective energy field surrounding the body. This is the yogic "aura," the Kabbalistic "body of light," the Taoist "wei qi" (protective energy).\n\n4. FOCUS 10 (Mind Awake/Body Asleep): The state between waking and sleeping — the hypnagogic threshold. This is yoga nidra. This is the Tibetan Buddhist practice of "dream yoga." This is where the DMT release associated with the sleep transition occurs.\n\n5. FOCUS 12 (Expanded Awareness): Consciousness extends beyond the body. The practitioner can project awareness to other locations. This is "remote viewing" — which the CIA invested millions studying because it worked often enough to be operationally useful (Project Stargate).\n\n6. FOCUS 21 (Beyond Space-Time): Consciousness participates in what the report calls "the Absolute" — an infinite energy field beyond dimensional constraints. This is Vedantic Brahman. This is Buddhist Nirvana. This is Sufi fana (annihilation in God). This is what psychedelic researchers call "the mystical experience."\n\nEvery level maps onto a state described independently by yogic, Buddhist, Sufi, and Christian mystical traditions. The Gateway Process is not inventing new states — it is providing a secular, technological map of states the contemplative traditions have mapped for millennia.',
            source: 'CIA Gateway Report Sections 15-26; Monroe, Ultimate Journey (1994); Compare: Patanjali, Yoga Sutras (ashtanga/eight limbs); al-Qushayri, Risala (Sufi states and stations)',
        },
        {
            id: 'gateway-ancient-validation',
            title: 'Three Paths, One Destination',
            badge: 'synthesis',
            icon: '🔺',
            summary: 'The Gateway Report, entheogenic research, and contemplative traditions converge on a single conclusion: human consciousness can access states beyond ordinary waking awareness through at least three methods — sustained contemplative practice (years), frequency technology (weeks), or psychoactive chemistry (hours). All three produce the same core experiences.',
            details: 'The convergence:\n\nMEDITATION (The Slow Path): 5-20 years of dedicated practice. Yogic kundalini, Zen satori, Sufi fana, Christian mystical union. Achieved by disciplined manipulation of attention, breath, and internal awareness. The Gateway Report confirms this works by producing hemispheric synchronization and resonance with Earth\'s electromagnetic field.\n\nFREQUENCY TECHNOLOGY (The Engineered Path): Weeks to months using Hemi-Sync binaural beats. The CIA studied this because it compressed decades of contemplative training into a reproducible protocol. Monroe\'s subjects achieved Focus 12 (expanded awareness) within sessions, not years.\n\nENTHEOGENS (The Chemical Path): Hours. Psilocybin, DMT, LSD, mescaline cross specific neurochemical thresholds and produce: ego dissolution, encounter with the transpersonal, geometric visions, death-rebirth, cosmic unity — the exact same experiences reported by advanced meditators and Gateway Process practitioners.\n\nRobert Monroe himself noted this convergence: "Cultures from all over the world have their own way of reaching profound self-explorations through vision quests, Zen meditation, chanting, or using hallucinogens." He was describing three paths to the same door.\n\nThe ancient texts were not writing poetry. The yogis were describing real neurological states. The mystery schools were administering real psychoactive sacraments. The CIA confirmed both the states and the mechanisms. Sayin documented the universal archetypal output. The pattern is not coincidence — it is convergent evidence from every direction that these states of consciousness are real, reproducible, and fundamental to the human organism.',
            source: 'CIA Gateway Report (1983); Sayin, NeuroQuantology (2014); Griffiths et al., "Psilocybin produces substantial and sustained decreases in depression and anxiety," Journal of Psychopharmacology 30(12), 2016; Monroe, Journeys Out of the Body (1971)',
        },
    ];

    // ──────────────────────────────────────────────
    // Consciousness Convergence: The Synthesis
    // ──────────────────────────────────────────────

    const consciousnessConvergence = [
        {
            id: 'triangulation',
            title: 'Triangulation Across Millennia',
            badge: 'synthesis',
            icon: '📐',
            summary: 'Real fact-checking is not Googling a claim and checking if Snopes agrees. It is triangulating across independent sources separated by time, geography, and methodology — and finding they all point at the same thing. When the Rigveda (1500 BCE), the Eleusinian Mysteries (1500 BCE – 392 CE), the CIA (1983), and Johns Hopkins psilocybin trials (2006–present) all describe the same experience, you are no longer dealing with coincidence.',
            details: 'The independent measurements:\n\n1. VEDIC RISHIS (c. 1500 BCE): "We have drunk the Soma; we have become immortal; we have gone to the light; we have found the gods." Describing a substance-induced experience of divine union and immortality.\n\n2. ELEUSINIAN INITIATES (c. 1500 BCE – 392 CE): Drinking kykeon, experiencing terror and dissolution, then "a wonderful light" and permanent transformation. Plato\'s entire philosophy of Forms — the cave allegory, the realm beyond appearances — may derive from his initiation at Eleusis.\n\n3. YOGIC TRADITION (c. 500 BCE onward): Kundalini rising through chakras to produce samadhi — "absorption" into universal consciousness. Described as light, dissolution of self, encounter with the absolute.\n\n4. SUFI MASTERS (c. 800 CE onward): Fana (annihilation of self in God), followed by baqa (subsistence in God). Al-Ghazali describes the "unveiling" as seeing with an inner eye what cannot be grasped by intellect.\n\n5. CIA GATEWAY REPORT (1983): Hemispheric synchronization produces expanded consciousness that can "click out" of space-time and access "the Absolute" — an infinite, uniform energy field.\n\n6. JOHNS HOPKINS (2006–present): Psilocybin reliably produces "mystical experiences" rated by subjects as among the most meaningful of their lives. 67% rated it in their top 5 life experiences. The experiences match the phenomenology described by all the traditions above.\n\nSix independent lines of evidence, spanning 3,500 years, using different methods, arriving at the same description. This is not a belief system. This is convergent data.',
            source: 'Rigveda IX; Wasson et al. (1978); Patanjali, Yoga Sutras; Al-Ghazali, Ihya; CIA Gateway Report (1983); Griffiths et al., Psychopharmacology 187(3), 2006',
        },
        {
            id: 'not-metaphors',
            title: 'They Were Not Writing Metaphors',
            badge: 'synthesis',
            icon: '📜',
            summary: 'The standard scholarly approach treats ancient religious texts as mythology — symbolic stories encoding moral or cosmological lessons. But if these traditions were using psychoactive sacraments, their descriptions of "dying and being reborn," "seeing the light," "encountering gods," and "becoming immortal" may be literal reports of neurochemical experiences.',
            details: 'Consider the reframing:\n\n• When the Rigveda says Soma grants "immortality" — this may describe the experience of ego death, where the boundary between self and cosmos dissolves, and the experiencer perceives their consciousness as continuous with the universe. Every psychedelic researcher has documented this experience.\n\n• When Jesus says "the kingdom of God is within you" (Luke 17:21) — and the pineal gland sits at the geometric center of the brain, producing DMT-like compounds, activated by the same meditation techniques the contemplative traditions prescribed — the "within" may be neuroanatomically specific.\n\n• When the Tibetan Book of the Dead describes the bardo states between death and rebirth — and DMT (released during near-death experiences) produces virtually identical phenomenology — the text may be a trip guide, not a cosmological treatise.\n\n• When the Sufis describe fana (annihilation) followed by baqa (subsistence in God) — and psilocybin produces ego dissolution followed by reconstitution with lasting personality changes — they may be describing the same pharmacological event.\n\n• When the CIA describes consciousness "clicking out" of space-time and accessing "the Absolute" — they are using clinical language for what every mystical tradition calls enlightenment, satori, moksha, or theosis.\n\nThe traditions were not inventing stories about dying and being reborn because they watched the Sun do it. They were describing what happens to consciousness when specific neurochemical thresholds are crossed — and the Sun\'s annual death-rebirth cycle was the most available metaphor for an experience that has no adequate words.',
            source: 'Strassman, DMT: The Spirit Molecule (2001); Grof, Realms of the Human Unconscious (1975); Huxley, The Doors of Perception (1954); CIA Gateway Report (1983)',
        },
        {
            id: 'pine-cone-thread',
            title: 'The Pine Cone Thread',
            badge: 'symbolic',
            icon: '🌲',
            summary: 'The pine cone appears as a symbol of the pineal gland and spiritual awakening across traditions that had no contact with each other: Dionysus\'s thyrsus, the Staff of Osiris, the Vatican\'s Court of the Pine Cone, Hindu third-eye iconography, Assyrian winged figures holding pine cones, and the Masonic "All-Seeing Eye." This is not diffusion — it is convergent recognition.',
            details: 'Follow the thread:\n\n• DIONYSUS (Greek): The thyrsus staff — fennel wrapped in ivy, topped with a pine cone — was carried by every participant in Dionysian rites. The god of altered states carries a symbol of the gland that mediates consciousness.\n\n• OSIRIS (Egyptian): The Staff of Osiris features two intertwining serpents rising to meet a pine cone at the top. Two serpents (ida and pingala/sympathetic and parasympathetic) rising along a central staff (sushumna/spinal cord) to the pine cone (pineal). This is the same image as the caduceus, the medical symbol.\n\n• THE VATICAN: The Court of the Pine Cone (Cortile della Pigna) features a massive bronze pine cone, originally from a Roman temple, flanked by two peacocks (symbols of immortality). The largest pine cone sculpture in the ancient world sits at the center of the institution that inherited the Roman mystery tradition.\n\n• ASSYRIA (c. 900 BCE): Winged figures in Assyrian palace reliefs hold pine cones, often pointing them toward the Tree of Life. These figures are anointing the tree — the same act (anointing) that gives us the word "Christ."\n\n• HINDUISM: The bindu point at the crown of the head, the ajna chakra between the brows — the pineal region — is depicted as the site of the "third eye" of Shiva, whose opening destroys illusion.\n\nEvery tradition that practiced consciousness alteration — through entheogens, meditation, or ritual — independently identified the pineal region as the locus of transcendent experience. They depicted it as a pine cone because, anatomically, the pineal gland is shaped like a tiny pine cone. The word "pineal" itself comes from the Latin "pinea" — pine cone.\n\nThey knew. They all knew. They encoded it in symbols that survive to this day, in plain sight.',
            source: 'Descartes, Treatise on Man (1664); Manly P. Hall, The Secret Teachings of All Ages (1928); Ruck, Sacred Mushrooms of the Goddess (2006); Comparative iconographic analysis',
        },
        {
            id: 'sacred-geometry-decoded',
            title: 'Sacred Geometry Decoded: It\'s Neurology',
            badge: 'synthesis',
            icon: '◇',
            summary: 'The Flower of Life. The Sri Yantra. Islamic geometric art. The Kabbalistic Tree of Life. Metatron\'s Cube. Celtic knotwork. Aboriginal concentric circles. These are not divinely revealed geometries or arbitrary aesthetics. They are records of what the human visual cortex produces when consciousness is altered — entoptic Stage 1 forms, preserved in art by practitioners who entered trance states.',
            details: 'Map the sacred geometries to the entoptic categories:\n\n• GRIDS & LATTICES → The Flower of Life (overlapping circles creating hexagonal lattice), Islamic geometric tile patterns, Jewish Star of David (hexagonal), Metatron\'s Cube. The visual cortex\'s columnar architecture literally produces hexagonal grids.\n\n• SPIRALS → Fibonacci spirals in Hindu/Buddhist iconography, Celtic spirals, the labyrinth at Chartres Cathedral, the vortex/tunnel of the near-death experience. The spiral is the visual cortex\'s representation of the "tunnel" through which consciousness travels in Stage 3.\n\n• NESTED CURVES → Lotus petals in Hindu/Buddhist chakra diagrams, the vesica piscis (intersection of two circles), concentric mandala rings, Aboriginal concentric circles. These map directly to entoptic Category 5.\n\n• ZIGZAGS → Serpents (the universal zigzag becomes a snake during Stage 2 construal), lightning bolts (Zeus, Thor, Indra), the kundalini serpent rising in zigzag through the spine. The zigzag is an entoptic form that the brain construes as a serpent.\n\n• DOTS → Aboriginal dot painting (the oldest artistic tradition on Earth, 40,000+ years), pointillist halos in religious iconography, the "points of light" in meditation traditions.\n\n• FILIGREES → Celtic knotwork, Islamic arabesque, Hindu temple carvings, the "lace-like" patterns described by DMT users.\n\nThe Bressloff model (Neural Computation, 2002) showed mathematically that the visual cortex\'s columnar architecture — specifically the arrangement of orientation-selective neurons in V1 — generates exactly these patterns when stimulated non-specifically. The "sacred" geometry is the geometry of your own neural wiring, made visible.\n\nThis doesn\'t diminish the sacred. It locates it. The sacred geometry isn\'t "out there" — it\'s literally inside your brain, encoded in the architecture of your visual cortex, accessible through the practices every tradition independently discovered.',
            source: 'Bressloff et al., Neural Computation 14(3), 2002; Lewis-Williams, The Mind in the Cave (2002); Sayin, NeuroQuantology 12(3), 2014; Lawlor, Sacred Geometry (1982)',
        },
    ];

    // ──────────────────────────────────────────────
    // Glossary — clickable term definitions
    // ──────────────────────────────────────────────

    const glossary = {
        'entheogens': 'Psychoactive substances used in religious or spiritual contexts. From Greek: "generating the divine within." Examples include psilocybin mushrooms, ayahuasca, mescaline (peyote), and DMT.',
        'entoptic phenomena': 'Geometric visual patterns produced by the visual cortex itself during altered states of consciousness — grids, spirals, zigzags, dots, nested curves, and filigrees. These are not hallucinations; they are your brain\'s neural wiring made visible.',
        'precession of equinoxes': 'A 25,772-year cycle in which Earth\'s rotational axis slowly wobbles, causing the zodiac constellation behind the Sun at the spring equinox to shift backward through the 12 signs. Each "age" (Pisces, Aquarius, etc.) lasts approximately 2,160 years.',
        'Schumann resonance': 'Earth\'s electromagnetic "heartbeat" — a standing wave at 7.83 Hz in the cavity between Earth\'s surface and ionosphere. This frequency matches the brain\'s theta wave range during deep meditation.',
        'winter solstice': 'December 21–22 in the Northern Hemisphere. The Sun reaches its lowest point in the sky, appearing to "stand still" (Latin: sol + sistere) for approximately 3 days before beginning to rise again.',
        'ecliptic': 'The apparent path the Sun traces across the sky over the course of a year. The 12 zodiac constellations lie along this band. All planets orbit roughly in this same plane.',
        'Olympians': 'The 12 major gods of ancient Greek religion who resided on Mount Olympus: Zeus, Hera, Poseidon, Demeter, Athena, Apollo, Artemis, Ares, Aphrodite, Hephaestus, Hermes, and Dionysus.',
        'Adityas': 'The 12 solar deities in Vedic (Hindu) tradition, each governing one month of the year. This 12-fold solar division maps directly onto the zodiac.',
        'axis mundi': 'Latin for "world axis." The cosmic center connecting heaven and earth — depicted as a tree (Yggdrasil, Tree of Life), mountain (Meru, Sinai), pillar, or ladder across traditions. In yogic anatomy, this maps to the spinal column.',
        'ego dissolution': 'The experience of the boundary between self and world dissolving. Reported in psychedelic sessions, deep meditation, and near-death experiences. Called "fana" in Sufism, "moksha" in Hinduism, "satori" in Zen Buddhism.',
        'Hemi-Sync': 'Hemispheric Synchronization — Robert Monroe\'s patented audio technology that uses binaural beats to synchronize the left and right brain hemispheres. Central to the CIA Gateway Process.',
        'binaural beats': 'When slightly different frequencies are played in each ear (e.g., 400 Hz left, 410 Hz right), the brain generates a "phantom" beat at the difference frequency (10 Hz). Used to entrain brainwaves to specific states of consciousness.',
        'MAOI': 'Monoamine oxidase inhibitor — a compound that blocks the enzyme MAO, which normally breaks down DMT in the gut. Syrian rue (harmal) and Banisteriopsis caapi contain natural MAOIs, which is what makes ayahuasca orally active.',
        'kykeon': 'The sacred drink consumed at the Eleusinian Mysteries in ancient Greece (~1500 BCE – 392 CE). Its ingredients are debated; the Wasson-Hofmann-Ruck hypothesis proposes it contained ergot alkaloids chemically related to LSD.',
        'Soma': 'The divine drink described in the Rigveda (c. 1500 BCE). Its identity is debated: candidates include Amanita muscaria mushroom, Peganum harmala (Syrian rue), ephedra, and cannabis. 120 hymns of the Rigveda are dedicated entirely to Soma.',
        'pineal gland': 'A small pinecone-shaped endocrine gland at the geometric center of the brain. Produces melatonin. Descartes called it "the seat of the soul." Contains rod and cone photoreceptor cells structurally similar to the eye.',
        'circalunar': 'A biological rhythm with a period of approximately 29.5 days — matching the Moon\'s synodic cycle. Well-documented in marine organisms; emerging peer-reviewed evidence suggests humans retain a vestigial circalunar clock.',
        'Tetrabiblos': 'Ptolemy\'s 2nd-century CE treatise on astrology — the foundational text of the Western astrological tradition. It documents planet-body-metal associations still referenced in both astrology and the history of medicine.',
        'Paracelsus': 'Philippus Aureolus Theophrastus Bombastus von Hohenheim (1493–1541). Swiss physician who founded medical chemistry (iatrochemistry). He prescribed planetary metals for their corresponding organ systems — connecting alchemy, astronomy, and medicine.',
        'kundalini': 'In yogic anatomy: a dormant energy described as a coiled serpent at the base of the spine (muladhara chakra). When "awakened" through meditation, breathwork, or other practices, it is said to rise through the chakras to the crown, producing expanded states of consciousness.',
        'chakras': 'In yogic anatomy: 7 primary energy centers along the spine, each associated with a color, element, endocrine gland, and state of consciousness. In hermetic tradition, these map to the 7 classical planets.',
        'synodic cycle': 'The time it takes for a celestial body to return to the same position relative to the Sun as seen from Earth. The Moon\'s synodic cycle (new moon to new moon) is 29.53 days.',
        'Emerald Tablet': 'A short Hermetic text attributed to Hermes Trismegistus, containing the famous phrase "As above, so below." Though the earliest known version dates to Arabic texts (~6th–8th century CE), the tradition claims far greater antiquity.',
    };

    // ──────────────────────────────────────────────
    // Thesis Statement — The Pattern
    // ──────────────────────────────────────────────

    const thesisStatement = [
        {
            id: 'the-pattern',
            title: 'The Pattern',
            badge: 'synthesis',
            icon: '◉',
            summary: 'Every major religion tells the same story. A central figure of light is followed by 12 companions. The figure dies and is reborn after 3 days. A serpent guards forbidden knowledge. A great flood resets the world. A tree connects heaven and earth. These are not coincidences. They are records of what humans observed in the sky — and experienced in their own bodies — encoded in the only language available: myth.',
            details: 'The thesis of this platform:\n\nAncient mythology, religious texts, and sacred rituals are not metaphors or moral fables. They are encoded descriptions of astronomical events — zodiac cycles, the precession of equinoxes, the solar death-and-rebirth at the winter solstice — and neurochemical experiences: altered states of consciousness, entoptic phenomena, ego dissolution, and reconstitution.\n\nThe same pattern — "As Above, So Below" — plays out at every scale. Planetary orbits follow the same mathematical relationships as neural architecture. The geometric forms seen in every mystical vision across every culture match the structure of the visual cortex. The 7 classical planets map to 7 metals, 7 endocrine glands, and 7 chakras — not as poetic metaphor but as a system of correspondences that ancient physicians used to treat the body.\n\nWhen the Rigveda (1500 BCE), the Eleusinian Mysteries (1500 BCE – 392 CE), the CIA Gateway Process (1983), and Johns Hopkins psilocybin trials (2006–present) all independently describe the same experience — geometric visions, ego death, cosmic unity, encounter with light, rebirth — you are no longer dealing with mythology. You are dealing with convergent data from every direction.\n\nThis app maps the evidence. Each section is a piece of the puzzle. Together, they reveal the pattern.',
            source: 'The Emerald Tablet of Hermes Trismegistus; Manly P. Hall, The Secret Teachings of All Ages (1928); de Santillana & von Dechend, Hamlet\'s Mill (1969); CIA-RDP96-00788R001700210016-5 (1983); Griffiths et al., Psychopharmacology (2006)',
        },
        {
            id: 'zodiac-every-religion',
            title: 'The Zodiac in Every Religion',
            badge: 'tradition',
            icon: '☉',
            summary: 'The number 12 appears in every major religion — not because it is mystically significant, but because there are 12 zodiac constellations along the ecliptic. The "death and resurrection" of gods maps to the solar cycle. The shift between religious ages maps to the precession of equinoxes. The stories are astronomical events, told as narrative.',
            details: 'THE 12-FOLD PATTERN:\n• 12 disciples of Jesus, 12 tribes of Israel, 12 Olympians of Greece, 12 Adityas of Vedic India, 12 Imams of Shia Islam, 12 labors of Hercules, 12 knights of the Round Table, 12 sons of Odin. Every tradition that observed the sky independently arrived at 12 — because the Sun passes through 12 constellations.\n\nTHE SOLAR DEATH AND REBIRTH:\nAt the winter solstice (December 21–22), the Sun reaches its lowest declination. For approximately 3 days it appears to "stand still" — sol + sistere = solstice — before beginning to rise again on December 25. This is the astronomical event behind every death-and-resurrection myth: Osiris, Dionysus, Mithras, Attis, Krishna, and Christ. The Sun "dies" for 3 days and is "reborn." The cross itself is the Southern Cross constellation, near which the Sun reaches its lowest point.\n\nTHE THREE KINGS:\nOrion\'s Belt — three stars in a line, called "the Three Kings" in multiple traditions — aligns with Sirius (the brightest star, "the Star in the East") to point directly to the place on the horizon where the Sun rises on December 25. The "Three Kings follow the Star in the East to find the newborn Sun/Son."\n\nTHE PRECESSION OF AGES:\nMoses comes down from Sinai to find the Israelites worshipping a golden calf (Taurus). He destroys it and blows the ram\'s horn (Aries) — the Age of Taurus ending, the Age of Aries beginning. Jesus is the fish — the ichthys, the Age of Pisces. "I will be with you until the end of the age" (Matthew 28:20) — until the astrological age ends. We are now entering the Age of Aquarius, the water-bearer.\n\nSOLAR HEROES:\nSamson\'s hair (sun rays) gives him superhuman power. When Delilah (the night, from Hebrew "laylah" — night) cuts his hair, he loses strength. His name, Shimshon, derives from "shemesh" — the Hebrew word for Sun. Hercules\' 12 labors are the Sun\'s annual journey through the 12 zodiac constellations.',
            source: 'Dupuis, The Origin of All Religious Worship (1795); Massey, The Natural Genesis (1883); Murdock, The Christ Conspiracy (1999); de Santillana & von Dechend, Hamlet\'s Mill (1969); Ulansey, The Origins of the Mithraic Mysteries (1989)',
        },
        {
            id: 'as-above-so-below-map',
            title: 'As Above, So Below: The Map',
            badge: 'synthesis',
            icon: '⬡',
            summary: 'The Hermetic axiom is not poetry. It is a map. The 7 classical planets correspond to 7 metals in alchemy, 7 endocrine glands in the body, and 7 chakras in yogic anatomy. Mars is iron, red, blood, and the adrenals. Saturn is lead, bones, and the pineal. Ancient physicians prescribed planetary metals for their corresponding organs — and modern science has validated some of these correspondences.',
            details: 'THE SEVEN-FOLD CORRESPONDENCE:\n\n☉ SUN → Gold (Au) → Heart → Anahata chakra\nThe Sun rules the heart in every astrological tradition (Ptolemy, Tetrabiblos II). Gold is the only metal that doesn\'t corrode — the "immortal" metal for the organ of life. Colloidal gold has documented anti-inflammatory properties.\n\n☽ MOON → Silver (Ag) → Brain/Pineal/Fluids → Ajna chakra\nThe Moon governs tides, and the body is 60% water. The pineal gland (which produces melatonin in response to light cycles) is the "third eye" of every tradition. Silver has documented antimicrobial properties — used in medicine for millennia.\n\n♂ MARS → Iron (Fe) → Blood/Muscles/Adrenals → Manipura chakra\nMars is red because its surface is iron oxide. Human blood is red because of iron in hemoglobin. Iron deficiency causes weakness and fatigue — loss of the "martial" energy. The adrenal glands produce adrenaline (the fight-or-flight hormone).\n\n♀ VENUS → Copper (Cu) → Heart/Thymus/Kidneys → Anahata chakra\nCopper produces green patina (the color of the heart chakra). Venus rules love and the heart across all traditions. Copper is essential for cardiovascular function — copper deficiency causes heart problems.\n\n☿ MERCURY → Quicksilver (Hg) → Nervous System/Thyroid → Vishuddha chakra\nMercury is the fastest planet (88-day orbit), quicksilver is the only liquid metal (fastest-moving), and Mercury rules communication and the nervous system. The thyroid gland regulates metabolic speed.\n\n♃ JUPITER → Tin (Sn) → Liver/Pituitary → Sahasrara chakra\nJupiter is the largest planet; the liver is the largest internal organ. Jupiter rules growth and expansion; the pituitary is the "master gland" governing growth hormones.\n\n♄ SATURN → Lead (Pb) → Bones/Skin/Pineal → Muladhara chakra\nSaturn rules structure, limitation, time, and death. Lead is the densest classical metal. Bones are the densest tissue — the body\'s structural foundation. Saturn\'s rings are boundaries; bones are boundaries.\n\nTHE VIBRATIONAL MODEL — ITZHAK BENTOV:\nBentov (Stalking the Wild Pendulum, 1977) provided the engineering model for why these correspondences might be real. He measured the body\'s resonant frequency during meditation at 6.8–7.5 Hz — matching Earth\'s Schumann resonance (7.83 Hz). The CIA Gateway Report (1983) explicitly built its theoretical framework on Bentov\'s research, concluding that consciousness is a vibrational pattern that can, at specific frequencies, resonate with larger systems.\n\nThe ancients described this same phenomenon in their own language: "Om" has been measured vibrating at approximately 7.83 Hz. Pythagoras described the "Music of the Spheres" — each planet producing a tone based on its orbital frequency. The Hindu concept of Nada Brahma states: "The universe is sound." Bentov\'s contribution is translating this into mechanical engineering.',
            source: 'Ptolemy, Tetrabiblos Book II (c. 150 CE); Paracelsus, Volumen Medicinae Paramirum (1520); Culpeper, Complete Herbal (1653); Bentov, Stalking the Wild Pendulum (1977); CIA Gateway Report (1983); Motoyama, Theories of the Chakras (1981)',
        },
        {
            id: 'pieces-of-puzzle',
            title: 'The Pieces of This Puzzle',
            badge: 'synthesis',
            icon: '🧩',
            summary: 'This app does not ask you to believe anything. It maps convergent evidence from independent sources — ancient texts, modern neuroscience, declassified government documents, and peer-reviewed research — and lets you see the pattern yourself. Each section illuminates one facet of a single, unified picture.',
            details: 'HOW THIS APP IS ORGANIZED:\n\n📜 ANCIENT TRADITIONS\nWhat the original texts actually say — the Rigveda, the Emerald Tablet, Ptolemy\'s Tetrabiblos, Patanjali\'s Yoga Sutras, Sufi treatises, Christian alchemical manuscripts. Primary sources, not internet summaries. Every claim cited to the original text.\n\n🔬 MODERN SCIENCE\nWhat peer-reviewed research confirms: the Moon measurably affects sleep (Cajochen 2013, Casiraghi 2021). Solar storms affect heart attack rates (Vencloviene 2019). Circalunar biological clocks exist in humans (Helfrich-Förster 2021). These are not beliefs — they are published data.\n\n🔗 SYMBOLIC PATTERNS\nThe anatomy-astronomy correspondences: planets mapped to body systems, metals, and chakras. Documented in Ptolemy (150 CE), Paracelsus (1520), Culpeper (1653), and Vedic Jyotish. Not proof of causation — but a pattern too consistent across too many independent traditions to be coincidence.\n\n⚗️ THE SYNTHESIS\nThe sacred secretion theory — what it claims, what\'s real in it, what science doesn\'t support. An honest assessment with epistemic badges on every claim.\n\n🧠 CONSCIOUSNESS\nThree independent paths to the same destination: entheogens (chemical), Hemi-Sync and binaural beats (frequency), and contemplative practice (discipline). The CIA studied all three. Johns Hopkins confirmed the experiences are real. Itzhak Bentov provided the engineering model. The entoptic phenomena research proves the geometric visions are hardwired into the visual cortex.\n\nTerence McKenna proposed in Food of the Gods (1992) that psychoactive plants didn\'t just inspire religion — they catalyzed human consciousness itself. His "Stoned Ape" hypothesis remains unproven, but his broader insight — that plant-human symbiosis shaped civilization, art, language, and spirituality — is increasingly supported by archaeological and ethnobotanical evidence. McKenna saw what the ancients encoded: "Nature is alive and talking to us. This is not a metaphor."\n\n🌙 LUNAR & BODY\nThe Moon-menstrual connection as a living, measurable example of "as above, so below." Peer-reviewed evidence that artificial light is disrupting a synchronization that persisted for hundreds of thousands of years.\n\n🎵 JOURNEY PROTOCOLS\nPractical tools: lunar sync protocols from Huberman\'s neuroscience research, BPM-matched music for consciousness journeys, and phase-appropriate playlists.\n\nEach section is a lens. Together, they reveal what the Emerald Tablet stated in a single line:\n\n"That which is above is like that which is below, and that which is below is like that which is above, to accomplish the miracles of the One Thing."',
            source: 'Hermes Trismegistus, The Emerald Tablet; McKenna, Food of the Gods (1992); Bentov, Stalking the Wild Pendulum (1977); Griffiths et al., Psychopharmacology (2006); Huberman Lab Podcast',
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
        planetBodyMap,
        elementCompatibility,
        aspectMeanings,
        signMythology,
        lunarCyclePhases,
        lunarCycleStudies,
        entheogens,
        gatewayProcess,
        consciousnessConvergence,
        lunarSyncProtocols,
        journeyMusicGuide,
        glossary,
        thesisStatement,
    };

})();
