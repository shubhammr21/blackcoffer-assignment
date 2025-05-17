import * as d3 from "d3"
import { useEffect, useRef } from "react"
import { type DataRecord } from "../DataDashboard"

interface TopicChartProps {
  data: DataRecord[]
}

const TopicChart = ({ data }: TopicChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) {
      return
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Filter data to include only records with topic values
    const validData = data.filter(
      d => d.topic !== null && d.topic !== undefined && d.topic !== ""
    )

    if (validData.length === 0) return

    // Count occurrences of each topic
    const topicCounts = d3.rollup(
      validData,
      v => v.length,
      d => d.topic || "Unknown"
    )

    // Convert Map to array for easier manipulation
    const chartData = Array.from(topicCounts, ([topic, count]) => ({
      topic,
      count
    }))
      .filter(d => d.topic !== "Unknown") // Filter out Unknown if you want
      .sort((a, b) => b.count - a.count) // Sort by count descending
      .slice(0, 10) // Take top 10 for readability

    // Calculate total for percentage
    const total = chartData.reduce((sum, item) => sum + item.count, 0)

    // Set up dimensions
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const radius = Math.min(width, height) / 2
    const innerRadius = radius * 0.6 // For donut chart

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    // Set up color scale
    const color = d3
      .scaleOrdinal<string>()
      .domain(chartData.map(d => d.topic))
      .range(d3.schemeCategory10)

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

    // Set up pie layout
    const pie = d3
      .pie<{ topic: string; count: number }>()
      .value(d => d.count)
      .sort(null)

    // Set up arc generator
    const arc = d3
      .arc<d3.PieArcDatum<{ topic: string; count: number }>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)

    // Create smaller arc for labels
    const labelArc = d3
      .arc<d3.PieArcDatum<{ topic: string; count: number }>>()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.8)

    // Create donut chart with transitions
    const arcs = svg
      .selectAll(".arc")
      .data(pie(chartData))
      .enter()
      .append("g")
      .attr("class", "arc")

    // Add slices with transition
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.topic))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.8)
      .on("mouseover", (event, d) => {
        const percentage = ((d.data.count / total) * 100).toFixed(1)
        tooltip.transition().duration(200).style("opacity", 0.9)
        tooltip
          .html(
            `<strong>${d.data.topic}</strong><br/>Count: ${d.data.count}<br/>${percentage}% of total`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
        d3.select(event.currentTarget)
          .style("opacity", 1)
          .style("stroke-width", "3px")
      })
      .on("mouseout", event => {
        tooltip.transition().duration(500).style("opacity", 0)
        d3.select(event.currentTarget)
          .style("opacity", 0.8)
          .style("stroke-width", "2px")
      })
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return function (t) {
          return arc(i(t)) || ""
        }
      })

    // Add percentage labels with transition
    arcs
      .append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .style("fill", "#fff")
      .style("opacity", 0)
      .text(d => {
        const percentage = ((d.data.count / total) * 100).toFixed(1)
        return percentage + "%"
      })
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1)

    // Add title
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", -height / 2 + 20)
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Topics Distribution")

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${radius + 20},${-radius + 40})`)
      .attr("class", "legend")

    const legendItems = legend
      .selectAll(".legend-item")
      .data(chartData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_d, i) => `translate(0,${i * 20})`)

    legendItems
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", d => color(d.topic))

    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .style("font-size", "10px")
      .style("text-anchor", "start")
      .text(d => {
        const topicText =
          d.topic.length > 15 ? d.topic.substring(0, 15) + "..." : d.topic
        return `${topicText} (${d.count})`
      })

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

export default TopicChart
