import React, {Component} from "react";
import {View, Image} from "react-native";
import {
    Container,
    Content,
    Card,
    CardItem,
    Footer,
    FooterTab,
    Left,
    Body,
    Text,
    Right,
    Button,
    Icon,
    Header,
    Title
} from "native-base";

import Hyperlink from "react-native-hyperlink"

import {connect} from "react-redux";

import styles from "./styles";

class Information extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let showInformation = (information) => {
            return (
                <Card>
                    <CardItem>
                        <Body>
                        <Hyperlink linkDefault={true} linkStyle={{color: "#29A06A"}}>
                            <Text style={{margin: 20}}>{information.text}</Text>
                        </Hyperlink>
                        </Body>
                    </CardItem>
                </Card>
            )
        };

        return (
            <Image source={require("../../../images/background.png")} style={styles.backgroundImage}>
                <Container>
                    <Header style={{backgroundColor: "#29A06A", paddingTop: 10, height: 60}} androidStatusBarColor={"#29A06A"}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon style={{color: "#fff"}} name="ios-arrow-back"/>
                            </Button>
                        </Left>
                        <Body>
                        <Title style={{width: 250, color: "#fff"}}>{this.props.navigation.state.params.title}</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showInformation(this.props.navigation.state.params)}
                        </View>
                    </Content>
                </Container>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {};
}

const mapStateToProps = state => ({});

const ConnectedInformation = connect(mapStateToProps, bindAction)(Information);

export default ConnectedInformation;