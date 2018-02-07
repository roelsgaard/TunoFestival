import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Albums from "../components/albums";
import Album from "../components/album";
import ImageView from "../components/image";

export default (AlbumNav = StackNavigator({
    Albums: { screen: Albums },
    Album: { screen: Album },
    Image: { screen: ImageView}
}));