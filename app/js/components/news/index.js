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
            let likes = null;
            if(feed && feed.likes && feed.likes.summary){
                likes = <Text>{feed.likes.summary.total_count} Likes</Text>
            } else {
                likes = <Text>? Likes</Text>
            }

            let comments = null;
            if(feed && feed.comments && feed.comments.summary){
                comments = <Text>{feed.comments.summary.total_count} Comments</Text>
            } else {
                comments = <Text>? Comments</Text>
            }

            let story = <Text></Text>;
            if(feed.story) {
                story = <Text note style={{margin: 20}}>{feed.story}</Text>
            }

            return (
                <Card key={feed.id}>
                    <CardItem style={{borderBottomColor: "lightgray", borderBottomWidth: 1}}>
                        <Left>
                            <Thumbnail style={{backgroundColor: 'black'}} source={{uri: "https://scontent.faar1-1.fna.fbcdn.net/v/t31.0-8/23405980_1507978159287491_4484996441375042237_o.png?oh=3013b87a13d506c49a3d839f2f303732&oe=5AF71A0D"}}/>
                            <Body>
                                <Text style={{color: "#365899", fontWeight: "bold"}}>Tunø Festival</Text>
                                <Text note>{Moment(feed.created_time).format("DD. MMM YYYY")}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Hyperlink
                            linkDefault={ true }
                            linkStyle={ { color: '#2980b9' } }
                        >
                            {story}
                            <Text style={{margin: 20}}>{feed.message}</Text>
                        </Hyperlink>
                    </CardItem>
                    <CardItem cardBody style={{borderBottomColor: "lightgray", borderBottomWidth: 1, paddingBottom: 20}}>
                        <Image
                            source={{uri: feed.picture}}
                            style={{height: 100, width: 100, flex: 1, alignSelf: 'center'}}
                            resizeMode='contain'
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent>
                                <Icon active name="thumbs-up"/>
                                {likes}
                            </Button>
                        </Left>
                        <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles"/>
                            {comments}
                        </Button>
                        </Body>
                        <Right>
                            <Text style={{fontSize: 12}}>{Moment(feed.created_time).fromNow()}</Text>
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
                            <Button active badge vertical onPress={() => this.props.navigation.navigate("News")}>
                                <Badge><Text>2</Text></Badge>
                                <Icon name="apps"/>
                                <Text>Nyheder</Text>
                            </Button>
                            <Button vertical onPress={() => this.props.navigation.navigate("Program")}>
                                <Icon name="camera"/>
                                <Text>Program</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Image>
        );
    }
}

export default News;
