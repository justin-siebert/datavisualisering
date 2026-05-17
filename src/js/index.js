

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



