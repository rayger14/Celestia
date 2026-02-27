/**
 * Celestia — Journey Player
 * Apple Music integration for consciousness journey phases
 * Uses MusicKit JS to search by BPM and build phase-appropriate queues
 */

const JourneyPlayer = (() => {
    // ──────────────────────────────────────────────
    // Journey Phase Definitions
    // ──────────────────────────────────────────────

    const phases = [
        {
            id: 'arrival',
            name: 'Arrival',
            icon: '🕊️',
            bpmRange: [60, 80],
            duration: '0:00 – 0:30',
            description: 'Grounding & safety. Gentle, warm, acoustic.',
            searchTerms: ['ambient calm', 'peaceful piano', 'meditation gentle'],
            qualities: 'Instrumental, acoustic, minimal. Resting heart rate range.',
            color: '#06d6a0',
        },
        {
            id: 'onset',
            name: 'Onset',
            icon: '🌅',
            bpmRange: [60, 90],
            duration: '0:30 – 1:30',
            description: 'Medicine taking effect. Building spaciousness.',
            searchTerms: ['ambient atmospheric', 'neo-classical ambient', 'drone meditation'],
            qualities: 'No lyrics. Slowly expanding. Increasing reverb and space.',
            color: '#4f8fff',
        },
        {
            id: 'ascent',
            name: 'Ascent',
            icon: '🔥',
            bpmRange: [80, 120],
            duration: '1:30 – 2:30',
            description: 'Intensity building. Ego defenses dissolving.',
            searchTerms: ['orchestral emotional', 'post-rock instrumental', 'cinematic strings'],
            qualities: 'Swelling orchestral, emotional classical, building ambient.',
            color: '#f4b942',
        },
        {
            id: 'peak',
            name: 'Peak',
            icon: '✦',
            bpmRange: [50, 90],
            duration: '2:30 – 4:00',
            description: 'Ego dissolution. Surrender. The mystical window.',
            searchTerms: ['tibetan singing bowls', 'indian raga meditation', 'drone overtone'],
            qualities: 'Drone-based, overtone-rich. Sacred music from any tradition.',
            color: '#8b5cf6',
        },
        {
            id: 'descent',
            name: 'Post-Peak',
            icon: '🌊',
            bpmRange: [70, 100],
            duration: '4:00 – 5:30',
            description: 'Reintegration. Emotional processing.',
            searchTerms: ['cinematic emotional', 'ambient melodic', 'post-classical'],
            qualities: 'More melodic, emotionally evocative, gentler than ascent.',
            color: '#4f8fff',
        },
        {
            id: 'return',
            name: 'Return',
            icon: '🏠',
            bpmRange: [60, 80],
            duration: '5:30 – 7:30',
            description: 'Grounding, gratitude, integration.',
            searchTerms: ['acoustic peaceful', 'gentle folk instrumental', 'ambient warmth'],
            qualities: 'Familiar, warm. Meaningful lyrics welcome now.',
            color: '#06d6a0',
        },
    ];

    // ──────────────────────────────────────────────
    // Curated Recommendations (no API needed)
    // ──────────────────────────────────────────────

    const curatedTracks = {
        arrival: [
            { title: 'Gymnopédie No. 1', artist: 'Erik Satie', bpm: 66 },
            { title: 'An Ending (Ascent)', artist: 'Brian Eno', bpm: 72 },
            { title: 'Spiegel im Spiegel', artist: 'Arvo Pärt', bpm: 56 },
            { title: 'Clair de Lune', artist: 'Debussy', bpm: 64 },
        ],
        onset: [
            { title: 'Weightless', artist: 'Marconi Union', bpm: 60 },
            { title: 'Music for Airports 1/1', artist: 'Brian Eno', bpm: 68 },
            { title: 'Stars of the Lid', artist: 'And Their Refinement of the Decline', bpm: 70 },
            { title: 'Nuvole Bianche', artist: 'Ludovico Einaudi', bpm: 74 },
        ],
        ascent: [
            { title: 'Adagio for Strings', artist: 'Samuel Barber', bpm: 92 },
            { title: 'On the Nature of Daylight', artist: 'Max Richter', bpm: 84 },
            { title: 'Nimrod (Enigma Variations)', artist: 'Elgar', bpm: 96 },
            { title: 'The Earth Prelude', artist: 'Ludovico Einaudi', bpm: 88 },
        ],
        peak: [
            { title: 'Gayatri Mantra', artist: 'Deva Premal', bpm: 72 },
            { title: 'Tibetan Singing Bowls', artist: 'Various', bpm: 60 },
            { title: 'Raga Darbari', artist: 'Ali Akbar Khan', bpm: 65 },
            { title: 'O Magnum Mysterium', artist: 'Lauridsen', bpm: 58 },
        ],
        descent: [
            { title: 'Experience', artist: 'Ludovico Einaudi', bpm: 80 },
            { title: 'Avril 14th', artist: 'Aphex Twin', bpm: 82 },
            { title: 'Metamorphosis Two', artist: 'Philip Glass', bpm: 90 },
            { title: 'Divenire', artist: 'Ludovico Einaudi', bpm: 86 },
        ],
        return: [
            { title: 'Somewhere Over the Rainbow', artist: 'Israel Kamakawiwoʻole', bpm: 76 },
            { title: 'Here Comes the Sun', artist: 'The Beatles', bpm: 66 },
            { title: 'Three Little Birds', artist: 'Bob Marley', bpm: 76 },
            { title: 'Breathe', artist: 'Pink Floyd', bpm: 64 },
        ],
    };

    // ──────────────────────────────────────────────
    // State
    // ──────────────────────────────────────────────

    let currentPhaseIndex = 0;
    let musicKitInstance = null;
    let isConnected = false;
    let isPlaying = false;
    let searchResults = [];

    // ──────────────────────────────────────────────
    // MusicKit JS Integration
    // ──────────────────────────────────────────────

    async function initMusicKit(developerToken) {
        if (!window.MusicKit) {
            console.warn('MusicKit JS not loaded. Using curated mode.');
            return false;
        }

        try {
            musicKitInstance = await MusicKit.configure({
                developerToken: developerToken,
                app: {
                    name: 'Celestia',
                    build: '1.0.0',
                },
            });
            return true;
        } catch (err) {
            console.warn('MusicKit configuration failed:', err);
            return false;
        }
    }

    async function connectAppleMusic() {
        if (!musicKitInstance) return false;

        try {
            await musicKitInstance.authorize();
            isConnected = true;
            updateConnectionUI(true);
            return true;
        } catch (err) {
            console.warn('Apple Music authorization failed:', err);
            return false;
        }
    }

    function disconnectAppleMusic() {
        if (musicKitInstance) {
            musicKitInstance.unauthorize();
        }
        isConnected = false;
        isPlaying = false;
        updateConnectionUI(false);
    }

    async function searchByBPM(phase) {
        if (!musicKitInstance || !isConnected) return [];

        const [minBpm, maxBpm] = phase.bpmRange;
        const results = [];

        // Search Apple Music catalog using phase search terms
        for (const term of phase.searchTerms) {
            try {
                const response = await musicKitInstance.api.music(
                    `/v1/catalog/us/search`, {
                        term: term,
                        types: ['songs'],
                        limit: 10,
                    }
                );

                if (response.data.results.songs) {
                    results.push(...response.data.results.songs.data);
                }
            } catch (err) {
                console.warn('Search failed for term:', term, err);
            }
        }

        // Deduplicate by song ID
        const seen = new Set();
        return results.filter(song => {
            if (seen.has(song.id)) return false;
            seen.add(song.id);
            return true;
        }).slice(0, 12);
    }

    async function playSong(songId) {
        if (!musicKitInstance || !isConnected) return;

        try {
            await musicKitInstance.setQueue({ song: songId });
            await musicKitInstance.play();
            isPlaying = true;
            updatePlaybackUI();
        } catch (err) {
            console.warn('Playback failed:', err);
        }
    }

    async function playPause() {
        if (!musicKitInstance) return;

        if (isPlaying) {
            await musicKitInstance.pause();
            isPlaying = false;
        } else {
            await musicKitInstance.play();
            isPlaying = true;
        }
        updatePlaybackUI();
    }

    function stop() {
        if (musicKitInstance) {
            musicKitInstance.stop();
        }
        isPlaying = false;
        updatePlaybackUI();
    }

    // ──────────────────────────────────────────────
    // UI Rendering
    // ──────────────────────────────────────────────

    function render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = buildPlayerHTML();
        bindPlayerEvents(container);
    }

    function buildPlayerHTML() {
        const phase = phases[currentPhaseIndex];
        const tracks = curatedTracks[phase.id] || [];

        return `
            <div class="journey-player">
                <div class="journey-header">
                    <div class="journey-title-row">
                        <span class="journey-title-icon">🎵</span>
                        <h3 class="journey-title">Journey Player</h3>
                    </div>
                    <p class="journey-subtitle">Phase-matched music for consciousness exploration</p>
                    <button class="journey-connect-btn" id="journey-connect-btn">
                        <span class="journey-connect-icon">🎵</span>
                        <span class="journey-connect-text" id="journey-connect-text">Connect Apple Music</span>
                    </button>
                </div>

                <!-- Phase Arc Navigator -->
                <div class="journey-arc">
                    ${phases.map((p, i) => `
                        <button class="journey-phase-dot ${i === currentPhaseIndex ? 'active' : ''}"
                                data-phase="${i}"
                                style="--phase-color: ${p.color}"
                                title="${p.name}: ${p.duration}">
                            <span class="phase-dot-icon">${p.icon}</span>
                            <span class="phase-dot-label">${p.name}</span>
                        </button>
                    `).join('<div class="journey-arc-line"></div>')}
                </div>

                <!-- Current Phase Detail -->
                <div class="journey-phase-detail" style="--phase-color: ${phase.color}">
                    <div class="journey-phase-header">
                        <span class="journey-phase-icon">${phase.icon}</span>
                        <div>
                            <div class="journey-phase-name">${phase.name}</div>
                            <div class="journey-phase-time">${phase.duration}</div>
                        </div>
                        <div class="journey-bpm-badge">
                            <span class="bpm-value">${phase.bpmRange[0]}–${phase.bpmRange[1]}</span>
                            <span class="bpm-label">BPM</span>
                        </div>
                    </div>
                    <p class="journey-phase-desc">${phase.description}</p>
                    <p class="journey-phase-qualities">${phase.qualities}</p>
                </div>

                <!-- Track Recommendations -->
                <div class="journey-tracks">
                    <div class="journey-tracks-header">
                        <span class="journey-tracks-label">Recommended for ${phase.name}</span>
                    </div>
                    ${tracks.map((track, i) => `
                        <div class="journey-track" data-track-index="${i}">
                            <div class="journey-track-num">${i + 1}</div>
                            <div class="journey-track-info">
                                <div class="journey-track-title">${track.title}</div>
                                <div class="journey-track-artist">${track.artist}</div>
                            </div>
                            <div class="journey-track-bpm">${track.bpm} bpm</div>
                            <button class="journey-track-search" data-query="${encodeURIComponent(track.title + ' ' + track.artist)}" title="Search on Apple Music">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            </button>
                        </div>
                    `).join('')}
                </div>

                <!-- Apple Music Search Results (populated dynamically) -->
                <div class="journey-search-results hidden" id="journey-search-results">
                    <div class="journey-search-header">
                        <span>Apple Music Results</span>
                        <button class="journey-search-close" id="journey-search-close">&times;</button>
                    </div>
                    <div id="journey-search-list"></div>
                </div>

                <!-- Now Playing Bar -->
                <div class="journey-now-playing hidden" id="journey-now-playing">
                    <div class="now-playing-info">
                        <div class="now-playing-title" id="now-playing-title"></div>
                        <div class="now-playing-artist" id="now-playing-artist"></div>
                    </div>
                    <button class="now-playing-btn" id="journey-play-pause">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                    </button>
                    <button class="now-playing-btn" id="journey-stop">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
                    </button>
                </div>

                <!-- Phase Navigation -->
                <div class="journey-nav">
                    <button class="journey-nav-btn" id="journey-prev" ${currentPhaseIndex === 0 ? 'disabled' : ''}>
                        ← Previous Phase
                    </button>
                    <button class="journey-nav-btn journey-nav-primary" id="journey-next" ${currentPhaseIndex === phases.length - 1 ? 'disabled' : ''}>
                        Next Phase →
                    </button>
                </div>
            </div>
        `;
    }

    function bindPlayerEvents(container) {
        // Phase dots
        container.querySelectorAll('.journey-phase-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                currentPhaseIndex = parseInt(dot.dataset.phase);
                render('journey-player-container');
            });
        });

        // Navigation
        const prevBtn = container.querySelector('#journey-prev');
        const nextBtn = container.querySelector('#journey-next');
        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (currentPhaseIndex > 0) {
                currentPhaseIndex--;
                render('journey-player-container');
            }
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (currentPhaseIndex < phases.length - 1) {
                currentPhaseIndex++;
                render('journey-player-container');
            }
        });

        // Connect Apple Music
        const connectBtn = container.querySelector('#journey-connect-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', async () => {
                if (isConnected) {
                    disconnectAppleMusic();
                    render('journey-player-container');
                } else {
                    const connected = await connectAppleMusic();
                    if (connected) {
                        render('journey-player-container');
                        // Auto-search for current phase
                        const results = await searchByBPM(phases[currentPhaseIndex]);
                        if (results.length > 0) {
                            showSearchResults(results);
                        }
                    }
                }
            });
        }

        // Track search buttons (open in Apple Music web)
        container.querySelectorAll('.journey-track-search').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = decodeURIComponent(btn.dataset.query);
                if (isConnected && musicKitInstance) {
                    // Search Apple Music API directly
                    searchAndShow(query);
                } else {
                    // Open Apple Music web search
                    window.open(`https://music.apple.com/us/search?term=${encodeURIComponent(query)}`, '_blank');
                }
            });
        });

        // Play/pause and stop
        const ppBtn = container.querySelector('#journey-play-pause');
        if (ppBtn) ppBtn.addEventListener('click', playPause);

        const stopBtn = container.querySelector('#journey-stop');
        if (stopBtn) stopBtn.addEventListener('click', stop);

        // Search close
        const searchClose = container.querySelector('#journey-search-close');
        if (searchClose) {
            searchClose.addEventListener('click', () => {
                const resultsEl = container.querySelector('#journey-search-results');
                if (resultsEl) resultsEl.classList.add('hidden');
            });
        }

        // Update connect button state
        updateConnectionUI(isConnected);
    }

    async function searchAndShow(query) {
        if (!musicKitInstance || !isConnected) return;

        try {
            const response = await musicKitInstance.api.music(
                `/v1/catalog/us/search`, {
                    term: query,
                    types: ['songs'],
                    limit: 8,
                }
            );

            if (response.data.results.songs) {
                showSearchResults(response.data.results.songs.data);
            }
        } catch (err) {
            console.warn('Search failed:', err);
        }
    }

    function showSearchResults(results) {
        const container = document.getElementById('journey-search-results');
        const list = document.getElementById('journey-search-list');
        if (!container || !list) return;

        list.innerHTML = results.map(song => {
            const attrs = song.attributes;
            const artUrl = attrs.artwork ? attrs.artwork.url.replace('{w}', '40').replace('{h}', '40') : '';
            return `
                <div class="journey-search-track" data-song-id="${song.id}">
                    ${artUrl ? `<img class="search-track-art" src="${artUrl}" alt="">` : '<div class="search-track-art-placeholder">♪</div>'}
                    <div class="search-track-info">
                        <div class="search-track-title">${attrs.name}</div>
                        <div class="search-track-artist">${attrs.artistName}</div>
                    </div>
                    <button class="search-track-play" data-song-id="${song.id}">▶</button>
                </div>
            `;
        }).join('');

        container.classList.remove('hidden');

        // Bind play buttons
        list.querySelectorAll('.search-track-play').forEach(btn => {
            btn.addEventListener('click', async () => {
                const songId = btn.dataset.songId;
                await playSong(songId);

                // Find the song info
                const song = results.find(s => s.id === songId);
                if (song) {
                    updateNowPlaying(song.attributes.name, song.attributes.artistName);
                }
            });
        });
    }

    function updateConnectionUI(connected) {
        const text = document.getElementById('journey-connect-text');
        const btn = document.getElementById('journey-connect-btn');
        if (text) {
            text.textContent = connected ? 'Connected ✓ (Disconnect)' : 'Connect Apple Music';
        }
        if (btn) {
            btn.classList.toggle('connected', connected);
        }
    }

    function updatePlaybackUI() {
        const ppBtn = document.getElementById('journey-play-pause');
        if (ppBtn) {
            ppBtn.innerHTML = isPlaying
                ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
                : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
        }
    }

    function updateNowPlaying(title, artist) {
        const bar = document.getElementById('journey-now-playing');
        const titleEl = document.getElementById('now-playing-title');
        const artistEl = document.getElementById('now-playing-artist');
        if (bar) bar.classList.remove('hidden');
        if (titleEl) titleEl.textContent = title;
        if (artistEl) artistEl.textContent = artist;
    }

    // ──────────────────────────────────────────────
    // Public API
    // ──────────────────────────────────────────────

    return {
        phases,
        curatedTracks,
        render,
        initMusicKit,
        connectAppleMusic,
        disconnectAppleMusic,
        get isConnected() { return isConnected; },
        get currentPhase() { return phases[currentPhaseIndex]; },
    };

})();
