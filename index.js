const hSvg = window.innerHeight, wSvg = window.innerWidth;

const ringRadius = 75;
const ringSpacing = 100;

const olympics = [
    { "continent": "Europe", "color": "blue", "row": "top" },
    { "continent": "Asia", "color": "yellow", "row": "bottom" },
    { "continent": "Afrika", "color": "black", "row": "top" },
    { "continent": "Oceania", "color": "green", "row": "bottom"},
    { "continent": "America", "color": "red", "row": "top"}
];

const svg = d3.select("svg")
    .attr("height", hSvg)
    .attr("width", wSvg)
    .style("display", "block")
;

const mainGroup = svg.append("g")
    .classed("mainG", true)
    .attr("transform", `translate(${wSvg / 2 - (ringSpacing * 2)}, ${hSvg / 2 - 25})`);
;

const circleGroup = mainGroup.append("g")
    .classed("circleGroup", true)
;

const textGroup = mainGroup.append("g")
    .classed("textGroup", true)
;

function createIntro (){

    circleGroup.selectAll("circle")
        .data(olympics)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => i * ringSpacing)
        .attr("cy", d => d.row === "top" ? 0 : 50) 
        .attr("r", 0)

        .attr("opacity", 0)
        .attr("fill", "none")
        .attr("stroke", d => d.color)
        .attr("stroke-width", 8)

        .transition()             
        .duration(2000)
        .delay((d, i) => i * 300)
        .ease(d3.easeBackOut)
        .attr("r", ringRadius)
        .attr("opacity", 1)
    ;

    textGroup.selectAll("text")
        .data(olympics, d => d.continent)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * ringSpacing)
        .attr("y", d => d.row === "top" ? 0 : 50)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("opacity", 0)
        .text(d => d.continent)
        .transition()
        .delay(1500)
        .duration(1000)
        .attr("opacity", 1)
    ;
}

createIntro();