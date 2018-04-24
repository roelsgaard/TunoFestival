import {Image, Dimensions} from "react-native";
import type {Action} from "./types";
import GoogleSheetsApi from "../lib/GoogleSheetsApi";

export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENT = "GET_EVENT";

export function getEvents(): Action {
    return GoogleSheetsApi
        .getEvents()
        .then(events => {
            return {
                type: GET_EVENTS,
                payload: events
            };
        });
}

export function getEvent(event): Action {
    return new Promise(resolve => {
        if (event.picture) {
            Image.getSize(event.picture, (width, height) => {
                const screenWidth = Dimensions.get("window").width - 50;
                const scaleFactor = width / screenWidth;
                const imageHeight = height / scaleFactor;

                event.cover = {
                    imgWidth: screenWidth,
                    imgHeight: imageHeight
                };

                resolve(event);
            });
        } else {
            resolve(event);
        }
    })
    .then(event => {
        return {
            type: GET_EVENT,
            payload: event
        };
    });
}
