import type { LikelihoodStats } from "@/services/reports/types"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

interface LikelihoodChartProps {
  chartData: LikelihoodStats[]
}

const LikelihoodChart = ({ chartData }: LikelihoodChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!chartData || chartData.length === 0 || !svgRef.current) {
      return
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up dimensions
    const margin = { top: 30, right: 30, bottom: 50, left: 50 }
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
      .scaleLinear()
      .domain([0, d3.max(chartData, d => d.likelihood) || 0])
      .range([0, width])

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, d => d.count) || 0])
      .nice()
      .range([height, 0])

    // Create line generator
    const line = d3
      .line<{ likelihood: number; count: number }>()
      .curve(d3.curveCatmullRom)
      .x(d => x(d.likelihood))
      .y(d => y(d.count))

    // Create area generator
    const area = d3
      .area<{ likelihood: number; count: number }>()
      .curve(d3.curveCatmullRom)
      .x(d => x(d.likelihood))
      .y0(height)
      .y1(d => y(d.count))

    // Create gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "likelihood-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#8b5cf6")

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8b5cf680")

    // Create tooltip
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
      .call(
        d3
          .axisBottom(x)
          .ticks(10)
          .tickFormat(d => d.toString())
      )

    svg.append("g").call(d3.axisLeft(y))

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Likelihood Value")

    // Add y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Number of Records")

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Likelihood Distribution")

    // Draw area
    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "url(#likelihood-gradient)")
      .attr("d", area)
      .attr("opacity", 0)
      .on("mouseover", function () {
        d3.select(this).attr("opacity", 1)
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 0.8)
      })
      .transition()
      .duration(1000)
      .attr("opacity", 0.8)

    // Draw line
    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#8b5cf6")
      .attr("stroke-width", 2)
      .attr("d", line)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength()
        return `${length} ${length}`
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength()
      })
      .transition()
      .duration(1500)
      .attr("stroke-dashoffset", 0)

    // Add data points
    svg
      .selectAll(".dot")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.likelihood))
      .attr("cy", d => y(d.count))
      .attr("r", 0)
      .attr("fill", "#8b5cf6")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9)
        tooltip
          .html(
            `<strong>Likelihood:</strong> ${d.likelihood}<br/><strong>Count:</strong> ${d.count}`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
        d3.select(event.currentTarget).attr("r", 7).attr("stroke-width", 2)
      })
      .on("mouseout", event => {
        tooltip.transition().duration(500).style("opacity", 0)
        d3.select(event.currentTarget).attr("r", 5).attr("stroke-width", 1)
      })
      .transition()
      .delay(1500)
      .duration(500)
      .attr("r", 5)
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

export default LikelihoodChart
