import type {Action} from "../actions/types";
import {GET_EVENTS, GET_EVENT} from "../actions/events";

export type State = {
    events: array
}

const initialState = {
    events: []
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === GET_EVENTS) {
        return {
            ...state,
            events: action.payload,
        };
    }

    if (action.type === GET_EVENT) {
        return {
            ...state,
            event: action.payload,
        };
    }

    return state;
}
