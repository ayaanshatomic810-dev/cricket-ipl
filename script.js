// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateSeasonDropdown();
    displayAllMatches();
    setupFilterListener();
});

// Populate the season dropdown
function populateSeasonDropdown() {
    const dropdown = document.getElementById('seasonFilter');
    const seasons = Object.keys(iplData).sort((a, b) => b - a); // Sort in descending order

    seasons.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = iplData[year].season;
        dropdown.appendChild(option);
    });
}

// Setup filter listener
function setupFilterListener() {
    const dropdown = document.getElementById('seasonFilter');
    dropdown.addEventListener('change', function() {
        if (this.value === '') {
            displayAllMatches();
        } else {
            displayMatchesByYear(parseInt(this.value));
        }
    });
}

// Display all matches grouped by season
function displayAllMatches() {
    const container = document.getElementById('matchesContainer');
    container.innerHTML = '';

    // Sort years in descending order (newest first)
    const years = Object.keys(iplData).sort((a, b) => b - a);

    years.forEach(year => {
        const seasonData = iplData[year];
        const seasonSection = createSeasonSection(seasonData);
        container.appendChild(seasonSection);
    });
}

// Display matches for a specific year
function displayMatchesByYear(year) {
    const container = document.getElementById('matchesContainer');
    container.innerHTML = '';

    if (iplData[year]) {
        const seasonData = iplData[year];
        const seasonSection = createSeasonSection(seasonData);
        container.appendChild(seasonSection);
    }
}

// Create season section HTML
function createSeasonSection(seasonData) {
    const section = document.createElement('div');
    section.className = 'season-section';

    // Season header
    const header = document.createElement('div');
    header.className = 'season-header';
    header.innerHTML = `
        <div class="season-title">${seasonData.season}</div>
        <div class="season-count">${seasonData.matches.length} Matches</div>
    `;

    // Matches list
    const matchesList = document.createElement('div');
    matchesList.className = 'matches-list';

    seasonData.matches.forEach(match => {
        const matchCard = createMatchCard(match);
        matchesList.appendChild(matchCard);
    });

    section.appendChild(header);
    section.appendChild(matchesList);

    return section;
}

// Create individual match card
function createMatchCard(match) {
    const card = document.createElement('div');
    card.className = 'match-card';

    // Format date
    const dateObj = new Date(match.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    card.innerHTML = `
        <div class="match-date">
            <div class="date-text">Match Date</div>
            <div class="date-value">${formattedDate}</div>
        </div>

        <div class="match-details">
            <div class="team">
                <div class="team-name">${match.team1}</div>
                <div class="team-score">${match.team1Score}</div>
                <div class="overs-played">(${match.team1Overs} overs)</div>
            </div>
            <div class="vs-text">VS</div>
            <div class="team">
                <div class="team-name">${match.team2}</div>
                <div class="team-score">${match.team2Score}</div>
                <div class="overs-played">(${match.team2Overs} overs)</div>
            </div>
        </div>

        <div class="match-info">
            <div class="info-row">
                <span class="info-label">Venue:</span>
                <span class="info-value">${match.venue}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Result:</span>
                <span class="info-value result-text">${match.result}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Player of Match:</span>
                <span class="info-value pom-text">${match.playerOfMatch}</span>
            </div>
        </div>
    `;

    return card;
}
