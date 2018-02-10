import React, {Component} from "react";
import {
    StyleSheet, AppState, Image, TouchableHighlight, Text as RNText, View, NativeModules, processColor,
    Platform
} from "react-native";
import CodePush from "react-native-code-push";

import {Container, Content, Text, Spinner, Header} from "native-base";
import Modal from "react-native-modalbox";
import MainNavRouter from "./Routers/MainNavRouter";
import ProgressBar from "./components/loaders/ProgressBar";
import theme from "./themes/base-theme";
import AppTheme from "./themes/app-theme";
import {connect} from "react-redux";
import {getGeneralInfo} from "./actions/general";
import FCMHandler from "./FCM";

import { StatusBar } from 'react-native';
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor(processColor("transparent"), true);
StatusBar.setBarStyle("dark-content");


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        width: null,
        height: null
    },
    modal: {
        justifyContent: "center",
        alignItems: "center"
    },
    modal1: {
        height: 300
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    headers: {
        flex: 1,
        flexDirection: "row",
        marginTop: 50,
        backgroundColor: "transparent",
    },
    headersWrap: {
        flex: 1,
    },
    header1: {
        color: "#fff",
        textAlign: "center",
        fontSize: 40,
    },
    header2: {
        color: "#fff",
        textAlign: "center",
        fontSize: 35,
        marginTop: 5,
    },
    header3: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
        marginTop: 20,
    },
    logo: {
        flex: 2,
        flexDirection: "row",
        width: null,
        height: null,
        resizeMode: "contain",
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDownloadingModal: false,
            showInstalling: false,
            downloadProgress: 0,
            navigation: this.props.navigation
        };

        this._handleAppStateChange = this._handleAppStateChange.bind(this);
    }

    componentDidMount() {
        this.props.getGeneralInfo();
        this.setState({showSplash: true});

        this.autoNavigate = setTimeout(() => {
            this.setState({showSplash: false});
        }, 3000);

        AppState.addEventListener("change", this._handleAppStateChange);
        CodePush.sync(
            {updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE},
            status => {
                switch (status) {
                    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                        this.setState({showDownloadingModal: true});
                        this._modal.open();
                        break;
                    case CodePush.SyncStatus.INSTALLING_UPDATE:
                        this.setState({showInstalling: true});
                        break;
                    case CodePush.SyncStatus.UPDATE_INSTALLED:
                        this._modal.close();
                        this.setState({showDownloadingModal: false});
                        break;
                    default:
                        break;
                }
            },
            ({receivedBytes, totalBytes}) => {
                this.setState({downloadProgress: receivedBytes / totalBytes * 100});
            }
        );
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    _handleAppStateChange(nextAppState) {
        if (nextAppState === "active") {
        }
    }

    render() {
        if (this.state.showDownloadingModal) {
            return (
                <Container
                    theme={theme}
                    style={{backgroundColor: theme.defaultBackgroundColor}}
                >
                    <Content style={styles.container}>
                        <Modal
                            style={[styles.modal, styles.modal1]}
                            backdrop={false}
                            ref={c => {
                                this._modal = c;
                            }}
                            swipeToClose={false}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    alignSelf: "stretch",
                                    justifyContent: "center",
                                    padding: 20
                                }}
                            >
                                {this.state.showInstalling
                                    ? <Text
                                        style={{
                                            color: theme.brandPrimary,
                                            textAlign: "center",
                                            marginBottom: 15,
                                            fontSize: 15
                                        }}
                                    >
                                        Installing update...
                                    </Text>
                                    : <View
                                        style={{
                                            flex: 1,
                                            alignSelf: "stretch",
                                            justifyContent: "center",
                                            padding: 20
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: theme.brandPrimary,
                                                textAlign: "center",
                                                marginBottom: 15,
                                                fontSize: 15
                                            }}
                                        >
                                            Downloading update...
                                            {" "}
                                            {`${parseInt(this.state.downloadProgress, 10)} %`}
                                        </Text>
                                        <ProgressBar
                                            color="theme.brandPrimary"
                                            progress={parseInt(this.state.downloadProgress, 10)}
                                        />
                                    </View>}
                            </View>
                        </Modal>
                    </Content>
                </Container>
            );
        }

        if(this.state.showSplash){
            return (
                <Image source={require("../images/background.png")} style={styles.backgroundImage}>
                    <FCMHandler/>
                    <TouchableHighlight
                        style={{flex: 1}}
                        onPress={() => {
                            clearTimeout(this.autoNavigate);
                            this.setState({showSplash: false});
                        }}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.headers}>
                                <View style={styles.headersWrap}>
                                    <RNText style={styles.header1}>TUNØ FESTIVAL</RNText>
                                    <RNText style={styles.header2}>{this.props.info.year}</RNText>
                                    <RNText style={styles.header3}>{this.props.info.daysUntilStart}</RNText>
                                    <Spinner color="#fff"/>
                                </View>
                            </View>
                            <Image source={require("../images/tunologoold.png")} style={styles.logo}>
                               <Text></Text>
                            </Image>
                        </View>
                    </TouchableHighlight>
                </Image>
            );
        }

        return (
            <Image source={require("../images/background.png")} style={styles.backgroundImage}>
                <FCMHandler/>
                <MainNavRouter/>
            </Image>
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

const ConnectedApp = connect(mapStateToProps, bindAction)(App);

export default ConnectedApp;
