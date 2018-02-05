import type {Action} from "./types";
import FacebookApi from "../lib/FacebookGraphApi";
import {Dimensions, Image} from "react-native";

export const GET_ALBUMS = "GET_ALBUMS";
export const GET_ALBUM_IMAGES = "GET_ALBUM_IMAGES";
export const GET_IMAGE = "GET_IMAGE";

export function getAlbums(): Action {
    return FacebookApi
        .getAlbums()
        .then(albums => {
            return {
                type: GET_ALBUMS,
                payload: albums
            };
        });
}

export function getAlbumImages(albumId): Action {
    return FacebookApi
        .getAlbumImages(albumId)
        .then(images => {
            return {
                type: GET_ALBUM_IMAGES,
                payload: images
            };
        });
}

export function getImage(imageSource): Action {
    return new Promise(resolve => {
        if(imageSource) {
            Image.getSize(imageSource, (width, height) => {
                const screenWidth = Dimensions.get("window").width;
                const scaleFactor = width / screenWidth;
                const imageHeight = height / scaleFactor;
                resolve({
                    source: imageSource,
                    imgWidth: screenWidth,
                    imgHeight: imageHeight
                });
            });
        } else {
            resolve({});
        }
    })
    .then(image => {
        return {
            type: GET_IMAGE,
            payload: image
        };
    });
}