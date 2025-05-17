import * as d3 from "d3"
import { useEffect, useRef } from "react"
import { type DataRecord } from "../dashboard"

interface YearlyTrendChartProps {
  data: DataRecord[]
}

const YearlyTrendChart = ({ data }: YearlyTrendChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) {
      return
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Filter data to include only records with year and intensity values
    const validData = data.filter(
      d =>
        (d.start_year !== null && d.start_year !== undefined) ||
        (d.end_year !== null && d.end_year !== undefined)
    )

    if (validData.length === 0) return

    // Prepare data for yearly trends, using either start_year or end_year (prefer start_year)
    const yearsData = validData
      .map(d => ({
        year: d.start_year || d.end_year || 0,
        intensity: d.intensity || 0,
        relevance: d.relevance || 0,
        likelihood: d.likelihood || 0
      }))
      .filter(d => d.year > 0) // Filter out invalid years

    // Group by year
    const yearlyData = Array.from(
      d3.rollup(
        yearsData,
        v => ({
          intensity: d3.mean(v, d => d.intensity),
          relevance: d3.mean(v, d => d.relevance),
          likelihood: d3.mean(v, d => d.likelihood),
          count: v.length
        }),
        d => d.year
      ),
      ([year, values]) => ({
        year,
        intensity: values.intensity || 0,
        relevance: values.relevance || 0,
        likelihood: values.likelihood || 0,
        count: values.count
      })
    ).sort((a, b) => a.year - b.year) // Sort by year

    // Set up dimensions
    const margin = { top: 30, right: 100, bottom: 50, left: 60 }
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
      .domain(d3.extent(yearlyData, d => d.year) as [number, number])
      .range([0, width])

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(yearlyData, d =>
          Math.max(d.intensity, d.relevance, d.likelihood)
        ) || 0
      ])
      .nice()
      .range([height, 0])

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-height)
          .tickFormat(() => "")
      )
      .selectAll(".tick line")
      .style("stroke", "#e0e0e0")

    svg
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => "")
      )
      .selectAll(".tick line")
      .style("stroke", "#e0e0e0")

    // Create line generators
    const intensityLine = d3
      .line<{ year: number; intensity: number }>()
      .x(d => x(d.year))
      .y(d => y(d.intensity))
      .curve(d3.curveMonotoneX)

    const relevanceLine = d3
      .line<{ year: number; relevance: number }>()
      .x(d => x(d.year))
      .y(d => y(d.relevance))
      .curve(d3.curveMonotoneX)

    const likelihoodLine = d3
      .line<{ year: number; likelihood: number }>()
      .x(d => x(d.year))
      .y(d => y(d.likelihood))
      .curve(d3.curveMonotoneX)

    // Draw axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => d.toString()))

    svg.append("g").call(d3.axisLeft(y))

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Year")

    // Add y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Average Value")

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Yearly Trends")

    // Create tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "rgba(255, 255, 255, 0.95)")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", "1000")

    // Draw intensity line
    svg
      .append("path")
      .datum(yearlyData)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2)
      .attr("d", intensityLine)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength()
        return `${length} ${length}`
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength()
      })
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)

    // Draw relevance line
    svg
      .append("path")
      .datum(yearlyData)
      .attr("fill", "none")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 2)
      .attr("d", relevanceLine)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength()
        return `${length} ${length}`
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength()
      })
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)

    // Draw likelihood line
    svg
      .append("path")
      .datum(yearlyData)
      .attr("fill", "none")
      .attr("stroke", "#f59e0b")
      .attr("stroke-width", 2)
      .attr("d", likelihoodLine)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength()
        return `${length} ${length}`
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength()
      })
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)

    // Add hover-interactive data points for intensity
    yearlyData.forEach(d => {
      // Intensity point
      svg
        .append("circle")
        .attr("cx", x(d.year))
        .attr("cy", y(d.intensity))
        .attr("r", 5)
        .attr("fill", "#4f46e5")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0)
        .transition()
        .delay(2000)
        .duration(300)
        .attr("opacity", 1)
        .on("end", function () {
          d3.select(this)
            .style("cursor", "pointer")
            .on("mouseover", function (event) {
              d3.select(this).attr("r", 7)
              tooltip.transition().duration(200).style("opacity", 0.9)
              tooltip
                .html(
                  `
                <div style="font-weight:bold;border-bottom:1px solid #ddd;padding-bottom:4px;margin-bottom:4px">
                  Year: ${d.year}
                </div>
                <div style="color:#4f46e5;font-weight:bold">Intensity: ${d.intensity.toFixed(2)}</div>
                <div style="color:#10b981">Relevance: ${d.relevance.toFixed(2)}</div>
                <div style="color:#f59e0b">Likelihood: ${d.likelihood.toFixed(2)}</div>
              `
                )
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 28 + "px")
            })
            .on("mouseout", function () {
              d3.select(this).attr("r", 5)
              tooltip.transition().duration(500).style("opacity", 0)
            })
        })

      // Relevance point
      svg
        .append("circle")
        .attr("cx", x(d.year))
        .attr("cy", y(d.relevance))
        .attr("r", 5)
        .attr("fill", "#10b981")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0)
        .transition()
        .delay(2000)
        .duration(300)
        .attr("opacity", 1)
        .on("end", function () {
          d3.select(this)
            .style("cursor", "pointer")
            .on("mouseover", function (event) {
              d3.select(this).attr("r", 7)
              tooltip.transition().duration(200).style("opacity", 0.9)
              tooltip
                .html(
                  `
                <div style="font-weight:bold;border-bottom:1px solid #ddd;padding-bottom:4px;margin-bottom:4px">
                  Year: ${d.year}
                </div>
                <div style="color:#4f46e5">Intensity: ${d.intensity.toFixed(2)}</div>
                <div style="color:#10b981;font-weight:bold">Relevance: ${d.relevance.toFixed(2)}</div>
                <div style="color:#f59e0b">Likelihood: ${d.likelihood.toFixed(2)}</div>
              `
                )
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 28 + "px")
            })
            .on("mouseout", function () {
              d3.select(this).attr("r", 5)
              tooltip.transition().duration(500).style("opacity", 0)
            })
        })

      // Likelihood point
      svg
        .append("circle")
        .attr("cx", x(d.year))
        .attr("cy", y(d.likelihood))
        .attr("r", 5)
        .attr("fill", "#f59e0b")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0)
        .transition()
        .delay(2000)
        .duration(300)
        .attr("opacity", 1)
        .on("end", function () {
          d3.select(this)
            .style("cursor", "pointer")
            .on("mouseover", function (event) {
              d3.select(this).attr("r", 7)
              tooltip.transition().duration(200).style("opacity", 0.9)
              tooltip
                .html(
                  `
                <div style="font-weight:bold;border-bottom:1px solid #ddd;padding-bottom:4px;margin-bottom:4px">
                  Year: ${d.year}
                </div>
                <div style="color:#4f46e5">Intensity: ${d.intensity.toFixed(2)}</div>
                <div style="color:#10b981">Relevance: ${d.relevance.toFixed(2)}</div>
                <div style="color:#f59e0b;font-weight:bold">Likelihood: ${d.likelihood.toFixed(2)}</div>
              `
                )
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 28 + "px")
            })
            .on("mouseout", function () {
              d3.select(this).attr("r", 5)
              tooltip.transition().duration(500).style("opacity", 0)
            })
        })
    })

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width + 10}, 0)`)
      .attr("class", "legend")

    // Intensity legend
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#4f46e5")

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 12)
      .text("Intensity")
      .style("font-size", "12px")

    // Relevance legend
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#10b981")

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 37)
      .text("Relevance")
      .style("font-size", "12px")

    // Likelihood legend
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 50)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#f59e0b")

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 62)
      .text("Likelihood")
      .style("font-size", "12px")

    // Cleanup on component unmount
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

export default YearlyTrendChart
