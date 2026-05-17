const participantNameH1 = document.querySelector("#participantName")

let statsPerYear = [
    // {year : number
    // trainer : id
    // discplin: [{discipline: id, totsum: 0}]
    //}
];

let allPlayerStats = []

for(let p of participants){
    getPlayerStatsPerSeason(p.id)
}

let highestScoreAllP = 0;
for (let player of allPlayerStats){
    for (let i of player.stats){
        for (let j of i.scorePerDiscpline){
            highestScoreAllP = j.totsum > highestScoreAllP ? j.totsum : highestScoreAllP
        }
    }
}

console.log(allPlayerStats)
console.log(highestScoreAllP)

//let pID = getPlayerStatsPerSeason(125);

// function getParticipantName (id){
//     let participantName = participants.find((d) =>  d.id == pID) // objeket

//     return participantName
// }

//participantNameH1.textContent = `Name : ${getParticipantName(pID).name}`



function getPlayerStatsPerSeason (id){
    statsPerYear = []

    for (let season of seasons){
        // {year: number},  {trainers: [{pID: number, tID: number}]}, {competitionDays: [{events: [{disciplin: number, scores: [{participantId: number, score: number}]}]}]}

        let year = season.year
        let idOftrainer = 0
        let totScore = 0
        let disciplinesIdsWScore = disciplines.map((d) => {
            return {"discipline": `${d.id}`, "totsum": 0}
        })
        
        
        for (let trainer of season.trainers) {
            if(trainer.participantId == id){
                idOftrainer = trainer.trainerId // tränare id
            }
        }



        for (let competitionDay of season.competitionDays){
            for (let event of competitionDay.events){
                for (let x of event.scores){
                    if (x.participantId == id){
                        let index = disciplinesIdsWScore.findIndex((d) => d.discipline == event.disciplineId)
                        disciplinesIdsWScore[index].totsum += x.score
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

        
    allPlayerStats.push({
        "playerId": id,
        "stats" : statsPerYear
    })
        
}
console.log(statsPerYear)

// ------------------- SVG ----------------------
const svgH = 500, svgW = 800;
const hPadding = 50, wPadding = 80;

const svg = d3.select("svg")
    .attr("height", svgH)
    .attr("width", svgW)
    .style("border", "2px solid black")
;

const xScale = d3.scaleBand()
    .domain(statsPerYear.map((d) => d.year))
    .range([wPadding, svgW - wPadding])
    .paddingInner(.1)
    .paddingOuter(.2)
;

const xSubScale = d3.scaleBand()
    .domain(disciplines.map((d)=> d.id)) 
    .range([0, xScale.bandwidth()]) // Range är bredden på ETT år (xScale.bandwidth())
    .padding(0.2)
;

let highestScore = 0
for (let d of statsPerYear){
    d.scorePerDiscpline.forEach((s) =>{
        highestScore = s.totsum > highestScore ? s.totsum : highestScore
    })
}

console.log(highestScore)
const yScale = d3.scaleLinear()
    .domain([0, highestScore])
    .range([svgH - hPadding, hPadding])
;

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("transform", `translate(0,${svgH - hPadding })` )
    .call(xAxis)
;

// ----- Grupp för varje år -----
const yearGroups = svg.append("g")
    .selectAll("g")
    .data(statsPerYear)
    .enter()
    .append("g")
    .attr("transform", d => `translate(${xScale(d.year)}, 0)`)
;

yearGroups.selectAll("rect")
    .data(d => d.scorePerDiscpline) 
    .enter()
    .append("rect")
    .attr("x", d => xSubScale(d.discipline))
    .attr("y", d => yScale(d.totsum))
    .attr("height", d => yScale(0) - yScale(d.totsum))
    .attr("width", xSubScale.bandwidth())
    .attr("fill", d => {
        const colors = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f"];
        return colors[d.discipline - 1] || "gray";
    })
    .attr("stroke", "black")
    .attr("stroke-width", 1)
;