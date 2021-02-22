import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Scatterplot = (props) => {
  const width = 1000,
    height = 800,
    margin = { left: 40, top: 25, bottom: 35, right: 40 };

  const svgRef = useRef();

  const x = d3.scaleLinear()
    .domain(d3.extent(props.data, d => d.danceability)).nice()
    .range([margin.left, width - margin.right]);
  const y = d3.scaleLinear()
    .domain(d3.extent(props.data, d => d.energy)).nice()
    .range([height - margin.bottom, margin.top]);

  const xAxis = g => g.attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
      .attr("x", width)
      .attr("y", margin.bottom - 4)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .text('Danceability →'))

  const yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
      .attr("x", -margin.left)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text('↑ Energy'))

  const grid = g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
      .attr("x1", d => 0.5 + x(d))
      .attr("x2", d => 0.5 + x(d))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
      .attr("y1", d => 0.5 + y(d))
      .attr("y2", d => 0.5 + y(d))
      .attr("x1", margin.left)
      .attr("x2", width - margin.right));

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.append('g')
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .selectAll("circle")
      .data(props.data)
      .join("circle")
      .attr("cx", d => x(d.danceability))
      .attr("cy", d => y(d.energy))
      .attr("r", 3);

    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("text")
      .data(props.data)
      .join("text")
      .attr("dy", "0.35em")
      .attr("x", d => x(d.danceability) + 7)
      .attr("y", d => y(d.energy))
      .text(d => d.name);

    svg.append('g')
      .call(xAxis)

    svg.append('g')
      .call(yAxis)

    svg.append('g')
      .call(grid)

  }, [props.data])

  return (
    <div style={{ height: '700px' }}>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  )
}

export default Scatterplot;