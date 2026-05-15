const participantNameH1 = document.querySelector("#participantName")


// ------------------- SVG ----------------------
const svgH = 500, svgW = 800;
const hPadding = 50, wPadding = 80;

const svg = d3.select("svg")
    .attr("height", svgH)
    .attr("width", svgW)
    .style("border", "2px solid black")
;

let hightesScoreSeason = 0;

let pID = 125;

const xScale = d3.scaleBand()
    .domain([trainers.map((t) => t.name)])
    .range([wPadding, svgW - wPadding])
;

const yScale = d3.scaleLinear()
    .domain([])
    .range([svgH - hPadding, hPadding])
;

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

function getParticipantName (id){
    let participantName = participants.find((d) =>  d.id == pID) // objeket

    return participantName
}

participantNameH1.textContent = `Name : ${getParticipantName(pID).name}`

let statsPerYear = [
    // year : number
    // {trainer : id}
    // {discplin: Id}
    // totalscore: sum
];

for (let season of seasons){
    // {year: number},  {trainers: [{pID: number, tID: number}]}, {competitionDays: [{events: [{disciplin: number, scores: [{participantId: number, score: number}]}]}]}

    let year = season.year
    let idOftrainer = 0
    let totScore = 0
    let disciplinesIdsWScore = disciplines.map((d) => {
        return {"discipline": `${d.id}`, "totsum": 0}
    })
    
    
    for (let trainer of season.trainers) {
        if(trainer.participantId == pID){
            idOftrainer = trainer.trainerId // tränare id
        }
    }



    for (let competitionDay of season.competitionDays){
        for (let event of competitionDay.events){
            for (let x of event.scores){
                if (x.participantId == pID){
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

console.log(statsPerYear)