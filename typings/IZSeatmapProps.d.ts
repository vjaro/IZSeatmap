/**
 * This file was generated from IZSeatmap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue, ListActionValue, ListAttributeValue } from "mendix";

export interface IZSeatmapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data?: ListValue;
    blocksJsonData: EditableValue<string>;
    seatClickAction?: ListActionValue;
    seat_map_template_id?: ListAttributeValue<string>;
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
    data: {} | { caption: string } | { type: string } | null;
    blocksJsonData: string;
    seatClickAction: {} | null;
    seat_map_template_id: string;
}
