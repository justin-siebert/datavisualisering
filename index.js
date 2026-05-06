function getCompDaysBySeason(season) {
    return seasons.filter(year => year.year == season)[0].competitionDays
}
console.log(getCompDaysBySeason(0))

function getEventsByParticipantIdAndSeason(participantId, year) {
    let events = [];
<<<<<<< Updated upstream
    for (let season of seasons){
        if(season.year === year){
            for(let day of season.competitionDays){
                for (let event of day.events){
                    for(let result of event.scores){
                        if(result.participantId === participantId){
=======
    for (let season of seasons) {
        if (season.year === year) {
            console.log("inne")
            for (let day of season.competitionDays) {
                for (let event of day.events) {
                    for (let result of event.scores) {
                        if (result.participantId === participantId) {
>>>>>>> Stashed changes
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
    const currSeason = seasons.find(s => s === season);

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

console.log(getDisciplineByIdAndSeason(2, 0))



let totalScore = 0;

const players = getPlayersWithTrainer(5, 0);

// for (p of players) {
//     totalScore += getTotalScore(p);
// }

function getPlayersWithTrainer(id, season) {
    // let players = [];
    const currSeason = seasons.find(s => s.year === season);

    // participantId & trainerId

    let trainers = currSeason.trainers.filter(t => t.trainerId === id);
    console.log(trainers);

    let players = [];

    for (let t of trainers) {
        console.log(t);
        console.log(t.participantId);


        // for(let t of trainers)
        let player = participants.find(p => {

            return p.id === t.participantId

        });
        if (player) {
            players.push(player);

        }
    }
    console.log(players);


    return players;

}



