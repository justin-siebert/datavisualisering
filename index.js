const svgH = 500, svgW = 800;
const hPadding = 50, wPadding = 80;

const svg = d3.select("svg")
    .attr("height", svgH)
    .attr("width", svgW)
    .style("border", "2px solid black")
;

let hightesScoreSeason = 0;


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

