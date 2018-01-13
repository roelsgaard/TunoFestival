import React, {Component} from 'react';
import {View, Image, Text as RNText, StyleSheet, TouchableHighlight} from 'react-native';
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
    Badge,
    Segment
} from 'native-base';

import AppTheme from '../../themes/app-theme';
import Facebook from '../../lib/FacebookGraphApi';
import Hyperlink from 'react-native-hyperlink'
import Moment from 'moment';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    header: {
        marginTop: 20,
        backgroundColor: 'transparent',
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 25,
        fontWeight: 'bold',
        color: AppTheme.headerTextColor,
    },
    contentSpacing: {
        marginLeft: 10,
        marginRight: 10,
    },
    footer: {
        backgroundColor: 'transparent',
    },
});

class News extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            events: [],
            selectedEvents: "andre"
        };
    }

    componentDidMount(){
        Facebook.getEvents().then(data => {
            this.setState({events:data})
        });
    }

    render() {

        let showEventsTabs = (eventGroups) => {
            return eventGroups.map((eventGroup, index) => {
                let isFirst = index === 0;
                let isLast = eventGroups.length -1 === index;
                let isActive = eventGroup.name === this.state.selectedEvents;
                return (
                    <Button
                        key={eventGroup.name}
                        first={isFirst}
                        last={isLast}
                        active={isActive}
                        style={{paddingLeft: 10, paddingRight: 10, borderColor: "#29A06A", backgroundColor: isActive ? "#29A06A" : "white" }}
                        onPress={()=> {this.setState({selectedEvents: eventGroup.name})}}>
                        <Text style={{fontSize: 12, color: isActive ? "white" : "#29A06A"}}>{eventGroup.name.toUpperCase()}</Text>
                    </Button>
                );
            });
        };

        let showEvents = (eventGroups) => {
            let selectedEvents = this.state.selectedEvents;
            let events = eventGroups.length > 0 ? eventGroups.find(eventGroup => eventGroup.name === selectedEvents).events : [];
            return events.map(event => {
                let thumbnail = <Thumbnail square style={{backgroundColor: 'black'}} source={{uri: "https://scontent.faar1-1.fna.fbcdn.net/v/t31.0-8/23405980_1507978159287491_4484996441375042237_o.png?oh=3013b87a13d506c49a3d839f2f303732&oe=5AF71A0D"}}/>;
                if (event && event.picture && event.picture.data) {
                    thumbnail = <Thumbnail square style={{backgroundColor: 'black'}} source={{uri: event.picture.data.url}}/>;
                }

                return (
                    <TouchableHighlight key={event.id} onPress={() => this.props.navigation.navigate("Event", {eventId: event.id, eventName: event.name, eventImageSource: event.picture.data.url})}>
                        <View>
                            <Card style={{marginTop: 0, marginBottom: 0}}>
                                <CardItem style={{borderBottomColor: "lightgray", borderBottomWidth: 1}}>
                                    <Left style={{flex: 1}}>
                                        {thumbnail}
                                    </Left>
                                    <Body style={{flex: 2}}>
                                        <Text style={{color: "#29A06A", fontWeight: "bold"}}>{event.name}</Text>
                                        <Text note style={{fontSize: 12}}>{Moment(event.start_time).format("DD. MMM YYYY")}</Text>
                                    </Body>
                                    <Right style={{flex: 1}}>
                                        <Text note style={{color: "#29A06A"}}>{Moment(event.start_time).format("HH:mm")}</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>
                    </TouchableHighlight>
                );
            });
        };

        return (
            <Image source={require('../../../images/background.png')} style={styles.backgroundImage}>
                <RNText style={styles.header}>
                    Program
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            <Segment>
                                {showEventsTabs(this.state.events)}
                            </Segment>
                            {showEvents(this.state.events)}
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button badge vertical onPress={() => this.props.navigation.navigate("News")}>
                                <Badge><Text>2</Text></Badge>
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
                        </FooterTab>
                    </Footer>
                </Container>
            </Image>
        );
    }
}

export default News;
