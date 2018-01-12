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
            albums: []
        };
    }

    componentDidMount(){
        Facebook.getAlbums().then(data => {
            this.setState({albums:data})
        });
    }

    render() {
        let showAlbums = (albums) => {
            return albums.map(album => {
                let thumbnail = <Thumbnail square style={{backgroundColor: 'black'}} source={{uri: "https://scontent.faar1-1.fna.fbcdn.net/v/t31.0-8/23405980_1507978159287491_4484996441375042237_o.png?oh=3013b87a13d506c49a3d839f2f303732&oe=5AF71A0D"}}/>;
                if (album && album.picture && album.picture.data) {
                    thumbnail = <Thumbnail square style={{backgroundColor: 'black', alignSelf: "flex-start"}} source={{uri: album.picture.data.url}}/>;
                }

                return (
                    <TouchableHighlight key={album.id} onPress={() => this.props.navigation.navigate("Album", {albumId: album.id, albumName: album.name})}>
                        <View>
                            <Card style={{marginTop: 0, marginBottom: 0}}>
                                <CardItem style={{borderBottomColor: "lightgray", borderBottomWidth: 1}}>
                                    <Left style={{flex: 1}}>
                                        {thumbnail}
                                    </Left>
                                    <Body style={{flex: 2}}>
                                        <Text style={{color: "#29A06A", fontWeight: "bold"}}>{album.name}</Text>
                                        <Text note style={{fontSize: 12, marginTop: 5}}>{album.description}</Text>
                                    </Body>
                                    <Right style={{flex: 1}}>
                                        <Text note style={{color: "#29A06A"}}>{Moment(album.created_time).format("DD. MMM YYYY")}</Text>
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
                    Billeder
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showAlbums(this.state.albums)}
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
