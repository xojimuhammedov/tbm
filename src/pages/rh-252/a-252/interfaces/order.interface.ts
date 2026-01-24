export type OrderCode = "17-45" | "17-54" | "17-33" | "17-70" | "17-48";

export interface BaseOrder {
    _id?: string;
    code: OrderCode;
    document_index: string;
    order_date: string;
    responsible: ResponsibleUser;
    to: string[];
    copy: string[];
    payload_model?: string;
    created_at: string;
}

export interface ResponsibleUser {
    _id: string;
    first_name: string;
    second_name: string;
    middle_name: string;
    email: string;
    phone: string;
}

export interface FlowsIdsOrder {
    code: string;
    point_a: string;
    point_b: string;
    port_a: string;
    port_b: string;
    device_a: string;
    device_b: string;
    signal_level?: string;
}

export interface ChannelUpdate {
    old: string;
    new: string;
}

export interface Payload1745 {
    basic: {
        organization_name: string;
        request_number: string;
        request_date: string;
        deadline: string;
        justification: string;
        signal_level: string;
        actions: ("create" | "update" | "delete")[];
    };
    create?: {
        flow_ids: FlowsIdsOrder[];
    };
    update?: {
        channels?: ChannelUpdate[];
        flows?: FlowsIdsOrder[];
    };
    delete?: {
        elements: string[];
    };
}

export interface EventSchedule {
    date: string;
    duration: string;
    event_type: string;
}

export interface OrderEvent {
    location: string;
    connection_spec: string;
    schedule: EventSchedule[];
}

export interface Payload1754 {
    basic: {
        organization_name: string;
        request_number: string;
        request_date: string;
        justification: string;
        context: string;
    };
    events: OrderEvent[];
}

export interface Payload1733 {
    basic: {
        organization_name: string;
        request_number: string;
        request_date: string;
        deadline: string;
        justification: string;
    };
    delete: {
        elements: string[];
        flow_ids?: FlowsIds1733[];
        channels?: Channels1733[];
    };

}

export interface FlowsIds1733 {
    _id: string;
    code: string;
    name_point_a: string;
    name_point_b: string;
    point_a: string;
    point_b: string;
    signal_level: string;
    status: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}
export interface Channels1733 {
    _id: string;
    code: string;
    international_stream_number: string;
    channel_number_in_stream: string;
    flow_id: {
        _id: string;
        code: string;
    };
}
export interface Payload1770 {
    basic: {
        organization_name: string;
        request_number: string;
        request_date: string;
        title: string;
        connection_closure_type: string;
        max_duration_minutes: number;
        start_time: string;
        end_time: string;
        timezone: string;
    }
    flow_ids: string[];
}


export interface Payload1748 {
    basic: {
        title: string;
        start_time: string;
        end_time: string;
    };
    content: string;
    reserve_routes : string;
    main_routes : string;
    stopped_flows: StoppedFlow[];
    including: string;
    responsible_person: string;
    concert_text: string;
    basis: string;
}

export interface StoppedFlow {
    _id: string;
    code: string;
    point_a: string;
    point_b: string;
}

export type OrderApplication =
    | (BaseOrder & { code: "17-45"; payload: Payload1745 })
    | (BaseOrder & { code: "17-54"; payload: Payload1754 })
    | (BaseOrder & { code: "17-33"; payload: Payload1733 })
    | (BaseOrder & { code: "17-70"; payload: Payload1770 })
    | (BaseOrder & { code: "17-48"; payload: Payload1748 });

