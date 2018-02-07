import React, {Component} from "react";
import {View, Image, Text as RNText, StyleSheet, TouchableHighlight} from "react-native";
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
    Icon
} from "native-base";

import Moment from "moment";

import {connect} from "react-redux";
import {getAlbums} from "../../actions/albums";

import styles from "./styles";

class Albums extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAlbums();
    }

    render() {
        let showAlbums = (albums) => {
            return albums.map(album => {
                let thumbnail = <Thumbnail square style={{backgroundColor: "black"}}
                                           source={{uri: "https://scontent.faar1-1.fna.fbcdn.net/v/t31.0-8/23405980_1507978159287491_4484996441375042237_o.png?oh=3013b87a13d506c49a3d839f2f303732&oe=5AF71A0D"}}/>;
                if (album && album.picture && album.picture.data) {
                    thumbnail = <Thumbnail square style={{backgroundColor: "black", alignSelf: "flex-start"}}
                                           source={{uri: album.picture.data.url}}/>;
                }

                return (
                    <TouchableHighlight key={album.id} onPress={() => this.props.navigation.navigate("Album", {
                        albumId: album.id,
                        albumName: album.name
                    })}>
                        <View>
                            <Card style={{marginTop: 0, marginBottom: 0}}>
                                <CardItem style={{borderBottomColor: "lightgray", borderBottomWidth: 1}}>
                                    <Left style={{flex: 1}}>
                                        {thumbnail}
                                    </Left>
                                    <Body style={{flex: 2}}>
                                    <Text style={{color: "#29A06A", fontWeight: "bold"}}>{album.name}</Text>
                                    </Body>
                                    <Right style={{flex: 1}}>
                                        <Text note
                                              style={{color: "#29A06A"}}>{Moment(album.created_time).format("DD. MMM YYYY")}</Text>
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
                    Billeder
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showAlbums(this.props.albums)}
                        </View>
                    </Content>
                </Container>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        getAlbums: () => dispatch(getAlbums())
    };
}

const mapStateToProps = state => ({
    albums: state.albums.albums
});

const ConnectedAlbums = connect(mapStateToProps, bindAction)(Albums);

export default ConnectedAlbums;
