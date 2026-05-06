function getCompDaysBySeason(season) {
    return seasons.filter(year => year.year == season)[0].competitionDays
}
console.log(getCompDaysBySeason(0))

function getEventsByParticipantIdAndSeason(participantId, year){
    let events = [];
    for (let season of seasons){
        if(season.year === year){
            for(let day of season.competitionDays){
                for (let event of day.events){
                    for(let result of event.scores){
                        if(result.participantId === participantId){
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




