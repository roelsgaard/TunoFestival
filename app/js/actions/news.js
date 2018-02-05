import type {Action} from "./types";
import FacebookApi from "../lib/FacebookGraphApi";

export const GET_NEWS = "GET_NEWS";

export function getNews(): Action {
    return FacebookApi
        .getPageFeed()
        .then(news => {
            return {
                type: GET_NEWS,
                payload: news
            };
        });
}
