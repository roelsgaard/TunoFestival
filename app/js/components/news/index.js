import React, {Component} from 'react';
import {View, Image, Text as RNText, StyleSheet} from 'react-native';
import AppTheme from '../../themes/app-theme';

import {
    Container,
    Header,
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
    Badge
} from 'native-base';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    header: {
        marginTop: 20,
        backgroundColor: 'transparent',
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 25,
        fontWeight: 'bold',
        color: AppTheme.headerTextColor
    },
    contentSpacing: {
        marginLeft: 10,
        marginRight: 10,
    },
    footer: {
        backgroundColor: 'transparent',
    }
});

class News extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Image source={require('../../../images/background.png')} style={styles.backgroundImage}>
                <RNText style={styles.header}>
                    Nyheder
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: 'https://loremflickr.com/100/100'}}/>
                                        <Body>
                                        <Text>NativeBase</Text>
                                        <Text note>GeekyAnts</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{uri: 'https://loremflickr.com/400/200'}}
                                           style={{height: 200, width: null, flex: 1}}/>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Button transparent>
                                            <Icon active name="thumbs-up"/>
                                            <Text>12 Likes</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Button transparent>
                                        <Icon active name="chatbubbles"/>
                                        <Text>4 Comments</Text>
                                    </Button>
                                    </Body>
                                    <Right>
                                        <Text>11h ago</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: 'https://loremflickr.com/100/100'}}/>
                                        <Body>
                                        <Text>NativeBase</Text>
                                        <Text note>GeekyAnts</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{uri: 'https://loremflickr.com/400/200'}}
                                           style={{height: 200, width: null, flex: 1}}/>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Button transparent>
                                            <Icon active name="thumbs-up"/>
                                            <Text>12 Likes</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Button transparent>
                                        <Icon active name="chatbubbles"/>
                                        <Text>4 Comments</Text>
                                    </Button>
                                    </Body>
                                    <Right>
                                        <Text>11h ago</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button active badge vertical>
                                <Badge><Text>2</Text></Badge>
                                <Icon name="apps"/>
                                <Text>Nyheder</Text>
                            </Button>
                            <Button vertical>
                                <Icon name="camera"/>
                                <Text>Camera</Text>
                            </Button>
                            <Button badge vertical>
                                <Badge><Text>51</Text></Badge>
                                <Icon active name="navigate"/>
                                <Text>Navigate</Text>
                            </Button>
                            <Button vertical>
                                <Icon name="person"/>
                                <Text>Contact</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Image>
        );
    }
}

export default News;