

// Hämtar lista på alla tillfällen som disciplin x kört i season y.
// function getDisciplineByIdAndSeason(id, season) {
//     const currSeason = getSeasonByYear(season);

//     let disciplines = [];

//     const events = getCompDaysBySeason(season)
//         .map(d => d.events)
//         .filter(e => {
//             for (let ev of e) {
//                 if (ev.disciplineId === id) {
//                     disciplines.push(ev);
//                     return true;
//                 }
//             }
//         });
//     return disciplines;
// }



// Total score av Trainer 5's deltagare varje season: 
for (let i = 0; i < seasons.length; i++) {
    console.log(`total season ${i}:`, getScoreOfTrainerBySeason(5, i));
}


// TOTAL SCORE FUNCTION
function getScoreOfTrainerBySeason(trainerId, season) {
    let totalScore = 0;
    const participants = getPlayersWithTrainer(trainerId, season);

    // Går igenom varje player som har trainern
    for (let p of participants) {
        totalScore += getTotalScore(p, season).total;
        p.eventScores = getTotalScore(p, season).eventScores;
    }
    const averageScore = totalScore / participants.length;

    return {
        trainerId,
        season,
        totalScore,
        averageScore,
        participants
    };
}

function getTotalScore(player, season) {
    let allScores = 0;
    let eventScores = [];

    for (let day of getCompDaysBySeason(season)) {
        for (let event of day.events) {
            const targetScore = event.scores.find(s => s.participantId === player.id);
            if (targetScore) {
                allScores += targetScore.score;
                eventScores.push(targetScore.score)
            }
        }
    }

    return { total: allScores, eventScores: eventScores };
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




let scoreData = [];

for (let i = 0; i < seasons.length; i++) {
    for (let j = 1; j < seasons.length; j++) {

        const trainerId = j;
        const trainerData = getScoreOfTrainerBySeason(trainerId, i);
        scoreData.push(trainerData);
    }
}

scoreData.sort((a, b) => {
    if (a.season !== b.season) return a.season - b.season;
    return b.totalScore - a.totalScore;
});

console.log("SCOREDATA: ", scoreData);

console.log(`participants with trainer ${scoreData[0].trainerId}:`, scoreData[0].participants);

const averageScoresS1Trainer2 = scoreData.filter(s => s.trainerId === 2).map(d => d.averageScore);

console.log(averageScoresS1Trainer2);

let biggestAvg = 0;


for (let s of scoreData) {

    if (s.averageScore > biggestAvg) biggestAvg = s.averageScore;

}
// Lista över Average score  
console.log(scoreData.filter(d => !isNaN(d.averageScore))
    .map(d => d.averageScore).sort((a, b) => a - b));





function getScoresOf(trainerId, disciplineId, season) {
    const players = getPlayersWithTrainer(trainerId, season)
    const compDays = getCompDaysBySeason(season)
    let scores = []

    for (let player of players) {
        for (let day of compDays) {
            for (let event of day.events) {
                if (event.disciplineId === disciplineId) {
                    const s = event.scores.find(s => s.participantId === player.id)
                    if (s) scores.push(s.score)
                }
            }
        }
    }
    let total = 0
    for (let score of scores) {
        total += score
    }
    const avg = players.length > 0
        ? total / players.length
        : null


    return { trainerId, disciplineId, scores, avg }
}

let seasonDisciplineData = {}

for (let season of seasons) {
    seasonDisciplineData[season.year] = {};
    console.log(`\n=== SEASON ${season.year} ===`)

    for (let discipline of disciplines) {
        seasonDisciplineData[season.year][discipline.id] = [];
        console.log(`  --- Discipline ${discipline.id} ---`)

        for (let trainer of trainers) {
            const result = getScoresOf(trainer.id, discipline.id, season.year);
            if (result.avg !== null) {
                seasonDisciplineData[season.year][discipline.id].push({
                    trainerId: trainer.id,
                    avg: Math.round(result.avg)
                })
            }
            console.log(`    T${trainer.id}: ${Math.round(result.avg)}`)
        }
    }
}


// FINNS EN SEASON DÄR TRAINER EJ HAR PARTICIPANTS ALLS -> filtrera bort den för att få korrekt.


console.log(seasonDisciplineData);


