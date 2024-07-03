import { Component, ReactNode, createElement,createRef } from "react";
// import { createElement ,useState } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { IZSeatmapContainerProps } from "../typings/IZSeatmapProps";

import "./ui/IZSeatmap.css";

export class IZSeatmap extends Component<IZSeatmapContainerProps> {
    ref:any;
    constructor(props:any){
        super(props);
        this.state = {ref:null};
        this.ref = createRef();
    }
    componentDidMount(): void {
        this.setState({ref: this.ref});
    }

    render(): ReactNode {
        console.warn(["IZSeatmap render"], this.ref);
        return <HelloWorldSample ref={this.ref} parentRef={this.ref} />;
    }
}

// export default function IZSeatmap(){
//     const [ref, setRef] = useState();
//     return <HelloWorldSample ref={setRef} parentRef={ref} />;

// }



