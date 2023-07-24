
function final_project() {
    starter();
}

let starter = function () {
    map();
    d3.csv('ali-wong-edited.csv').then(function (data) {
        bar_chart(data);
    });
    arc_diag();
}

const h1 = "Playfair Display"
const p = "Lato"

let map = function () {
    // State Symbol dictionary for conversion of names and symbols.
    let stateSym = {
        AZ: 'Arizona',
        AL: 'Alabama',
        AK: 'Alaska',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DC: 'District of Columbia',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming'
    };

    // data
    let data = {
        'California': 11,
        'Colorado': 1,
        'Georgia': 1,
        'Hawaii': 1,
        'Illinois': 1,
        'Massachusetts': 2,
        'Minnesota': 1,
        'Nevada': 1,
        'New Jersey': 1,
        'New York': 4,
        'Oregon': 2,
        'Texas': 8,
        'Washington': 3
    }

    // Process data to get total sales per state
    let salesByState = {};
    for (let key in stateSym) {
        if (Object.keys(data).includes(stateSym[key])) { //if the current state initials exist in current data
            salesByState[key] = data[stateSym[key]];
        } else {
            salesByState[key] = 0;
        }
    }
    //console.log(salesByState);

    // set the dimensions and margins of the graph
    let margin = { top: 100, right: 30, bottom: 50, left: 50 },
        width = 1200 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    const svg = d3.select("#map")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create a color scale
    const colorScale = d3.scaleQuantize()
        .domain([0, d3.max(Object.values(salesByState))])
        .range(["#fff7ec", "#fff7eb", "#fff6ea", "#fff6e9", "#fff5e7", "#fff5e6", "#fff4e5", "#fff4e4", "#fff3e3", "#fff3e2", "#fff2e1", "#fff2e0", "#fff1de", "#fff1dd", "#fff0dc", "#fff0db", "#feefda", "#feefd9", "#feeed7", "#feeed6", "#feedd5", "#feedd4", "#feecd3", "#feecd2", "#feebd0", "#feebcf", "#feeace", "#feeacd", "#fee9cc", "#fee9ca", "#fee8c9", "#fee8c8", "#fee7c7", "#fee7c6", "#fee6c4", "#fee5c3", "#fee5c2", "#fee4c1", "#fee4bf", "#fee3be", "#fee3bd", "#fee2bc", "#fee1ba", "#fee1b9", "#fee0b8", "#fee0b7", "#fedfb5", "#fedeb4", "#fedeb3", "#fdddb2", "#fddcb1", "#fddcaf", "#fddbae", "#fddaad", "#fddaac", "#fdd9ab", "#fdd8a9", "#fdd8a8", "#fdd7a7", "#fdd6a6", "#fdd6a5", "#fdd5a4", "#fdd4a3", "#fdd4a1", "#fdd3a0", "#fdd29f", "#fdd29e", "#fdd19d", "#fdd09c", "#fdcf9b", "#fdcf9a", "#fdce99", "#fdcd98", "#fdcc97", "#fdcc96", "#fdcb95", "#fdca94", "#fdc994", "#fdc893", "#fdc892", "#fdc791", "#fdc690", "#fdc58f", "#fdc48e", "#fdc38d", "#fdc28c", "#fdc18b", "#fdc08a", "#fdbf89", "#fdbe88", "#fdbd87", "#fdbc86", "#fdbb85", "#fdba84", "#fdb983", "#fdb882", "#fdb781", "#fdb680", "#fdb57f", "#fdb47d", "#fdb27c", "#fdb17b", "#fdb07a", "#fdaf79", "#fdae78", "#fdac76", "#fdab75", "#fdaa74", "#fca873", "#fca772", "#fca671", "#fca46f", "#fca36e", "#fca26d", "#fca06c", "#fc9f6b", "#fc9e6a", "#fc9c68", "#fc9b67", "#fb9a66", "#fb9865", "#fb9764", "#fb9563", "#fb9462", "#fb9361", "#fb9160", "#fa905f", "#fa8f5e", "#fa8d5d", "#fa8c5c", "#f98b5b", "#f9895a", "#f98859", "#f98759", "#f88558", "#f88457", "#f88356", "#f78155", "#f78055", "#f77f54", "#f67d53", "#f67c52", "#f67b52", "#f57951", "#f57850", "#f4774f", "#f4754f", "#f4744e", "#f3734d", "#f3714c", "#f2704c", "#f26f4b", "#f16d4a", "#f16c49", "#f06b49", "#f06948", "#ef6847", "#ef6646", "#ee6545", "#ed6344", "#ed6243", "#ec6042", "#ec5f42", "#eb5d41", "#ea5c40", "#ea5a3f", "#e9593e", "#e8573c", "#e8563b", "#e7543a", "#e65339", "#e65138", "#e55037", "#e44e36", "#e44c35", "#e34b34", "#e24932", "#e14831", "#e04630", "#e0442f", "#df432e", "#de412d", "#dd402b", "#dc3e2a", "#dc3c29", "#db3b28", "#da3927", "#d93826", "#d83624", "#d73423", "#d63322", "#d53121", "#d43020", "#d32e1f", "#d22c1e", "#d12b1d", "#d0291b", "#cf281a", "#ce2619", "#cd2518", "#cc2317", "#cb2216", "#ca2015", "#c91f14", "#c81d13", "#c71c12", "#c61b11", "#c51911", "#c31810", "#c2170f", "#c1150e", "#c0140d", "#bf130c", "#be120c", "#bc110b", "#bb100a", "#ba0e09", "#b80d09", "#b70c08", "#b60b07", "#b50b07", "#b30a06", "#b20906", "#b10805", "#af0705", "#ae0704", "#ac0604", "#ab0504", "#a90503", "#a80403", "#a60402", "#a50302", "#a40302", "#a20302", "#a00201", "#9f0201", "#9d0201", "#9c0101", "#9a0101", "#990101", "#970101", "#960100", "#940100", "#920000", "#910000", "#8f0000", "#8e0000", "#8c0000", "#8a0000", "#890000", "#870000", "#860000", "#840000", "#820000", "#810000", "#7f0000"]);

    // Load US states data
    d3.json("us-states.json").then(function (usData) {

        // Create a map projection
        const projection = d3.geoAlbersUsa().fitSize([width, height], usData);

        // Create a geopath generator
        const path = d3.geoPath().projection(projection);

        // Create tooltip
        const tooltip = d3.select("#map")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("padding", "5px")
            .style("position", "relative");

        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(usData.features)
            .enter().append("path")
            .attr("fill", d => colorScale(salesByState[d.properties.name] || 0))
            .attr("d", path)
            .attr("stroke", "black")
            .on("mouseover", function (event, d) {
                // Calculate sales
                let visits = salesByState[d.properties.name];

                // Update tooltip
                tooltip.style("opacity", 1);
                tooltip.html("Tours: " + visits.toFixed(2))
                    .style("position", "absolute")
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY) + "px");
            })
            .on("mouseout", function () {
                tooltip.style("opacity", 0);
            });

    });

    // Set up legend
    const legendWidth = 200;
    const legendHeight = 20;

    const legendColors = ["#fff7ec", "#fff7eb", "#fff6ea", "#fff6e9", "#fff5e7", "#fff5e6", "#fff4e5", "#fff4e4", "#fff3e3", "#fff3e2", "#fff2e1", "#fff2e0", "#fff1de", "#fff1dd", "#fff0dc", "#fff0db", "#feefda", "#feefd9", "#feeed7", "#feeed6", "#feedd5", "#feedd4", "#feecd3", "#feecd2", "#feebd0", "#feebcf", "#feeace", "#feeacd", "#fee9cc", "#fee9ca", "#fee8c9", "#fee8c8", "#fee7c7", "#fee7c6", "#fee6c4", "#fee5c3", "#fee5c2", "#fee4c1", "#fee4bf", "#fee3be", "#fee3bd", "#fee2bc", "#fee1ba", "#fee1b9", "#fee0b8", "#fee0b7", "#fedfb5", "#fedeb4", "#fedeb3", "#fdddb2", "#fddcb1", "#fddcaf", "#fddbae", "#fddaad", "#fddaac", "#fdd9ab", "#fdd8a9", "#fdd8a8", "#fdd7a7", "#fdd6a6", "#fdd6a5", "#fdd5a4", "#fdd4a3", "#fdd4a1", "#fdd3a0", "#fdd29f", "#fdd29e", "#fdd19d", "#fdd09c", "#fdcf9b", "#fdcf9a", "#fdce99", "#fdcd98", "#fdcc97", "#fdcc96", "#fdcb95", "#fdca94", "#fdc994", "#fdc893", "#fdc892", "#fdc791", "#fdc690", "#fdc58f", "#fdc48e", "#fdc38d", "#fdc28c", "#fdc18b", "#fdc08a", "#fdbf89", "#fdbe88", "#fdbd87", "#fdbc86", "#fdbb85", "#fdba84", "#fdb983", "#fdb882", "#fdb781", "#fdb680", "#fdb57f", "#fdb47d", "#fdb27c", "#fdb17b", "#fdb07a", "#fdaf79", "#fdae78", "#fdac76", "#fdab75", "#fdaa74", "#fca873", "#fca772", "#fca671", "#fca46f", "#fca36e", "#fca26d", "#fca06c", "#fc9f6b", "#fc9e6a", "#fc9c68", "#fc9b67", "#fb9a66", "#fb9865", "#fb9764", "#fb9563", "#fb9462", "#fb9361", "#fb9160", "#fa905f", "#fa8f5e", "#fa8d5d", "#fa8c5c", "#f98b5b", "#f9895a", "#f98859", "#f98759", "#f88558", "#f88457", "#f88356", "#f78155", "#f78055", "#f77f54", "#f67d53", "#f67c52", "#f67b52", "#f57951", "#f57850", "#f4774f", "#f4754f", "#f4744e", "#f3734d", "#f3714c", "#f2704c", "#f26f4b", "#f16d4a", "#f16c49", "#f06b49", "#f06948", "#ef6847", "#ef6646", "#ee6545", "#ed6344", "#ed6243", "#ec6042", "#ec5f42", "#eb5d41", "#ea5c40", "#ea5a3f", "#e9593e", "#e8573c", "#e8563b", "#e7543a", "#e65339", "#e65138", "#e55037", "#e44e36", "#e44c35", "#e34b34", "#e24932", "#e14831", "#e04630", "#e0442f", "#df432e", "#de412d", "#dd402b", "#dc3e2a", "#dc3c29", "#db3b28", "#da3927", "#d93826", "#d83624", "#d73423", "#d63322", "#d53121", "#d43020", "#d32e1f", "#d22c1e", "#d12b1d", "#d0291b", "#cf281a", "#ce2619", "#cd2518", "#cc2317", "#cb2216", "#ca2015", "#c91f14", "#c81d13", "#c71c12", "#c61b11", "#c51911", "#c31810", "#c2170f", "#c1150e", "#c0140d", "#bf130c", "#be120c", "#bc110b", "#bb100a", "#ba0e09", "#b80d09", "#b70c08", "#b60b07", "#b50b07", "#b30a06", "#b20906", "#b10805", "#af0705", "#ae0704", "#ac0604", "#ab0504", "#a90503", "#a80403", "#a60402", "#a50302", "#a40302", "#a20302", "#a00201", "#9f0201", "#9d0201", "#9c0101", "#9a0101", "#990101", "#970101", "#960100", "#940100", "#920000", "#910000", "#8f0000", "#8e0000", "#8c0000", "#8a0000", "#890000", "#870000", "#860000", "#840000", "#820000", "#810000", "#7f0000"];
    const legendScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(salesByState))])
        .range([0, legendWidth]);

    svg.append("defs")
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", height - margin.bottom * 2)
        .attr("x2", legendWidth)
        .attr("y2", height - margin.bottom * 2)
        .selectAll("stop")
        .data(legendColors)
        .enter().append("stop")
        .attr("offset", (d, i) => i / (legendColors.length - 1))
        .attr("stop-color", d => d);

    svg.append("rect")
        .attr("x", 0)
        .attr("y", height - margin.bottom * 2 - legendHeight)

        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legend-gradient)");

    const legendAxis = d3.axisBottom(legendScale).ticks(5);
    svg.append("g")
        .attr("class", "legend-axis")
        .attr("transform", `translate(0, ${height - margin.bottom * 2})`)
        .call(legendAxis);

    svg.append('text')
        .attr('x', 0)
        .attr('y', height - margin.bottom * 2 - legendHeight - 10)
        .style('font-size', 10)
        .text('Legend of visits');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .style('font-size', 20)
        .style('font-family', p)
        .text('Ali Wong\'s tour frequency in each state, 2015-2017');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 10)
        .attr('text-anchor', 'middle')
        .style('font-size', 12)
        .style('font-family', p)
        .text(`Ali Wong toured through 12 states around the timeframe where she released Baby Cobra.
        \nLet\'s see where these visits were!`);

}


let bar_chart = function (data) {

    data.forEach(d => {
        d.laugh = +d.laugh
        d.start = +d.start
        d.stop = +d.stop
    });

    /* Create the canvas */
    let margin = { top: 50, right: 30, bottom: 40, left: 30 },
        width = 1200 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#bar_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Create axes
    const xscale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.stop)])
        .range([margin.left, width]);

    const yscale = d3.scaleLinear()
        .domain([d3.max(data, d => d.laugh), 0])
        .range([0, 600]);


    // Axes
    const xaxis = d3.axisBottom().scale(xscale);
    const yaxis = d3.axisLeft().scale(yscale);

    svg.append('g').call(xaxis).attr('class', 'xAxis').attr("transform", `translate(${0}, ${600})`)
        .selectAll("text").attr("transform", `translate(0, 10)`).style("text-anchor", "end");
    svg.append('g').call(yaxis).attr('class', 'yAxis').attr("transform", `translate(${margin.left}, 0)`);

    // Legend
    // Create Color scheme "#F49D37"
    const colorMapping = {
        "regular": "#3F88C5",
        "selected": "#D72638",
        "empty": "#FFFFFF"
    };

    const color = d3.scaleOrdinal()
        .domain(Object.keys(colorMapping))
        .range(Object.values(colorMapping));

    /* Interactive tooltip */
    const tooltip = d3.select("#bar_chart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("padding", "5px")
        .style("position", "absolute");

    // Draw bar chart
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => (d.start === 0) ? xscale(d.start) + 1 : xscale(d.start))
        .attr("y", d => yscale(d.laugh))
        .attr("width", d => (d.start === 0) ? (xscale(d.stop) - xscale(d.start)) - 1 : (xscale(d.stop) - xscale(d.start)))
        .attr("height", d => 600 - yscale(d.laugh))
        .attr("fill", color("regular"))
        .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", color("selected"));

            // Update tooltip
            tooltip.style("opacity", 1);
            tooltip.html("Topic: " + d.topic)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY) + "px")

        })
        .on("mouseout", function () {
            d3.select(this).attr("fill", color("regular"));
            tooltip.style("opacity", 0);
        })
        .each(function (d) {
            if (d.laugh === 0) {
                d3.select(this)
                    .attr("y", d => 500)
                    .attr("height", 100)
                    .attr("fill", "white")
                    .on("mouseover", function (event, d) {
                        d3.select(this).attr("fill", color("empty"));

                        // Update tooltip
                        tooltip.style("opacity", 1);
                        tooltip.html("Topic: " + d.topic + ", No laughs")
                            .style("left", (event.pageX) + "px")
                            .style("top", (event.pageY) + "px");

                    })
                    .on("mouseout", function () {
                        d3.select(this).attr("fill", "white");
                        tooltip.style("opacity", 0);
                    })
            }
        });


    // chart title
    svg.append('text')
        .attr('x', width / 2-30)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .style('font-size', 20)
        .style('font-family', p)
        .text('Number of laughter by topic (in chronological order)');

    svg.append('text')
        .attr('x', width / 2-30)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .style('font-size', 12)
        .style('font-family', p)
        .style('font-weight', 300)
        .text("Note: Each bar represents a topic in the show.");

    svg.append('text')
        .attr('x', width / 2-30)
        .attr('y', 55)
        .attr('text-anchor', 'middle')
        .style('font-size', 12)
        .style('font-family', p)
        .style('font-weight', 300)
        .text("Since she talks about the topics for different durations, the widths are also different. ");


    // axis label
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom * 1.5)
        .attr('text-anchor', 'middle')
        .style('font-size', 15)
        .text('Time (by seconds)');

    svg.append('text')
        .attr('x', -height / 2)
        .attr('y', 0)
        .attr('transform', 'rotate(-90)')
        .style('font-size', 15)
        .text('Number of laughs');


    // const legendX = width / 2 - 100
    // const legendY = 50

    // //color scheme
    // svg.selectAll("#bar_chart")
    //     .data(Object.keys(colorMapping))
    //     .enter()
    //     .append("circle")
    //     .attr("cx", legendX)
    //     .attr("cy", function (d, i) { return legendY + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
    //     .attr("r", 7)
    //     .style("fill", function (d) { return color(d) })


    // // Add one dot in the legend for each name.
    // svg.selectAll("body")
    //     .data(["regular", "selected", "empty"])
    //     .enter()
    //     .append("text")
    //     .attr("x", legendX + 20)
    //     .attr("y", function (d, i) { return legendY + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
    //     .style("fill", function (d) { return color(d) })
    //     .text(function (d) {
    //         if (d == "empty") {
    //             return "empty: no laughs in this topic"
    //         } else {
    //             return d
    //         }
    //     })
    //     .attr("text-anchor", "left")
    //     .style("alignment-baseline", "middle")
    //     .style("font-family", p);


}

let arc_diag = function () {

    // spacing factor
    const spacing = 1.25;

    // set the dimensions and margins of the graph
    const margin = { top: 0, right: 30, bottom: 100, left: 60 };
    const width = 1100 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Read dummy data
    d3.json('references.json').then(function (data) {
        // List of node names
        const allNodes = data.nodes.map(d => d.name);

        // List of groups
        const allGroups = [...new Set(data.nodes.map(d => d.grp))];

        // A color scale for groups
        const color = d3.scaleOrdinal()
            .domain(allGroups)
            .range(['#e76f51', '#f4a261', '#e9c46a', '#8ab17d', '#2a9d8f', '#287271', '#264653']);

        // A linear scale for node size
        const size = d3.scaleLinear()
            .domain([1, 3])
            .range([5, 7]);

        // A linear scale to position the nodes on the X axis
        const x = d3.scalePoint()
            .range([0, width / spacing])
            .domain(allNodes);

        // In my input data, links are provided between nodes -id-, NOT between node names.
        // So I have to do a link between this id and the name
        const idToNode = new Map(data.nodes.map(d => [d.id, d]));

        // Add the links
        const links = svg.selectAll('mylinks')
            .data(data.links)
            .join('path')
            .attr('d', d => {
                const start = x(idToNode.get(d.source).name) * spacing; // X position of start node on the X axis
                const end = x(idToNode.get(d.target).name) * spacing; // X position of end node
                return `M ${start} ${height - 30} A ${(end - start) / 2}, ${(end - start) / 2} 0 0, ${start < end ? 1 : 0} ${end}, ${height - 30}`;
            })
            .style("fill", "none")
            .attr("stroke", "grey")
            .style("stroke-width", 1);

        // Add the circle for the nodes
        const nodes = svg.selectAll("mynodes")
            .data(data.nodes)
            .join("circle")
            .attr("cx", d => x(d.name) * spacing)
            .attr("cy", height - 30)
            .attr("r", d => size(d.freq))
            .style("fill", d => color(d.grp))
            .attr("stroke", "white");

        // Set general font sizes
        const reg_size = 10;
        const highlight_size = 15;
        const relative_size = 12;
        const irrelevant_size = 5;

        // And give them a label
        const labels = svg.selectAll("mylabels")
            .data(data.nodes)
            .join("text")
            .attr("x", 0)
            .attr("y", 0)
            .text(d => d.name)
            .style("text-anchor", "end")
            .attr("transform", d => `translate(${x(d.name) * spacing},${height - 15})rotate(-90)`)
            .style("font-size", reg_size)
            .style('font-family', "Lato");

        // Add the highlighting functionality
        nodes
            .on('mouseover', (event, d) => {
                // Highlight the nodes: every node is green except for him
                nodes.style('opacity', .2);
                d3.select(event.currentTarget).style('opacity', 1);
                // Highlight the connections
                links
                    .style('stroke', link_d => (link_d.source === d.id || link_d.target === d.id) ? color(d.grp) : '#b8b8b8')
                    .style('stroke-opacity', link_d => (link_d.source === d.id || link_d.target === d.id) ? 1 : .2)
                    .style('stroke-width', link_d => (link_d.source === d.id || link_d.target === d.id) ? 3 : 1);
                labels
                    .style("font-size", label_d => {
                        if (label_d.name === d.name) {
                            return highlight_size;
                        } else if (d.connections.includes(label_d.id)) {
                            return relative_size;
                        } else {
                            return irrelevant_size;
                        }
                    })
                    .attr("y", label_d => label_d.name === d.name ? 10 : 0);
            })
            .on('mouseout', () => {
                nodes.style('opacity', 1);
                links
                    .style('stroke', 'grey')
                    .style('stroke-opacity', .8)
                    .style('stroke-width', '1');
                labels.style("font-size", reg_size);
            });

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', 75)
            .attr('text-anchor', 'middle')
            .style('font-size', 20)
            .text('Baby Cobra Topics and Their References')
            .style('font-family', "Lato");

        const legendX = 20//width - 120
        const legendY = 120

        //color scheme
        svg.append('text')
            .attr('x', legendX*4-5)
            .attr('y', legendY - 20)
            .attr('text-anchor', 'middle')
            .style('font-size', 15)
            .text('Legend of themes ')
            .style('font-family', "Lato");

        svg.selectAll("#arc_diag")
            .data(allGroups)
            .enter()
            .append("circle")
            .attr("cx", legendX)
            .attr("cy", function (d, i) { return legendY + i * 15 }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function (d) { return color(d) })


        // Add one dot in the legend for each name.
        svg.selectAll("body")
            .data(allGroups)
            .enter()
            .append("text")
            .attr("x", legendX + 20)
            .attr("y", function (d, i) { return legendY + i * 15 }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) { return color(d) })
            .text(function (d) { return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-family", p)
            .style("font-size", "10");

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom/1.5)
            .attr('text-anchor', 'middle')
            .style('font-size', 15)
            .text('Topics')
            .style('font-family', "Lato");

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom/1.5 + 20)
            .attr('text-anchor', 'middle')
            .style('font-size', 12)
            .text('Note: each node\'s size references the number of times it has been referenced')
            .style('font-weight', 300)
            .style('font-family', "Lato");
    });



}






