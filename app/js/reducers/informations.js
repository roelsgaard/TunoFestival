import type {Action} from "../actions/types";
import {GET_INFORMATIONS} from "../actions/informations";

export type State = {
    informations: array
}

const initialState = {
    informations: []
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === GET_INFORMATIONS) {
        return {
            ...state,
            informations: action.payload,
        };
    }

    return state;
}
