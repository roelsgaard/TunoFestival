import React, { Component } from "react";
import Login from "../components/login";
import Home from "../components/home";
import News from "../components/news";
import Program from "../components/program";
import Splash from "../components/splash";
import BlankPage from "../components/blankPage";
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
    Splash: { screen: Splash },
    Login: { screen: Login },
    Home: { screen: Home },
    BlankPage: { screen: BlankPage },
    News: { screen: News },
    Program: { screen: Program }
}));
