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
import {getEvent} from "../../actions/events";

import styles from "./styles";

class Event extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getEvent(this.props.navigation.state.params.eventId);
    }

    render() {
        let showEvent = (event) => {
            let showImage = (event) => {
                if (event && event.cover && event.cover.source) {
                    return <Image source={{uri: event.cover.source}} resizeMethod="resize"
                                  style={{width: event.cover.imgWidth, height: 200}}/>
                }
            };

            if (event) {
                return (
                    <Card>
                        <CardItem>
                            <Body>
                            {showImage(event)}

                            <Hyperlink linkDefault={true} linkStyle={{color: "#29A06A"}}>
                                <Text style={{margin: 20}}>{event.description}</Text>
                            </Hyperlink>
                            </Body>
                        </CardItem>
                    </Card>
                )
            }
        };

        return (
            <Image source={require("../../../images/background.png")} style={styles.backgroundImage}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="ios-arrow-back"/>
                            </Button>
                        </Left>
                        <Body>
                        <Title style={{width: 250}}>{this.props.navigation.state.params.eventName}</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showEvent(this.props.event)}
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button vertical onPress={() => this.props.navigation.navigate("News")}>
                                <Icon name="logo-facebook"/>
                                <Text>Nyheder</Text>
                            </Button>
                            <Button active vertical onPress={() => this.props.navigation.navigate("Program")}>
                                <Icon name="md-calendar"/>
                                <Text>Program</Text>
                            </Button>
                            <Button vertical onPress={() => this.props.navigation.navigate("Albums")}>
                                <Icon name="md-images"/>
                                <Text>Billeder</Text>
                            </Button>
                            <Button vertical onPress={() => this.props.navigation.navigate("Informations")}>
                                <Icon name="md-list"/>
                                <Text>Information</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        getEvent: (eventId) => dispatch(getEvent(eventId))
    };
}

const mapStateToProps = state => ({
    event: state.events.event
});

const ConnectedEvent = connect(mapStateToProps, bindAction)(Event);

export default ConnectedEvent;
