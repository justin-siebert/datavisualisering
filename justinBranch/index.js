function getAllPlayerStatsPerSeason (){
    let allPlayerStatsArray = [];

    for (p of participants){
        let statsPerYear = [
            // {year : number
            // trainer : id
            // discplin: [{discipline: id, totsum: 0}]
            //}
        ];

        for (let season of seasons){
            // {year: number},  {trainers: [{pID: number, tID: number}]}, {competitionDays: [{events: [{disciplin: number, scores: [{participantId: number, score: number}]}]}]}

            let year = season.year
            let idOftrainer = 0
            let totScore = 0
            let disciplinesIdsWScore = disciplines.map((d) => {
                return {"discipline": `${d.id}`, "totsum": 0, "count": 0}
            })
            
            for (let trainer of season.trainers) {
                if(trainer.participantId == p.id){
                    idOftrainer = trainer.trainerId // tränare id
                }
            }

            for (let competitionDay of season.competitionDays){
                for (let event of competitionDay.events){
                    for (let x of event.scores){
                        if (x.participantId == p.id){
                            let index = disciplinesIdsWScore.findIndex((d) => d.discipline == event.disciplineId)
                            disciplinesIdsWScore[index].totsum += x.score;
                            disciplinesIdsWScore[index].count += 1;
                        }
                    }
                }
            }
            
            statsPerYear.push({
                "year": year,
                "trainer": idOftrainer,
                "scorePerDiscpline": disciplinesIdsWScore
            })


        }
   
        allPlayerStatsArray.push({
            "playerId": p.id,
            "stats" : statsPerYear
        })
    }
    return allPlayerStatsArray
}

let allPlayerStats = getAllPlayerStatsPerSeason()

let highestAvgScoreAllP = 0;
for (let player of allPlayerStats){
    for (let i of player.stats){
        for (let j of i.scorePerDiscpline){
            highestAvgScoreAllP = Math.floor(j.totsum / j.count > highestAvgScoreAllP ? j.totsum/ j.count : highestAvgScoreAllP)
        }
    }
}

console.log(allPlayerStats)
console.log(highestAvgScoreAllP)