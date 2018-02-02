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
        let showInformations = (informations) => {
            return informations.map(information => {
                return (
                    <TouchableHighlight key={information.title} onPress={() => this.props.navigation.navigate("Information", information)}>
                        <View>
                            <Card style={{marginTop: 0, marginBottom: 0}}>
                                <CardItem style={{borderBottomColor: "lightgray", borderBottomWidth: 1}}>
                                    <Body style={{flex: 2}}>
                                        <Text style={{color: "#29A06A", fontWeight: "bold"}}>{information.title}</Text>
                                    </Body>
                                    <Right style={{flex: 1}}>
                                        <Text note style={{color: "#29A06A"}}>{information.category}</Text>
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
                    Information
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showInformations(this.state.informations)}
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
