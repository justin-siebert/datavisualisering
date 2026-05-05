const ringSelectionHeight = 500, ringSelectionWidth = 800;
const rshPadding = 50, rswPadding = 80;

const contentWidth = ringSelectionWidth - rswPadding * 2;
const colWidth = contentWidth / 3;
const r = colWidth * 0.4;

const ringsPostion = [
  // top
  { x: rswPadding + colWidth * 0.5, y: rshPadding + 100, color: "blue" },
  { x: rswPadding + colWidth * 1.5, y: rshPadding + 100, color: "black" },
  { x: rswPadding + colWidth * 2.5, y: rshPadding + 100, color: "red" },

  // bottom
  { x: rswPadding + colWidth * 1, y: rshPadding + 200, color: "yellow" },
  { x: rswPadding + colWidth * 2, y: rshPadding + 200, color: "green" },
];

const ringSelection = d3.select("#ringSelection")
    .attr("height", ringSelectionHeight)
    .attr("width", ringSelectionWidth)
    .style("border", "1px solid black")
;

const ringGroup = ringSelection.append("g")
    .classed("ringGroup", true)
;

const textGroupRings = ringSelection.append("g")
    .classed("textGroupRings", true)
;

function olympicRings () {
    ringGroup.selectAll("*").transition().duration(300).attr("r", 0).remove()

    const rings = ringGroup.selectAll("circle")
        .data(ringsPostion)
        .enter()
        .append("circle")
        .attr("cy", d => d.y)
        .attr("cx", d => d.x)
        .attr("r", 0)
        .attr("fill", "transparent")
        .attr("stroke", "beige")
        .attr("stroke-width", 5)
        //.on("click") Glöm inte ändra den
    ;

    const ringsTransition = rings.transition().duration(500).attr("r", r);

    const disciplinesText = textGroupRings.selectAll("text")
        .data(ringsPostion)
        .enter()
        .append("text")
        .attr("y", d => d.y)
        .attr("x", d => d.x)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text((d, i) => disciplines[i].name)
    ;


}

olympicRings()
