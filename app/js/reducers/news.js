import type {Action} from "../actions/types";
import {GET_NEWS} from "../actions/news";

export type State = {
    news: array
}

const initialState = {
    news: [],
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === GET_NEWS) {
        return {
            ...state,
            news: action.payload,
        };
    }

    return state;
}
