import { Component, ReactNode, createElement,createRef } from "react";
// import { createElement ,useState } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { IZSeatmapContainerProps } from "../typings/IZSeatmapProps";

import "./ui/IZSeatmap.css";

export class IZSeatmap extends Component<IZSeatmapContainerProps> {
    ref:any;
    blocks:any[];
    config:any;

    constructor(props:any){
        super(props);
        this.state = {ref:null};
        this.ref = createRef();
        this.blocks = generateRandomBlocks();
        this.config = defaultConfig();

    }
    componentDidMount(): void {
        this.setState({ref: this.ref});
    }

    seatClick(seat:any){
        console.warn(seat);
        seat.item.selectedToggle();
    }

    render(): ReactNode {
        console.warn(["IZSeatmap render"], this.ref);
        return (
            
            <div>
                <HelloWorldSample 
                    ref={this.ref} 
                    parentRef={this.ref} 
                    seatClick={this.seatClick}
                    config={this.config}
                    blocks={this.blocks}
            />
            </div>
        );
    }
}


const defaultConfig= function(){
    return {
        legend: true,
        // click_enable_sold_seats: false,
        lang: {
            "selectable": "Available",
            "non_selectable": "Not Available",
            "your_selection": "Selected"
        },
        style: {
            seat: {
                hover: '#8fe100',
                color: '#f0f7fa',
                selected: '#8fe100',
                check_icon_color: '#fff',
                not_salable: '#0088d3',
                focus: '#8fe100',
            },
            legend: {
                font_color: '#3b3b3b',
                show: false
            },
            block: {
                title_color: '#fff'
            }
        }
    }
}
// export default function IZSeatmap(){
//     const [ref, setRef] = useState();
//     return <HelloWorldSample ref={setRef} parentRef={ref} />;

// }

const generateRandomBlocks = function () {
    let block_colors = ["#01a5ff", "#fccf4e", "#01a5ff", "#01a5ff"];
    let blocks = []
    let last_x = 0;
    for (let j = 0; j < 1; j++) { // blocks

        let color = block_colors[j];

        let seats = []
        let cell_count = 0;
        let row_count = 0;
        let block_final_x = 0;
        let randomSeatCount = Math.round((Math.random() * (Math.abs(400 - 200))) + 200)
        let randomCell = Math.round((Math.random() * (Math.abs(28 - 12))) + 12)
        let blockTitle = `Block ${j + 1}`;

        for (let k = 0; k < randomSeatCount; k++) { // row
            if (k % randomCell === 0) {
                cell_count = 1;
                row_count++;
            }

            let x = (cell_count * 33) + last_x;
            let y = row_count * 30;

            if (block_final_x < x) block_final_x = x;
            let salable = Math.ceil(Math.random() * 10) > 3;
            let randomPrice = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) * 10

            let seat = {
                id: `s-${k}`,
                x: x,
                y: y,
                color: color, // can use item.color from json data
                salable: salable,
                custom_data: {
                    any: "things",
                    price: randomPrice,
                    basket_name: `${blockTitle} - ${cell_count} ${row_count}`
                },
                note: "note test",
                tags: {},
                title: `${blockTitle}\n${cell_count} ${row_count}`
            }
            cell_count++;
            if(seat.salable){
                seats.push(seat)
            }
        }

        last_x = block_final_x + 100;

        let block = {
            "id": `block-${j}`,
            // "title": blockTitle,
            "labels": [],
            "color": color,
            "seats": seats
        };

        blocks.push(block);
    }

    return blocks;
}



