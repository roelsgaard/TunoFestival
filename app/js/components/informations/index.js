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
    Segment,
    List,
    ListItem
} from 'native-base';

import AppTheme from '../../themes/app-theme';
import Facebook from '../../lib/FacebookGraphApi';
import GoogleSheet from '../../lib/GoogleSheetsApi';
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

class Informations extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            informations: []
        };
    }

    componentDidMount(){
        GoogleSheet.getInformations().then(data => {
            this.setState({informations:data})
        });
    }

    render() {
        let showInformations = (informations => {
            return informations.map(information => {
                return (
                    <ListItem button={true} key={information.title} onPress={() => this.props.navigation.navigate("Information", information)} style={{marginLeft: 0, paddingLeft: 10, backgroundColor: "white"}}>
                        <Text style={{color: "#29A06A"}}>{information.title}</Text>
                        <Right>
                            <Icon name="ios-arrow-forward"/>
                        </Right>
                    </ListItem>
                );
            });
        });

        let showInformationGroups = (informationGroups) => {
            return Object.keys(informationGroups).map(informationGroup => {
                return (
                    <View key={informationGroup}>
                        <ListItem itemDivider style={{backgroundColor: "#29A06A", marginTop: 10}}>
                            <Text style={{color: "white", fontWeight: "bold"}}>{informationGroup}</Text>
                        </ListItem>
                        {showInformations(informationGroups[informationGroup])}
                    </View>
                );
            });
        };

        return (
            <Image source={require('../../../images/background.png')} style={styles.backgroundImage}>
                <RNText style={styles.header}>
                    Information
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            <List>
                                {showInformationGroups(this.state.informations)}
                            </List>
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button badge vertical onPress={() => this.props.navigation.navigate("News")}>
                                <Badge><Text>2</Text></Badge>
                                <Icon name="logo-facebook"/>
                                <Text>Nyheder</Text>
                            </Button>
                            <Button vertical onPress={() => this.props.navigation.navigate("Program")}>
                                <Icon name="md-calendar"/>
                                <Text>Program</Text>
                            </Button>
                            <Button vertical onPress={() => this.props.navigation.navigate("Albums")}>
                                <Icon name="md-images"/>
                                <Text>Billeder</Text>
                            </Button>
                            <Button active vertical onPress={() => this.props.navigation.navigate("Informations")}>
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

export default Informations;
