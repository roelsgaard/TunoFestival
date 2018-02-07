import React, {Component} from "react";
import {View, Image, TouchableHighlight} from "react-native";
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Left,
    Body,
    Text,
    Right,
    Button,
    Icon,
    Header,
    Title
} from "native-base";

import {connect} from "react-redux";
import {getAlbumImages} from "../../actions/albums";

import styles from "./styles";

class Album extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAlbumImages(this.props.navigation.state.params.albumId);
    }

    render() {
        let showImages = (images) => {
            if (!images) return;

            return images.map(image => {
                return (
                    <TouchableHighlight key={image.id}
                                        onPress={() => this.props.navigation.navigate("Image", {imageSource: image.source})}>
                        <Image square source={{uri: image.source}} style={{margin: 10, width: 90, height: 90}}/>
                    </TouchableHighlight>
                );
            });
        };

        return (
            <Image source={require("../../../images/background.png")} style={styles.backgroundImage}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="ios-arrow-back"/>
                            </Button>
                        </Left>
                        <Body>
                        <Title style={{width: 250}}>{this.props.navigation.state.params.albumName}</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showImages(this.props.images)}
                        </View>
                    </Content>
                </Container>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        getAlbumImages: (albumId) => dispatch(getAlbumImages(albumId))
    };
}

const mapStateToProps = state => ({
    images: state.albums.images
});

const ConnectedAlbum = connect(mapStateToProps, bindAction)(Album);

export default ConnectedAlbum;
