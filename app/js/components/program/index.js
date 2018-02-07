import React, {Component} from "react";
import {View, Image, Text as RNText, TouchableHighlight, Dimensions} from "react-native";
import {NavigationActions} from "react-navigation";
import {
    Container,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Footer,
    FooterTab,
    Left,
    Body,
    Text,
    Right,
    Button,
    Icon,
    Segment
} from "native-base";

import Moment from "moment";

import {connect} from "react-redux";
import {getEvents} from "../../actions/events";

import styles from "./styles";

class Program extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedEvents: "andre"
        };
    }

    componentDidMount() {
        this.props.getEvents();
    }

    render() {

        let showEventsTabs = (eventGroups) => {
            if (!eventGroups) return;

            const screenWidth = Dimensions.get("window").width - 50;
            const groupWidth = (screenWidth / eventGroups.length) - (2 * 5);

            return eventGroups.map((eventGroup, index) => {
                let isFirst = index === 0;
                let isLast = eventGroups.length - 1 === index;
                let isActive = eventGroup.name === this.state.selectedEvents;
                return (
                    <Button
                        key={eventGroup.name}
                        first={isFirst}
                        last={isLast}
                        active={isActive}
                        style={{
                            paddingLeft: 5,
                            paddingRight: 5,
                            borderColor: "#29A06A",
                            backgroundColor: isActive ? "#29A06A" : "white"
                        }}
                        onPress={() => {
                            this.setState({selectedEvents: eventGroup.name})
                        }}>
                        <Text style={{
                            width: groupWidth,
                            textAlign: "center",
                            fontSize: 11,
                            color: isActive ? "white" : "#29A06A"
                        }} ellipsizeMode="tail" numberOfLines={1}>{eventGroup.name.toUpperCase()}</Text>
                    </Button>
                );
            });
        };

        let showEvents = (eventGroups) => {
            if (!eventGroups) return;

            let selectedEvents = this.state.selectedEvents;
            let events = eventGroups.length > 0 ? eventGroups.find(eventGroup => eventGroup.name === selectedEvents).events : [];
            return events.map(event => {
                let thumbnail = <Thumbnail square style={{backgroundColor: "black"}}
                                           source={{uri: "https://scontent.faar1-1.fna.fbcdn.net/v/t31.0-8/23405980_1507978159287491_4484996441375042237_o.png?oh=3013b87a13d506c49a3d839f2f303732&oe=5AF71A0D"}}/>;
                if (event && event.picture && event.picture.data) {
                    thumbnail =
                        <Thumbnail square style={{backgroundColor: "black"}} source={{uri: event.picture.data.url}}/>;
                }

                return (
                    <TouchableHighlight key={event.id} onPress={() => this.props.navigation.navigate("Event", {
                        eventId: event.id,
                        eventName: event.name,
                        eventImageSource: event.picture.data.url
                    })}>
                        <View>
                            <Card style={{marginTop: 0, marginBottom: 0}}>
                                <CardItem style={{borderBottomColor: "lightgray", borderBottomWidth: 1}}>
                                    <Left style={{flex: 1}}>
                                        {thumbnail}
                                    </Left>
                                    <Body style={{flex: 2}}>
                                    <Text style={{color: "#29A06A", fontWeight: "bold"}}>{event.name}</Text>
                                    <Text note
                                          style={{fontSize: 12}}>{Moment(event.start_time).format("DD. MMM YYYY")}</Text>
                                    </Body>
                                    <Right style={{flex: 1}}>
                                        <Text note
                                              style={{color: "#29A06A"}}>{Moment(event.start_time).format("HH:mm")}</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>
                    </TouchableHighlight>
                );
            });
        };

        return (
            <Image source={require("../../../images/background.png")} style={styles.backgroundImage}>
                <RNText style={styles.header}>
                    Program
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            <Segment>
                                {showEventsTabs(this.props.events)}
                            </Segment>
                            {showEvents(this.props.events)}
                        </View>
                    </Content>
                </Container>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        getEvents: () => dispatch(getEvents())
    };
}

const mapStateToProps = state => ({
    events: state.events.events
});

const ConnectedProgram = connect(mapStateToProps, bindAction)(Program);

export default ConnectedProgram;
