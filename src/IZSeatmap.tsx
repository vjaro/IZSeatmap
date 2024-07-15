import { PureComponent, ReactNode, createElement,createRef, Fragment } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { IZSeatmapContainerProps } from "../typings/IZSeatmapProps";
import { defaultConfig } from "./SeatMapHelper";

import "./ui/IZSeatmap.css";

export class IZSeatmap extends PureComponent<IZSeatmapContainerProps> {
    ref:any;
    blocks:any[] = [];
    config:any;
    key:any
    triggerComponentRender: boolean = true;

    constructor(props:any){
        super(props);
        this.ref = createRef();
        this.config = defaultConfig();
        console.warn(props.props, "my props");
    }

    seatClick(seat:any){
        console.warn(seat);
        seat.item.selectedToggle();
        this.triggerComponentRender = false;
        let seatmaptemplateId = this.props.seat_map_template_id;
        let seatItem = null;
        if(this.props.data && this.props.data.items){
            this.props.data.items.map((item:any) => {
                const helper = seatmaptemplateId?.get(item).displayValue;
                if(helper == seat.item.id){
                    seatItem = item;
                    return;
                }
            });
        }

        if(seatItem){
            let seatClickAction = this.props.seatClickAction?.get(seatItem);
            seatClickAction?.execute();
        }
    }

    shouldComponentUpdate(): boolean {
        return this.triggerComponentRender;
    }

    render(): ReactNode {
        console.warn(["IZSeatmap render"], this.ref, this.props);
        this.blocks = [];
        if(this.props.blocksJsonData.value){
            this.blocks = JSON.parse(this.props.blocksJsonData.value);
        }


        return (
            <Fragment>
                <HelloWorldSample 
                    key={this.key}
                    ref={this.ref} 
                    parentRef={this.ref} 
                    seatClick={this.seatClick.bind(this)}
                    config={this.config}
                    blocks={this.blocks}/>
            </Fragment>
        );
    }
}



// export default function IZSeatmap({buttonAction}){
//     const ref = createRef();
//     let config = defaultConfig();
//     let blocks = generateRandomBlocks();

//     const seatClick = useMemo((seat:any) => {
//         console.warn(seat);
//         buttonAction.execute();

//     }, [buttonAction]);



//     console.warn(buttonAction);
//             return (
//             <Fragment>
//                 <HelloWorldSample
//                     ref={ref} 
//                     parentRef={ref} 
//                     seatClick={seatClick}
//                     config={config}
//                     blocks={blocks}/>
//             </Fragment>
//         );

// }




