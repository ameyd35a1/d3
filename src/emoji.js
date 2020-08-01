import { select, arc } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRadius = 30;
const eyebrowHeight = 15;
const eyebrowWidth = 70;
const eyebrowOffset = -70;

const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

const circle = g.append('circle')
    .attr('r', height / 2)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

const eyesG = g.append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`);

const leftEye = eyesG.append('circle')
    .attr('r', eyeRadius)
    .attr('cx', -eyeSpacing)

const rightEye = eyesG.append('circle')
    .attr('r', eyeRadius)
    .attr('cx', eyeSpacing)


const eyebrowsG = eyesG.append('g')
    .attr('transform', `translate(0, ${eyebrowOffset})`);

eyebrowsG
    .transition().duration(2000)
    .attr('transform', `translate(0, ${eyebrowOffset - 50})`)
    .transition().duration(2000)
    .attr('transform', `translate(0, ${eyebrowOffset})`)

const leftEyebrow = eyebrowsG.append('rect')
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight)
    .attr('x', -eyeSpacing - eyebrowWidth / 2)
//.attr('y', eyebrowOffset)


const rightEyebrow = eyebrowsG.append('rect')
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight)
    .attr('x', eyeSpacing - eyebrowWidth / 2)
//.attr('y', eyebrowOffset)



const mouth = g.append('path').attr('d', arc()({
    innerRadius: 130,
    outerRadius: 150,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 3 / 2
}))



