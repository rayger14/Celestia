/**
 * Celestia — Planet Data & Definitions
 * Keplerian orbital elements (J2000 epoch) from JPL
 * Format: [value_at_J2000, rate_per_century]
 */

const PlanetData = (() => {

    // Orbital elements: a(AU), e, I(deg), L(deg), long.peri(deg), long.node(deg)
    // Source: JPL Solar System Dynamics
    const orbitalElements = {
        mercury: {
            a:  [0.38709927, 0.00000037],
            e:  [0.20563593, 0.00001906],
            I:  [7.00497902, -0.00594749],
            L:  [252.25032350, 149472.67411175],
            lp: [77.45779628, 0.16047689],
            Om: [48.33076593, -0.12534081],
        },
        venus: {
            a:  [0.72333566, 0.00000390],
            e:  [0.00677672, -0.00004107],
            I:  [3.39467605, -0.00078890],
            L:  [181.97909950, 58517.81538729],
            lp: [131.60246718, 0.00268329],
            Om: [76.67984255, -0.27769418],
        },
        earth: {
            a:  [1.00000261, 0.00000562],
            e:  [0.01671123, -0.00004392],
            I:  [-0.00001531, -0.01294668],
            L:  [100.46457166, 35999.37244981],
            lp: [102.93768193, 0.32327364],
            Om: [0.0, 0.0],
        },
        mars: {
            a:  [1.52371034, 0.00001847],
            e:  [0.09339410, 0.00007882],
            I:  [1.84969142, -0.00813131],
            L:  [355.44656899, 19140.30268499],  // corrected: was missing minus
            lp: [336.05637041, 0.44441088],  // corrected: was missing minus
            Om: [49.55953891, -0.29257343],
        },
        jupiter: {
            a:  [5.20288700, -0.00011607],
            e:  [0.04838624, -0.00013253],
            I:  [1.30439695, -0.00183714],
            L:  [34.39644051, 3034.74612775],
            lp: [14.72847983, 0.21252668],
            Om: [100.47390909, 0.20469106],
        },
        saturn: {
            a:  [9.53667594, -0.00125060],
            e:  [0.05386179, -0.00050991],
            I:  [2.48599187, 0.00193609],
            L:  [49.95424423, 1222.49362201],
            lp: [92.59887831, -0.41897216],
            Om: [113.66242448, -0.28867794],
        },
        uranus: {
            a:  [19.18916464, -0.00196176],
            e:  [0.04725744, -0.00004397],
            I:  [0.77263783, -0.00242939],
            L:  [313.23810451, 428.48202785],
            lp: [170.95427630, 0.40805281],
            Om: [74.01692503, 0.04240589],
        },
        neptune: {
            a:  [30.06992276, 0.00026291],
            e:  [0.00859048, 0.00005105],
            I:  [1.77004347, 0.00035372],
            L:  [304.87997031, 218.45945325],  // corrected: was missing minus
            lp: [44.96476227, -0.32241464],
            Om: [131.78422574, -0.00508664],
        },
    };

    // Planet display properties
    const planetInfo = {
        mercury: {
            name: 'Mercury',
            type: 'Terrestrial Planet',
            color: '#b5b5b5',
            glowColor: 'rgba(181, 181, 181, 0.3)',
            radius: 4,        // display radius in px at default zoom
            icon: '☿',
            axialTilt: 0.034,
            surfaceTemp: '−180°C to 430°C',
            dayLength: '58.6 Earth days',
            yearLength: '88 Earth days',
            gravity: '3.7 m/s² (0.38g)',
            moons: [],
            facts: [
                'Smallest planet in the solar system',
                'Has no atmosphere to retain heat, causing extreme temperature swings',
                'A year on Mercury is shorter than its day',
                'Has a large iron core making up 85% of its radius',
                'Surface is heavily cratered, similar to Earth\'s Moon',
            ],
        },
        venus: {
            name: 'Venus',
            type: 'Terrestrial Planet',
            color: '#e8cda0',
            glowColor: 'rgba(232, 205, 160, 0.4)',
            radius: 7,
            icon: '♀',
            axialTilt: 177.4,  // retrograde rotation
            surfaceTemp: '462°C (avg)',
            dayLength: '243 Earth days',
            yearLength: '225 Earth days',
            gravity: '8.87 m/s² (0.9g)',
            moons: [],
            facts: [
                'Hottest planet due to runaway greenhouse effect',
                'Rotates backwards (retrograde) compared to most planets',
                'A day on Venus is longer than its year',
                'Surface pressure is 92 times that of Earth',
                'Often called Earth\'s "sister planet" due to similar size',
            ],
        },
        earth: {
            name: 'Earth',
            type: 'Terrestrial Planet',
            color: '#4f8fff',
            glowColor: 'rgba(79, 143, 255, 0.4)',
            radius: 8,
            icon: '🌍',
            axialTilt: 23.44,
            surfaceTemp: '15°C (avg)',
            dayLength: '24 hours',
            yearLength: '365.25 days',
            gravity: '9.81 m/s² (1g)',
            moons: ['Moon'],
            facts: [
                'Only known planet to harbor life',
                '71% of the surface is covered by water',
                'Has a powerful magnetic field protecting from solar wind',
                'The atmosphere is 78% nitrogen and 21% oxygen',
                'Orbits the Sun at ~29.8 km/s (107,000 km/h)',
            ],
        },
        mars: {
            name: 'Mars',
            type: 'Terrestrial Planet',
            color: '#e07040',
            glowColor: 'rgba(224, 112, 64, 0.4)',
            radius: 6,
            icon: '♂',
            axialTilt: 25.19,
            surfaceTemp: '−63°C (avg)',
            dayLength: '24h 37m',
            yearLength: '687 Earth days',
            gravity: '3.72 m/s² (0.38g)',
            moons: ['Phobos', 'Deimos'],
            facts: [
                'Home to Olympus Mons, the tallest volcano in the solar system',
                'Has seasons similar to Earth due to its axial tilt',
                'The red color comes from iron oxide (rust) on its surface',
                'Has the largest canyon system: Valles Marineris',
                'Currently being explored by NASA\'s Perseverance rover',
            ],
        },
        jupiter: {
            name: 'Jupiter',
            type: 'Gas Giant',
            color: '#c4956a',
            glowColor: 'rgba(196, 149, 106, 0.3)',
            radius: 16,
            icon: '♃',
            axialTilt: 3.13,
            surfaceTemp: '−110°C (cloud top)',
            dayLength: '9h 56m',
            yearLength: '11.9 Earth years',
            gravity: '24.79 m/s² (2.53g)',
            moons: ['Io', 'Europa', 'Ganymede', 'Callisto', '+91 others'],
            facts: [
                'Largest planet — more massive than all others combined',
                'The Great Red Spot is a storm larger than Earth',
                'Has the strongest magnetic field of any planet',
                'Europa may have a liquid water ocean under its ice',
                'Acts as a cosmic shield, deflecting asteroids from inner planets',
            ],
        },
        saturn: {
            name: 'Saturn',
            type: 'Gas Giant',
            color: '#e8d088',
            glowColor: 'rgba(232, 208, 136, 0.3)',
            radius: 14,
            icon: '♄',
            axialTilt: 26.73,
            surfaceTemp: '−140°C (cloud top)',
            dayLength: '10h 42m',
            yearLength: '29.5 Earth years',
            gravity: '10.44 m/s² (1.07g)',
            moons: ['Titan', 'Enceladus', 'Mimas', 'Rhea', '+140 others'],
            facts: [
                'Famous for its extensive ring system made of ice and rock',
                'Least dense planet — it would float in water',
                'Titan has a thick atmosphere and liquid methane lakes',
                'Winds can reach speeds of 1,800 km/h',
                'Enceladus shoots water vapor geysers into space',
            ],
        },
        uranus: {
            name: 'Uranus',
            type: 'Ice Giant',
            color: '#7ec8e3',
            glowColor: 'rgba(126, 200, 227, 0.3)',
            radius: 11,
            icon: '⛢',
            axialTilt: 97.77,
            surfaceTemp: '−195°C (cloud top)',
            dayLength: '17h 14m',
            yearLength: '84 Earth years',
            gravity: '8.87 m/s² (0.89g)',
            moons: ['Miranda', 'Ariel', 'Umbriel', 'Titania', 'Oberon'],
            facts: [
                'Rotates on its side with a 98° axial tilt',
                'Seasons last about 21 years each',
                'Coldest planetary atmosphere in the solar system',
                'Has 13 known rings, discovered in 1977',
                'Named after the Greek god of the sky',
            ],
        },
        neptune: {
            name: 'Neptune',
            type: 'Ice Giant',
            color: '#4466ee',
            glowColor: 'rgba(68, 102, 238, 0.3)',
            radius: 10,
            icon: '♆',
            axialTilt: 28.32,
            surfaceTemp: '−200°C (cloud top)',
            dayLength: '16h 6m',
            yearLength: '165 Earth years',
            gravity: '11.15 m/s² (1.14g)',
            moons: ['Triton', 'Nereid', 'Proteus', '+13 others'],
            facts: [
                'Farthest planet from the Sun since Pluto\'s reclassification',
                'Has the strongest winds in the solar system (2,100 km/h)',
                'Triton orbits in the opposite direction — likely a captured object',
                'Was the first planet found by mathematical prediction',
                'Has a faint ring system of ice particles and dust',
            ],
        },
    };

    // Render order (inner to outer)
    const planetOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

    // Orbital display radii (scaled for visual clarity in pixels)
    const orbitDisplayRadii = {
        mercury: 60,
        venus: 90,
        earth: 125,
        mars: 165,
        jupiter: 240,
        saturn: 330,
        uranus: 420,
        neptune: 500,
    };

    return {
        orbitalElements,
        planetInfo,
        planetOrder,
        orbitDisplayRadii,
    };
})();
