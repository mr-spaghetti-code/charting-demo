const width = 960
const height = 500
const margin = { top: 120, bottom: 160, left: 50, right: 50}
const x = d3.scaleTime().range([margin.left, width - margin.right ])
    .domain([new Date('12/1/2005'), new Date('1/1/2011') ])
const y = d3.scaleLinear().range([height - margin.bottom, margin.top ])
    .domain([0, 330])

d3.json("apple.json", function(error, json) {
if (error) throw error;

var line = d3.line()
.x(function (d) {return x(new Date (d.Date))})
.y(function (d) {return y(d.Close)})

const svg = d3.select("svg")

svg.append('g')
.attr('class', 'lineChart')

svg.select("g.lineChart")
.datum(json)
.append("path")
.attr("d", line)

const yAxis = d3.axisLeft(y).ticks(3).tickFormat(function(d){ return "$" + d})
const xAxis = d3.axisBottom(x)
svg.append("g")
.attr("class", "axis y")
.attr("transform", "translate(" + margin.left + ", 0)")
.call(yAxis);
svg.append("g")
.attr("class", "axis x")
.attr("transform", "translate(0,"+ (height - margin.bottom) +")")
.call(xAxis);

const annotations = [
//moved recession annotation to front of array so it's behind 
//the Macbook Air annotation
{
    note: { 
    title: "Recession GDP -5.1%", 
    lineType: "none", 
    align: "middle",
    wrap: 150 //custom text wrapping
    },
    subject: {
    height: height - margin.top - margin.bottom,
    width: x(new Date("6/1/2009")) - x(new Date("12/1/2007"))
    },
    type: d3.annotationCalloutRect,
    y: margin.top,
    disable: ["connector"], // doesn't draw the connector
    //can pass "subject" "note" and "connector" as valid options
    dx: (x(new Date("6/1/2009")) - x(new Date("12/1/2007")))/2,
    data: { x: "12/1/2007"}
},
{
    subject: {
    text: "A",
    x: "right" //badges have an x of "left" or "right"
    },
    data: { x: "1/10/2006", y: 80.9}
},
{
    subject: { text: "B" },
    data: { x: "6/29/2007", y: 122}
},
{
    subject: {
    text: "C",
    y: "bottom" //badges have a y of "top" or "bottom"
    },
    data: { x: "1/29/2008", y: 131.5}
},
{
    subject: {
    text: "D",
    y: "bottom",
    x: "right"
    },
    data: { x: "4/3/2010", y: 238}
}]

const type = d3.annotationCustomType(
d3.annotationBadge, 
{"subject":{"radius": 10 }}
)

const makeAnnotations = d3.annotation()
.type(type)
.accessors({ 
    x: function(d){ return x(new Date(d.x))},
    y: function(d){ return y(d.y) }
})
.annotations(annotations)

d3.select("svg")
.append("g")
.attr("class", "annotation-group")
.call(makeAnnotations)


//annotations for legend
const annotationsLegend = [{
    note: { label: "MacBook Pro Release" },
    subject: { text: "A" }
},
{
    note: { label: "iPhone Release" },
    subject: { text: "B" }
},
{
    note: { label: "Macbook Air" },
    subject: { text: "C" }
},
{
    note: { label: "iPad Release" },
    subject: { text: "D" }
}
].map(function(d, i){
    d.x = margin.left + i*200
    d.y = 415 
    d.subject.x = "right" 
    d.subject.y = "bottom" 
    d.subject.radius = 10
    return d
})

const makeLegendAnnotations = d3.annotation()
.type(d3.annotationBadge)
.annotations(annotationsLegend)

d3.select("svg")
.append("g")
.attr("class", "annotation-legend")
.call(makeLegendAnnotations)

d3.select("svg g.annotation-legend")
.selectAll('text.legend')
.data(annotationsLegend)
.enter()
.append('text')
.attr('class', 'legend')
.text(function(d){ return d.note.label })
.attr('x', function(d, i){ return margin.left + 30 + i*200 })
.attr('y', 430)

});

