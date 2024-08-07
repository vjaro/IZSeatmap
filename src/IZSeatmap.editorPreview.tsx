import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { IZSeatmapPreviewProps } from "../typings/IZSeatmapProps";

export class preview extends Component<IZSeatmapPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/IZSeatmap.css");
}
