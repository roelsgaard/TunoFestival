import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Program from "../components/program";
import Event from "../components/event";

export default (AlbumNav = StackNavigator({
    Program: { screen: Program },
    Event: { screen: Event }
}));