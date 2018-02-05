import React, {Component} from "react";
import {TouchableHighlight, View, Image, Text as RNText, StyleSheet} from "react-native";

import {
    Spinner,
} from "native-base";

import {connect} from "react-redux";
import {getGeneralInfo} from "../../actions/general";

import styles from "./styles";

class Splash extends Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.props.getGeneralInfo();

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
                                <RNText style={styles.header2}>{this.props.info.year}</RNText>
                                <RNText style={styles.header3}>{this.props.info.daysUntilStart}</RNText>
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


function bindAction(dispatch) {
    return {
        getGeneralInfo: () => dispatch(getGeneralInfo())
    };
}

const mapStateToProps = state => ({
    info: state.general.info
});

const ConnectedSplash = connect(mapStateToProps, bindAction)(Splash);

export default ConnectedSplash;