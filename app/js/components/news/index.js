import React, {Component} from "react";
import {View, Image, Text as RNText} from "react-native";
import {NavigationActions} from "react-navigation";
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

import Hyperlink from "react-native-hyperlink"
import Moment from "moment";

import {connect} from "react-redux";
import {getNews} from "../../actions/news";

import styles from "./styles";

class News extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getNews();
    }

    render() {
        let showNewsItems = (news) => {
            return news.map(function (newsItem) {
                let story = <Text></Text>;
                if (newsItem.story) {
                    story = <Text note style={{margin: 20}}>{newsItem.story}</Text>
                }

                return (
                    <Card key={newsItem.id}>
                        <CardItem style={{borderBottomColor: "lightgray", borderBottomWidth: 1}}>
                            <Left>
                                <Thumbnail style={{backgroundColor: "black"}}
                                           source={{uri: "https://scontent.faar1-1.fna.fbcdn.net/v/t31.0-8/23405980_1507978159287491_4484996441375042237_o.png?oh=3013b87a13d506c49a3d839f2f303732&oe=5AF71A0D"}}/>
                                <Body>
                                <Text style={{color: "#29A06A", fontWeight: "bold"}}>Tunø Festival</Text>
                                <Text note>{Moment(newsItem.created_time).format("DD. MMM YYYY")}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Hyperlink
                                linkDefault={true}
                                linkStyle={{color: "#29A06A"}}
                            >
                                {story}
                                <Text style={{margin: 20}}>{newsItem.message}</Text>
                            </Hyperlink>
                        </CardItem>
                        <CardItem cardBody
                                  style={{borderBottomColor: "lightgray", borderBottomWidth: 1, paddingBottom: 20}}>
                            <Image
                                source={{uri: newsItem.picture}}
                                style={{height: 100, width: 100, flex: 1, alignSelf: "center"}}
                                resizeMode="contain"
                            />
                        </CardItem>
                        <CardItem>
                            <Right>
                                <Text style={{
                                    fontSize: 12,
                                    color: "#29A06A"
                                }}>{Moment(newsItem.created_time).fromNow()}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                );
            });
        };

        return (
            <Image source={require("../../../images/background.png")} style={styles.backgroundImage}>
                <RNText style={styles.header}>
                    Nyheder
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            {showNewsItems(this.props.news)}
                        </View>
                    </Content>
                </Container>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        getNews: () => dispatch(getNews())
    };
}

const mapStateToProps = state => ({
    news: state.news.news
});

const ConnectedNews = connect(mapStateToProps, bindAction)(News);

export default ConnectedNews;
