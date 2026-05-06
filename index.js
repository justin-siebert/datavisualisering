function getCompDaysBySeason (season){
    return seasons.filter(year => year.year == season)[0].competitionDays
}

console.log(getCompDaysBySeason(0))

function getEventsByParticipantIdAndSeason(participantId, year){
    let events = [];
    for (let season of seasons){
        if(season.year === year){
            console.log("inne")
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

console.log(getEventsByParticipantIdAndSeason(25, 0))

