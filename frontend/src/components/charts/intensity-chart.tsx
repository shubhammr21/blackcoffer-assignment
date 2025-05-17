import * as d3 from "d3"
import { useEffect, useRef } from "react"
import { type DataRecord } from "../dashboard"

interface IntensityChartProps {
  data: DataRecord[]
}

const IntensityChart = ({ data }: IntensityChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) {
      return
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Filter data to include only records with intensity value
    const validData = data.filter(
      d => d.intensity !== null && d.intensity !== undefined
    )

    if (validData.length === 0) return

    // Group data by sector and calculate average intensity
    const sectorData = d3.rollup(
      validData,
      v => d3.mean(v, d => d.intensity || 0),
      d => d.sector || "Unknown"
    )

    // Convert Map to array for easier manipulation
    const chartData = Array.from(sectorData, ([sector, intensity]) => ({
      sector,
      intensity: Number((intensity ?? 0).toFixed(2))
    }))
      .filter(d => d.sector !== "Unknown") // Filter out Unknown if you want
      .sort((a, b) => b.intensity - a.intensity) // Sort by intensity
      .slice(0, 10) // Take top 10 for readability

    // Set up dimensions
    const margin = { top: 30, right: 30, bottom: 100, left: 60 }
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
    const x = d3
      .scaleBand()
      .domain(chartData.map(d => d.sector))
      .range([0, width])
      .padding(0.3)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, d => d.intensity) || 0])
      .nice()
      .range([height, 0])

    // Create gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "intensity-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#6366f1")

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#8b5cf6")

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

    // Draw axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,10)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "12px")

    svg.append("g").call(d3.axisLeft(y))

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Average Intensity by Sector")

    // Add y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Average Intensity")

    // Draw bars with transition
    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.sector) || 0)
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "url(#intensity-gradient)")
      .attr("rx", 4)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9)
        tooltip
          .html(`<strong>${d.sector}</strong><br/>Intensity: ${d.intensity}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
        d3.select(event.currentTarget)
          .attr("opacity", 0.8)
          .attr("stroke", "#333")
          .attr("stroke-width", 1)
      })
      .on("mouseout", event => {
        tooltip.transition().duration(500).style("opacity", 0)
        d3.select(event.currentTarget).attr("opacity", 1).attr("stroke", "none")
      })
      .transition()
      .duration(1000)
      .attr("y", d => y(d.intensity))
      .attr("height", d => height - y(d.intensity))

    // Add value labels on top of bars
    svg
      .selectAll(".label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => (x(d.sector) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.intensity) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("opacity", 0)
      .text(d => d.intensity)
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1)
    // Cleanup on unmount
    return () => {
      d3.select("body").selectAll(".tooltip").remove()
    }
  }, [data])

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
}

export default IntensityChart
