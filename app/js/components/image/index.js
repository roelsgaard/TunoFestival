import React, {Component} from "react";
import {Image, View} from "react-native";
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Left,
    Text,
    Button,
    Icon,
    Header
} from "native-base";

import {connect} from "react-redux";
import {getImage} from "../../actions/albums";

import styles from "./styles";

class ImageView extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getImage(this.props.navigation.state.params.imageSource);
    }

    render() {
        let showImage = (image) => {
            if (!image || !image.source) {
                return (
                    <View></View>
                );
            }
            return (
                <Image source={{uri: image.source}} style={{width: image.imgWidth, height: image.imgHeight}}/>
            );
        };

        return (
            <Image source={require("../../../images/background.png")} style={styles.backgroundImage}>
                <Container>
                    <Header style={{backgroundColor: "#29A06A", paddingTop: 10, height: 60}} androidStatusBarColor={"#29A06A"}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon style={{color: "#fff"}} name="ios-arrow-back"/>
                            </Button>
                        </Left>
                    </Header>
                    <Content>
                        {showImage(this.props.image)}
                    </Content>
                </Container>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        getImage: (imageSource) => dispatch(getImage(imageSource))
    };
}

const mapStateToProps = state => ({
    image: state.albums.image
});

const ConnectedImageView = connect(mapStateToProps, bindAction)(ImageView);

export default ConnectedImageView;
