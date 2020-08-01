import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const xValue = d => d.Population;
    const yValue = d => d.Continent;
    const margin = { top: 40, right: 20, bottom: 50, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //For various formatting refer to http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);


    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);

    const xAxisTickFormat = number => format('.3s')(number).replace('G', 'B');

    //const yAxis = axisLeft(yScale);
    const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight)     //vertical tick lines


    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //yAxis(g.append('g')); or
    g.append('g')
        .call(axisLeft(yScale))
        .selectAll('.domain, .tick line')      //remove the tick line
        .remove();

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

    //remove the tick line
    xAxisG
        .select('.domain')
        .remove();

    //Name the X Axis
    xAxisG.append('text')
        .attr('y', 40)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text('Population')
        .attr('class', 'axis-label')


    g.selectAll('rect').data(data)
        .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth());

    g.append('text')
        .attr('y', -10)
        .text('Population of Continents')
        .attr('class', 'title');
}

csv('../data/Population.csv').then(data => {
    data.forEach(d => d.Population = +d.Population);  //converting to number
    console.log(data);
    render(data);
});

