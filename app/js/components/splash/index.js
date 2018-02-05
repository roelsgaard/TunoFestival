import React, {Component} from "react";
import {TouchableHighlight, View, Image, Text as RNText, StyleSheet} from "react-native";

import {
    Spinner,
} from "native-base";

import styles from "./styles";

class Splash extends Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.autoNavigate = setTimeout(() => {
            this.props.navigation.navigate("News");
        }, 3000);
    }

    render() {
        return (
            <TouchableHighlight
                style={{flex: 1}}
                onPress={() => {
                    clearTimeout(this.autoNavigate);
                    this.props.navigation.navigate("News")
                }}
            >
                <Image source={require("../../../images/background.png")} style={styles.backgroundImage}>
                    <View style={styles.overlay}>
                        <View style={styles.headers}>
                            <View style={styles.headersWrap}>
                                <RNText style={styles.header1}>TUNØ FESTIVAL</RNText>
                                <RNText style={styles.header2}>2018</RNText>
                                <RNText style={styles.header3}>om 56 dage</RNText>
                                <Spinner color="#fff"/>
                            </View>
                        </View>
                        <Image source={require("../../../images/tunologoold.png")} style={styles.logo}></Image>
                    </View>
                </Image>
            </TouchableHighlight>
        );
    }
}

export default Splash;