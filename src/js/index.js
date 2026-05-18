

//Helper functions:

// Hämtar relevant competitionDays baserat på år.
function getCompDaysBySeason(season) {
    return seasons.filter(year => year.year == season)[0].competitionDays
}


// Hämtar season baserat på år (0)
function getSeasonByYear(year) {
    return seasons.find(s => s.year === year);
}
// let getSeasonByYear = (year) =>  seasons.find(s => s.year === year);


function getPlayersWithTrainer(id, season) {
    const currSeason = getSeasonByYear(season);

    let trainers = currSeason.trainers.filter(t => t.trainerId === id);
    let players = [];

    for (let t of trainers) {
        let player = participants.find(p => p.id === t.participantId);
        players.push(player);
    }
    return players;
}
