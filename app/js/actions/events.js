import {Image, Dimensions} from "react-native";
import type {Action} from "./types";
import FacebookApi from "../lib/FacebookGraphApi";

export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENT = "GET_EVENT";

export function getEvents(): Action {
    return FacebookApi
        .getEvents()
        .then(events => {
            return {
                type: GET_EVENTS,
                payload: events
            };
        });
}

export function getEvent(eventId): Action {
    return FacebookApi
        .getEvent(eventId)
        .then(event => {
            return new Promise(resolve => {
                if (event.cover.source) {
                    Image.getSize(event.cover.source, (width, height) => {
                        const screenWidth = Dimensions.get("window").width - 50;
                        const scaleFactor = width / screenWidth;
                        const imageHeight = height / scaleFactor;

                        event.cover.imgWidth = screenWidth;
                        event.cover.imgHeight = imageHeight;
                        resolve(event);
                    });
                } else {
                    resolve(event);
                }
            });
        })
        .then(event => {
            return {
                type: GET_EVENT,
                payload: event
            };
        });
}
