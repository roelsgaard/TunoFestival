import React, {Component} from 'react';
import {View, Image, Text as RNText, StyleSheet} from 'react-native';
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
} from 'native-base';

import AppTheme from '../../themes/app-theme';

import Facebook from '../../lib/fb_sdk';

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
            feeds: []
        };
    }

    componentDidMount(){
        Facebook.getPageFeed().then(data => {
            this.setState({feeds:data})
        });
    }

    render() {
        let feedItems = this.state.feeds.map(function(feed) {
            return (
                <Card key={feed.id}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: feed.icon}}/>
                            <Body>
                            <Text>Tunø Festival</Text>
                            <Text note>{feed.story}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Text>{feed.message}</Text>
                    </CardItem>
                    <CardItem cardBody>
                        <Image
                            source={{uri: feed.picture}}
                            style={{height: 200, width: null, flex: 1}}
                        />
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
            );
        });

        return (
            <Image source={require('../../../images/background.png')} style={styles.backgroundImage}>
                <RNText style={styles.header}>
                    Nyheder
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {feedItems}
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
