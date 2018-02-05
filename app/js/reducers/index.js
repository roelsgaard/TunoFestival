import {combineReducers} from "redux";
import news from "./news";
import events from "./events";
import albums from "./albums";
import informations from "./informations";

export default combineReducers({
    news,
    events,
    albums,
    informations
});
