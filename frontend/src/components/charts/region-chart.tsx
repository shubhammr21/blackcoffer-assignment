import type { RegionStats } from "@/services/reports/types"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

interface RegionChartProps {
  chartData: RegionStats[]
}

const RegionChart = ({ chartData }: RegionChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!chartData || chartData.length === 0 || !svgRef.current) {
      return
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up dimensions
    const margin = { top: 30, right: 20, bottom: 70, left: 120 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = svgRef.current.clientHeight - margin.top - margin.bottom

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Set up scales
    const y = d3
      .scaleBand()
      .domain(chartData.map(d => d.region))
      .range([0, height])
      .padding(0.2)

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, d => d.intensity) || 0])
      .nice()
      .range([0, width])

    // Color scale
    const color = d3
      .scaleSequential()
      .domain([0, chartData.length - 1])
      .interpolator(d3.interpolateBlues)

    // Draw axes
    svg.append("g").call(d3.axisLeft(y))

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Average Intensity")

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Intensity by Region")

    // Create tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)")

    // Draw bars with transition
    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.region) || 0)
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", 0)
      .attr("fill", (_d, i) => color(i))
      .attr("rx", 4)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9)
        tooltip
          .html(
            `<strong>${d.region}</strong><br/>Intensity: ${d.intensity.toFixed(2)}`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
        d3.select(event.currentTarget)
          .attr("opacity", 0.7)
          .attr("stroke", "#333")
          .attr("stroke-width", 1)
      })
      .on("mouseout", event => {
        tooltip.transition().duration(500).style("opacity", 0)
        d3.select(event.currentTarget).attr("opacity", 1).attr("stroke", "none")
      })
      .transition()
      .duration(800)
      .delay((_d, i) => i * 100)
      .attr("width", d => x(d.intensity))

    // Add value labels
    svg
      .selectAll(".label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("y", d => (y(d.region) || 0) + y.bandwidth() / 2)
      .attr("x", d => x(d.intensity) + 5)
      .attr("dy", ".35em")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .style("opacity", 0)
      .text(d => d.intensity.toFixed(2))
      .transition()
      .duration(800)
      .delay((_d, i) => i * 100 + 800)
      .style("opacity", 1)
    // Cleanup on unmount
    return () => {
      d3.select("body").selectAll(".tooltip").remove()
    }
  }, [chartData])

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
}

export default RegionChart
