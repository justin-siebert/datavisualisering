
console.log(getCompDaysBySeason(0))

function getEventsByParticipantIdAndSeason(participantId, year) {
    let events = [];
    for (let season of seasons) {
        if (season.year === year) {
            for (let day of season.competitionDays) {
                for (let event of day.events) {
                    for (let result of event.scores) {
                        if (result.participantId === participantId) {
                            events.push(event)
                        }
                    }
                }
            }
        }
    }
    return events
}


// Hämtar lista på alla tillfällen som disciplin x kört i season y.
function getDisciplineByIdAndSeason(id, season) {
    const currSeason = getSeasonByYear(season);

    let disciplines = [];

    const events = getCompDaysBySeason(season)
        .map(d => d.events)
        .filter(e => {
            for (let ev of e) {
                if (ev.disciplineId === id) {
                    disciplines.push(ev);
                    return true;
                }
            }
        });
    return disciplines;
}


for (let i = 0; i < seasons.length; i++) {
    console.log("total:", getScoreOfTrainerBySeason(5, i));
}



// TOTAL SCORE FUNCTION
function getScoreOfTrainerBySeason(trainerId, season) {
    let totalScore = 0;
    const players = getPlayersWithTrainer(trainerId, season);

    console.log(`Players with trainer ${trainerId}:`, players);

    // Går igenom varje player som har trainern
    for (let p of players) {
        console.log(p);
        totalScore += getTotalScore(p, season)
    }
    console.log(totalScore)
    // Summa adderad
    return totalScore;
}

function getTotalScore(player, season) {
    let allScores = 0;

    for (let day of getCompDaysBySeason(season)) {
        for (let event of day.events) {
            const targetScore = event.scores.find(s => s.participantId === player.id);
            if (targetScore) allScores += targetScore.score;
        }
    }
    console.log("Player:", player, "Score:", allScores);

    return allScores;
}



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


// Hämtar relevant competitionDays baserat på år.
function getCompDaysBySeason(season) {
    return seasons.filter(year => year.year == season)[0].competitionDays
}


// Hämtar season baserat på år (0)
function getSeasonByYear(year) {
    return seasons.find(s => s.year === year);
}