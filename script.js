let videoGameDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
let videoGameData

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawTreeMap = () => {

    let hierarchy = d3.hierarchy(videoGameData, (node) => {
        return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']
    })

    let createTreeMap = d3.treemap()
                            .size([1000, 600])
                           
    
    createTreeMap(hierarchy)

    let videoGameTiles = hierarchy.leaves()
    console.log(videoGameTiles)

    let block = canvas.selectAll('g')
            .data(videoGameTiles)
            .enter()
            .append('g')
            .attr('transform', (videoGame) => {
                return 'translate(' + videoGame['x0'] + ', ' + videoGame['y0'] + ')'
            })

    block.append('rect')
            .attr('class', 'tile')
            .attr('fill', (videoGame) => {
                let category = videoGame['data']['category']
                if(category === 'Wii'){
                    return 'orange'
                }else if(category === 'X360'){
                    return 'lightgreen'
                }else if(category === 'NES'){
                    return 'coral'
                }else if(category === 'SNES'){
                    return 'purple'
                }else if(category === 'GB'){
                    return 'lightblue'
                }else if(category === 'DS'){
                    return 'pink'
                }else if(category === '3DS'){
                    return 'khaki'
                }else if(category === 'PS2'){
                    return 'tan'
                }else if(category === 'N64'){
                    return 'red'
                }else if(category === 'PSP'){
                    return 'cyan'
                }else if(category === 'PS3'){
                    return 'lime'
                }else if(category === 'GBA'){
                    return 'lavender'
                }else if(category === 'PS4'){
                    return 'steelblue'
                }else if(category === 'PS'){
                    return 'lightsteelblue'
                }else if(category === 'PC'){
                    return 'grey'
                }else if(category === 'XB'){
                    return 'green'
                }else if(category === 'XOne'){
                    return 'forestgreen'
                }else if(category === '2600'){
                    return 'yellow'
                }
            }).attr('data-name', (videoGame) => {
                return videoGame['data']['name']
            }).attr('data-category', (videoGame) => {
                return videoGame['data']['category']
            })
            .attr('data-value', (videoGame) => {
                return videoGame['data']['value']
            })
            .attr('width', (videoGame) => {
                return videoGame['x1'] - videoGame['x0']
            })
            .attr('height', (videoGame) => {
                return videoGame['y1'] - videoGame['y0']
            })
            .on('mouseover', (event, videoGame) => {
                tooltip.transition()
                        .style('visibility', 'visible')

                let revenue = videoGame['data']['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")


                tooltip.html(
                    '$ ' + revenue + '<hr />' + videoGame['data']['name']
                )

                tooltip.attr('data-value', videoGame['data']['value'])
            })
            .on('mouseout', (event, videoGame) => {
                tooltip.transition()
                        .style('visibility', 'hidden')
            })

            block.append("text")

    .attr('class', 'tile-text')

    .selectAll("tspan")

    .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })

    .enter().append("tspan")

    .attr("x", 4)

    .attr("y", function(d, i) { return 13 + i * 10; })

    .text(function(d) { return d; });
}

d3.json(videoGameDataUrl).then(
    (data, error) => {
        if(error){
            console.log(error)
        } else {
            videoGameData = data
            console.log(videoGameData)
            drawTreeMap()
        }
    }
)