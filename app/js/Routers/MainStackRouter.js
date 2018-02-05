import React, { Component } from "react";
import News from "../components/news";
import Program from "../components/program";
import Event from "../components/event";
import Albums from "../components/albums";
import Album from "../components/album";
import Image from "../components/image";
import Informations from "../components/informations";
import Information from "../components/information";
import Splash from "../components/splash";
import { StackNavigator } from "react-navigation";

export default (StackNav = StackNavigator({
    Splash: { screen: Splash },
    News: { screen: News },
    Program: { screen: Program },
    Event: { screen: Event },
    Albums: { screen: Albums },
    Album: { screen: Album },
    Image: { screen: Image },
    Informations: { screen: Informations },
    Information: { screen: Information }
}));
