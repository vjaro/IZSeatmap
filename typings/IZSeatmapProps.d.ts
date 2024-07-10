/**
 * This file was generated from IZSeatmap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue } from "mendix";

export interface IZSeatmapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    sampleText: string;
    data?: ListValue;
    cartItems?: ListValue;
    buttonAction?: ActionValue;
    blocksJsonData: EditableValue<string>;
}

export interface IZSeatmapPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    sampleText: string;
    data: {} | { caption: string } | { type: string } | null;
    cartItems: {} | { caption: string } | { type: string } | null;
    buttonAction: {} | null;
    blocksJsonData: string;
}
