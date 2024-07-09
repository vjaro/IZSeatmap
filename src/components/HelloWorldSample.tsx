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
    private blocks:any;
    private seatClick;
    private className;
    private containerRef:any;
    public css:any;


    constructor(props:any) {
        super(props);
        this.mountSeatmap = false;
        this.config = props.config;
        this.blocks = props.blocks;
        this.seatClick = props.seatClick;
        this.className = props.className;
        this.containerRef = createRef();
    }

    public getSelectedSeats(){
        return this.seatMap.data.getSelectedSeats()
    }

    public replaceData(blocks:any){
        this.blocks = blocks;
        this.seatMap?.data?.replaceData(this.blocks);
    }

    public zoomToVenue(){
        if(this.seatMap){
            this.seatMap.zoomManager.zoomToVenue();
        }
    }

    componentDidMount(): void {
        if(!this.props.parentRef){
            return;
        }

        if(!this.blocks){
            throw new Error('Blocks data not found')
        }

        if (!this.mountSeatmap) {
            this.mountSeatmap = true;
            this.seatMap = new SeatMapCanvas("#seatmap-container", this.config);
            if(this.seatClick){
                this.seatMap.eventManager.addEventListener("SEAT.CLICK", this.seatClick);
            }
        }
    }  

    componentDidUpdate(){

        let self = this;
        setTimeout(
            function() {
                self.replaceData(self.props.blocks);
                console.warn(self.props);
            },
            500
        );
    }

    render() {
        console.warn("rerender", this.props);
        return (
            <div className={this.className} style={{height: '50vh'}} id={'seatmap-container'} ref={this.containerRef}></div>
        );
        
    }
}


