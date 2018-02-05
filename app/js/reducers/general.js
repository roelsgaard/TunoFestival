import type {Action} from "../actions/types";
import {GET_GENERAL_INFO} from "../actions/general";

export type State = {
    info: {}
}

const initialState = {
    info: {}
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === GET_GENERAL_INFO) {
        return {
            ...state,
            info: action.payload,
        };
    }

    return state;
}
