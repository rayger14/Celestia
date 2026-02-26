/**
 * Celestia — Astronomy Engine
 * Provides accurate orbital calculations using Keplerian elements
 * and simplified perturbation theory.
 */

const Astronomy = (() => {
    // Julian Date utilities
    const J2000 = 2451545.0; // Jan 1.5, 2000

    function dateToJulian(date) {
        const y = date.getUTCFullYear();
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate() + date.getUTCHours() / 24 +
                  date.getUTCMinutes() / 1440 + date.getUTCSeconds() / 86400;

        let yr = y, mo = m;
        if (mo <= 2) { yr -= 1; mo += 12; }

        const A = Math.floor(yr / 100);
        const B = 2 - A + Math.floor(A / 4);

        return Math.floor(365.25 * (yr + 4716)) +
               Math.floor(30.6001 * (mo + 1)) + d + B - 1524.5;
    }

    function julianToDate(jd) {
        const z = Math.floor(jd + 0.5);
        const f = jd + 0.5 - z;
        let A = z;
        if (z >= 2299161) {
            const alpha = Math.floor((z - 1867216.25) / 36524.25);
            A = z + 1 + alpha - Math.floor(alpha / 4);
        }
        const B = A + 1524;
        const C = Math.floor((B - 122.1) / 365.25);
        const D = Math.floor(365.25 * C);
        const E = Math.floor((B - D) / 30.6001);

        const day = B - D - Math.floor(30.6001 * E) + f;
        const month = E < 14 ? E - 1 : E - 13;
        const year = month > 2 ? C - 4716 : C - 4715;

        return new Date(Date.UTC(year, month - 1, day));
    }

    // Degree/radian conversions
    const DEG = Math.PI / 180;
    const RAD = 180 / Math.PI;

    function normalizeDeg(a) {
        a = a % 360;
        return a < 0 ? a + 360 : a;
    }

    // Solve Kepler's equation: M = E - e*sin(E)
    function solveKepler(M_deg, e, tol = 1e-8) {
        const M = M_deg * DEG;
        let E = M;
        for (let i = 0; i < 50; i++) {
            const dE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E));
            E += dE;
            if (Math.abs(dE) < tol) break;
        }
        return E;
    }

    // Compute heliocentric ecliptic coordinates from orbital elements
    function computePosition(elements, T) {
        // T is centuries from J2000.0
        const a  = elements.a[0]  + elements.a[1]  * T;
        const e  = elements.e[0]  + elements.e[1]  * T;
        const I  = elements.I[0]  + elements.I[1]  * T;
        const L  = elements.L[0]  + elements.L[1]  * T;
        const lp = elements.lp[0] + elements.lp[1] * T;
        const Om = elements.Om[0] + elements.Om[1] * T;

        const w = lp - Om; // argument of perihelion
        const M = normalizeDeg(L - lp); // mean anomaly

        // Solve Kepler's equation
        const E = solveKepler(M, e);

        // True anomaly
        const sinV = Math.sqrt(1 - e * e) * Math.sin(E) / (1 - e * Math.cos(E));
        const cosV = (Math.cos(E) - e) / (1 - e * Math.cos(E));
        const v = Math.atan2(sinV, cosV) * RAD;

        // Distance from Sun
        const r = a * (1 - e * Math.cos(E));

        // Heliocentric ecliptic coordinates
        const wRad = w * DEG;
        const OmRad = Om * DEG;
        const IRad = I * DEG;
        const vRad = v * DEG;

        const cosOm = Math.cos(OmRad);
        const sinOm = Math.sin(OmRad);
        const cosI  = Math.cos(IRad);
        const sinI  = Math.sin(IRad);
        const cosWV = Math.cos(wRad + vRad);
        const sinWV = Math.sin(wRad + vRad);

        const x = r * (cosOm * cosWV - sinOm * sinWV * cosI);
        const y = r * (sinOm * cosWV + cosOm * sinWV * cosI);
        const z = r * (sinWV * sinI);

        // Ecliptic longitude and latitude
        const lon = normalizeDeg(Math.atan2(y, x) * RAD);
        const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * RAD;

        return { x, y, z, r, lon, lat, v: normalizeDeg(v), M: normalizeDeg(M) };
    }

    // Compute ecliptic longitude of the Sun as seen from Earth
    function sunLongitude(jd) {
        const T = (jd - J2000) / 36525;
        // Simplified solar coordinates
        const L0 = normalizeDeg(280.46646 + 36000.76983 * T);
        const M = normalizeDeg(357.52911 + 35999.05029 * T);
        const Mrad = M * DEG;
        const C = (1.914602 - 0.004817 * T) * Math.sin(Mrad) +
                  0.019993 * Math.sin(2 * Mrad) +
                  0.000289 * Math.sin(3 * Mrad);
        return normalizeDeg(L0 + C);
    }

    // Determine current zodiac sign from Sun's ecliptic longitude
    function getZodiacSign(sunLon) {
        const signs = [
            { name: 'Aries',       symbol: '♈', start: 0 },
            { name: 'Taurus',      symbol: '♉', start: 30 },
            { name: 'Gemini',      symbol: '♊', start: 60 },
            { name: 'Cancer',      symbol: '♋', start: 90 },
            { name: 'Leo',         symbol: '♌', start: 120 },
            { name: 'Virgo',       symbol: '♍', start: 150 },
            { name: 'Libra',       symbol: '♎', start: 180 },
            { name: 'Scorpio',     symbol: '♏', start: 210 },
            { name: 'Sagittarius', symbol: '♐', start: 240 },
            { name: 'Capricorn',   symbol: '♑', start: 270 },
            { name: 'Aquarius',    symbol: '♒', start: 300 },
            { name: 'Pisces',      symbol: '♓', start: 330 },
        ];

        for (let i = signs.length - 1; i >= 0; i--) {
            if (sunLon >= signs[i].start) return signs[i];
        }
        return signs[11]; // Pisces if < 0 somehow
    }

    // Moon phase calculation
    function getMoonPhase(jd) {
        const T = (jd - J2000) / 36525;
        // Simplified moon phase
        const D = normalizeDeg(297.8501921 + 445267.1114034 * T);
        const M = normalizeDeg(357.5291092 + 35999.0502909 * T);
        const Mp = normalizeDeg(134.9633964 + 477198.8675055 * T);

        // Phase angle approximation
        const phase = normalizeDeg(D);
        const illumination = (1 - Math.cos(phase * DEG)) / 2;

        let name, emoji;
        if (phase < 22.5)       { name = 'New Moon';           emoji = '🌑'; }
        else if (phase < 67.5)  { name = 'Waxing Crescent';    emoji = '🌒'; }
        else if (phase < 112.5) { name = 'First Quarter';      emoji = '🌓'; }
        else if (phase < 157.5) { name = 'Waxing Gibbous';     emoji = '🌔'; }
        else if (phase < 202.5) { name = 'Full Moon';           emoji = '🌕'; }
        else if (phase < 247.5) { name = 'Waning Gibbous';     emoji = '🌖'; }
        else if (phase < 292.5) { name = 'Last Quarter';       emoji = '🌗'; }
        else if (phase < 337.5) { name = 'Waning Crescent';    emoji = '🌘'; }
        else                    { name = 'New Moon';           emoji = '🌑'; }

        return { name, emoji, illumination, phase };
    }

    // Distance between two 3D positions
    function distance3D(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    // Convert AU to various units
    function auToKm(au) { return au * 149597870.7; }
    function auToMiles(au) { return au * 92955807.3; }
    function auToLightMinutes(au) { return au * 8.3167; }

    function formatDistance(au) {
        const km = auToKm(au);
        if (km < 1e6) return (km).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' km';
        if (km < 1e9) return (km / 1e6).toFixed(1) + ' million km';
        return (km / 1e9).toFixed(2) + ' billion km';
    }

    // Determine season on a planet given axial tilt and orbital position
    function getSeason(orbitalLon, axialTilt, isNorthern = true) {
        // orbitalLon: planet's ecliptic longitude
        // Season based on where planet is in its orbit relative to "solstice" points
        const angle = normalizeDeg(orbitalLon);

        if (axialTilt < 3) return 'No significant seasons';

        let season;
        if (angle >= 0 && angle < 90)        season = isNorthern ? 'Spring' : 'Autumn';
        else if (angle >= 90 && angle < 180)  season = isNorthern ? 'Summer' : 'Winter';
        else if (angle >= 180 && angle < 270) season = isNorthern ? 'Autumn' : 'Spring';
        else                                  season = isNorthern ? 'Winter' : 'Summer';

        return season;
    }

    // Convert equatorial coordinates (RA/DEC) to ecliptic (lon/lat)
    // RA in hours, DEC in degrees. Returns {lon, lat} in degrees.
    const OBLIQUITY = 23.4393; // obliquity of the ecliptic (degrees)
    function raDecToEcliptic(raHours, decDeg) {
        const alpha = raHours * 15 * DEG; // RA to radians
        const delta = decDeg * DEG;       // DEC to radians
        const eps = OBLIQUITY * DEG;

        const sinLam = Math.sin(alpha) * Math.cos(eps) + Math.tan(delta) * Math.sin(eps);
        const cosLam = Math.cos(alpha);
        const lon = normalizeDeg(Math.atan2(sinLam, cosLam) * RAD);

        const beta = Math.asin(
            Math.sin(delta) * Math.cos(eps) -
            Math.cos(delta) * Math.sin(eps) * Math.sin(alpha)
        ) * RAD;

        return { lon, lat: beta };
    }

    // Determine which zodiac constellation a given ecliptic longitude falls in
    function getConstellationForLon(lon) {
        lon = normalizeDeg(lon);
        const signs = [
            'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
            'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
        ];
        const idx = Math.floor(lon / 30);
        return signs[Math.min(idx, 11)];
    }

    return {
        J2000,
        DEG,
        RAD,
        dateToJulian,
        julianToDate,
        normalizeDeg,
        solveKepler,
        computePosition,
        sunLongitude,
        getZodiacSign,
        getMoonPhase,
        distance3D,
        auToKm,
        auToMiles,
        auToLightMinutes,
        formatDistance,
        getSeason,
        raDecToEcliptic,
        getConstellationForLon,
    };
})();
