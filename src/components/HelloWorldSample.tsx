import { Component, createElement, createRef } from "react";
import {SeatMapCanvas} from '@alisaitteke/seatmap-canvas'
import '@alisaitteke/seatmap-canvas/dist/cjs/seatmap.canvas.css'

export interface HelloWorldSampleProps {
    sampleText?: string;
    seatMap?:any;
    mountSeatmap?: boolean;
    containerRef?:any;
    config?:any;
    blocks?:any;
    seatClick?:any;
    className?:any;
    zoomManager?: any;
    parentRef?: any;
}

export class HelloWorldSample extends Component<HelloWorldSampleProps> {
    private seatMap:any;
    private mountSeatmap: boolean;
    private config;
    private blocks:any[];
    private seatClick;
    private className;
    private containerRef:any;


    constructor(props:any) {
        super(props);
        this.mountSeatmap = false;
        this.config = defaultConfig();
        this.blocks = [];
        this.seatClick = props.seatClick;
        this.className = props.className;
        this.containerRef = createRef();
        this.state = {parentRef: null, mountSeatmap: false, blocks:[]};
    }

    public getSelectedSeats(){
        return this.seatMap.data.getSelectedSeats()
    }

    public replaceData(blocks:any){
        this.blocks = blocks;
        this.seatMap.data.replaceData(this.blocks);
    }

    public zoomToVenue(){
        this.seatMap.zoomManager.zoomToVenue();
    }

    componentDidMount(): void {
        let self = this;
        setTimeout(
            function() {
                let blocks = generateRandomBlocks();
                // this.setState({ blocks: blocks});
                self.replaceData(blocks);
            },
            3000
        );
    }


    componentDidUpdate() {
        console.warn([this.props, "component did update"]);

        if(!this.props.parentRef){
            return;
        }

        if(!this.blocks){
            throw new Error('Blocks data not found')
        }
        if (!this.mountSeatmap) {
            this.mountSeatmap = true;
            this.setState({
                parentRef: this.props.parentRef,
                mountSeatmap: true
            });
            
        }else{
            this.seatMap = new SeatMapCanvas("#seatmap-container", this.config);
            if (this.seatClick) {
                this.seatMap.eventManager.addEventListener("SEAT.CLICK", this.seatClick);
            }
        }
        
    }

    render() {
        console.warn("rerender", this.props);
        return (
            <div className={this.className} style={{height: '100%'}} id={'seatmap-container'} ref={this.containerRef}></div>
        );
        
    }
}

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
                color: "color", // can use item.color from json data
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
            seats.push(seat)
        }

        last_x = block_final_x + 100;

        let block = {
            "id": `block-${j}`,
            "title": blockTitle,
            "labels": [],
            "color": color,
            "seats": seats
        };

        blocks.push(block);
    }

    return blocks;
}


const defaultConfig= function(){
    return {
        legend: true,
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