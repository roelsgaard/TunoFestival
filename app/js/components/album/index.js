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
    Header,
    Title
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
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    footer: {
        backgroundColor: 'transparent',
    },
});

class Album extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            images: []
        };
    }

    componentDidMount(){
        Facebook.getAlbumImages(this.props.navigation.state.params.albumId).then(data => {
            this.setState({images:data})
        });
    }

    render() {
        let showImages = (images) => {
            return images.map(image => {
                return (
                    <TouchableHighlight key={image.id} onPress={() => this.props.navigation.navigate("Image", {imageSource: image.source})}>
                        <Image square source={{uri: image.source}} style={{margin: 10, width: 90, height: 90}}/>
                    </TouchableHighlight>
                );
            });
        };

        return (
            <Image source={require('../../../images/background.png')} style={styles.backgroundImage}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="ios-arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{width: 250}}>{this.props.navigation.state.params.albumName}</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showImages(this.state.images)}
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button vertical onPress={() => this.props.navigation.navigate("News")}>
                                <Icon name="logo-facebook"/>
                                <Text>Nyheder</Text>
                            </Button>
                            <Button vertical onPress={() => this.props.navigation.navigate("Program")}>
                                <Icon name="md-calendar"/>
                                <Text>Program</Text>
                            </Button>
                            <Button active vertical onPress={() => this.props.navigation.navigate("Albums")}>
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

export default Album;
