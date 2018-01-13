import React, {Component} from 'react';
import {View, Image, Text as RNText, StyleSheet, Dimensions} from 'react-native';
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
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "red"
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
            imgWidth: 0,
            imgHeight: 0
        }
    }

    componentDidMount() {
        let imageSource = this.props.navigation.state.params.imageSource;

        Image.getSize(imageSource, (width, height) => {
            const screenWidth = Dimensions.get('window').width;
            const scaleFactor = width / screenWidth;
            const imageHeight = height / scaleFactor;
            this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
        })
    }

    render() {
        let imageSource = this.props.navigation.state.params.imageSource;
        const {imgWidth, imgHeight} = this.state;

        return (
            <Image source={require('../../../images/background.png')} style={styles.backgroundImage}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="ios-arrow-back" />
                            </Button>
                        </Left>
                    </Header>
                    <Content>
                        <Image source={{uri: imageSource}} style={{width: imgWidth, height: imgHeight}}/>
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
                            <Button active vertical onPress={() => this.props.navigation.navigate("Albums")}>
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
