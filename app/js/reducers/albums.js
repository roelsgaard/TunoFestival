import type {Action} from "../actions/types";
import {GET_ALBUMS, GET_ALBUM_IMAGES, GET_IMAGE} from "../actions/albums";

export type State = {
    albums: array,
    images: array
}

const initialState = {
    albums: [],
    images: [],
    image: {}
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === GET_ALBUMS) {
        return {
            ...state,
            albums: action.payload,
        };
    }

    if (action.type === GET_ALBUM_IMAGES) {
        return {
            ...state,
            images: action.payload,
        };
    }

    if (action.type === GET_IMAGE) {
        return {
            ...state,
            image: action.payload,
        };
    }

    return state;
}
