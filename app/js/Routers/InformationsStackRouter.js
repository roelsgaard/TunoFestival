import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Informations from "../components/informations";
import Information from "../components/information";

export default (AlbumNav = StackNavigator({
    Informations: { screen: Informations },
    Information: { screen: Information }
}));