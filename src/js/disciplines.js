

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

// let scoreData = [];

// for (let i = 0; i < seasons.length; i++) {
//     for (let j = 1; j < seasons.length; j++) {

//         const trainerId = j;
//         const trainerData = getScoreOfTrainerBySeason(trainerId, i);
//         scoreData.push(trainerData);
//     }
// }

// scoreData.sort((a, b) => {
//     if (a.season !== b.season) return a.season - b.season;
//     return b.totalScore - a.totalScore;
// });


function getTotalAvgScoreOf(trainerId, disciplineId, season) {
    const players = getPlayersWithTrainer(trainerId, season)
    const compDays = getCompDaysBySeason(season)

    let playerAvgs = []

    for (let player of players) {
        let playerTotal = 0
        let playedCount = 0

        for (let day of compDays) {
            for (let event of day.events) {
                if (event.disciplineId === disciplineId) {
                    const s = event.scores.find(s => s.participantId === player.id)
                    if (s) {
                        playerTotal += Math.round(s.score);
                        playedCount++;
                    }
                }
            }
        }
        if (playedCount > 0) {
            const playerAvg = playerTotal / playedCount;
            playerAvgs.push(Math.round(playerAvg));
            console.log(`P${player.id}: total ${playerTotal}, count ${playedCount}, avg ${Math.round(playerAvg)}`)
        }
    }
    let total = 0;
    for (let avg of playerAvgs) {
        total += avg;
    }
    console.log(total);

    const avg = playerAvgs.length > 0
        ? total / playerAvgs.length
        : null

    Math.round(avg);
    return { trainerId, disciplineId, avg }
}


function getSeasonDisciplineData() {
    let data = {};

    for (let season of seasons) {
        data[season.year] = {};
        console.log(`\n=== SEASON ${season.year} ===`)

        for (let discipline of disciplines) {
            data[season.year][discipline.id] = [];
            console.log(`--- Discipline ${discipline.id} ---`)

            for (let trainer of trainers) {
                const result = getTotalAvgScoreOf(trainer.id, discipline.id, season.year);

                data[season.year][discipline.id].push({
                    trainerId: trainer.id,
                    specialized: trainer.disciplineId === discipline.id,
                    avg: result.avg !== null ? Math.round(result.avg) : 0
                })
            }
        }
    }
    return data;
}
console.log(getSeasonDisciplineData());















