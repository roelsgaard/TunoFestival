import type {Action} from "./types";
import GoogleSheetsApi from "../lib/GoogleSheetsApi";
import Moment from "moment/moment";

export const GET_GENERAL_INFO = "GET_GENERAL_INFO";

export function getGeneralInfo(): Action {
    return GoogleSheetsApi
        .getConfiguration()
        .then(config => {
            let startDate = new Moment(config.startdato, "DD/MM/YYYY");

            let info = {
                year: startDate.year(),
                daysUntilStart: startDate.fromNow()
            };
            return {
                type: GET_GENERAL_INFO,
                payload: info
            };
        });
}