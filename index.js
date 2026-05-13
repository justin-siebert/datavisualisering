
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