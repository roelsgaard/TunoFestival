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
import Moment from "moment/moment";

class Event extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getEvent(this.props.navigation.state.params);
    }

    render() {
        let showEvent = (event) => {
            let showImage = (event) => {
                if (event && event.cover && event.picture) {
                    return <Image source={{uri: event.picture}} resizeMethod="resize"
                                  style={{width: event.cover.imgWidth, height: event.cover.imgHeight}}/>
                }
            };

            if (event) {
                return (
                    <Card>
                        <CardItem>
                            <Body>
                            {showImage(event)}

                            <Text note
                                  style={{color: "#29A06A"}}>{Moment(event.start).format("DD. MMM YYYY")} {Moment(event.start).format("HH:mm")} - {Moment(event.end).format("HH:mm")}</Text>

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
                    <Header style={{backgroundColor: "#29A06A", paddingTop: 10, height: 60}}  androidStatusBarColor={"#29A06A"}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon style={{color: "#fff"}} name="ios-arrow-back"/>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{width: 250, color: "#fff"}}>{this.props.navigation.state.params.artist}</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showEvent(this.props.event)}
                        </View>
                    </Content>
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
