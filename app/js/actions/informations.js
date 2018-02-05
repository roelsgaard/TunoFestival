import type {Action} from "./types";
import GoogleSheetsApi from "../lib/GoogleSheetsApi";

export const GET_INFORMATIONS = "GET_INFORMATIONS";

export function getInformations(): Action {
    return GoogleSheetsApi
        .getInformations()
        .then(informations => {
            return {
                type: GET_INFORMATIONS,
                payload: informations
            };
        });
}