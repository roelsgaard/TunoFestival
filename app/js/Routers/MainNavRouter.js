import React, {Component} from "react";
import {Button, Text, Icon, Footer, FooterTab,} from "native-base";
import {TabNavigator} from "react-navigation";

import News from "../components/news";
import ProgramNav from "./ProgramStackRouter";
import AlbumsNav from "./AlbumsStackRouter";
import InformationsNav from "./InformationsStackRouter";
import Splash from "../components/splash";

export default (MainNav = TabNavigator({
        //Splash: { screen: Splash },
        News: {screen: News},
        ProgramNav: {screen: ProgramNav},
        //Event: { screen: Event },
        AlbumsNav: {screen: AlbumsNav},
        //Album: { screen: Album },
        //Image: { screen: Image },
        InformationsNav: {screen: InformationsNav},
        //Information: { screen: Information }
    },
    {
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("News")}>
                            <Icon name="logo-facebook"/>
                            <Text>Nyheder</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("ProgramNav")}>
                            <Icon name="md-calendar"/>
                            <Text>Program</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("AlbumsNav")}>
                            <Icon name="md-images"/>
                            <Text>Billeder</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 3}
                            onPress={() => props.navigation.navigate("InformationsNav")}>
                            <Icon name="md-list"/>
                            <Text>Information</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
));
