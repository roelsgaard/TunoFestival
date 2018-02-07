import React, {Component} from "react";
import {View, Image, Text as RNText} from "react-native";
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Text,
    Right,
    Button,
    Icon,
    List,
    ListItem
} from "native-base";

import {connect} from "react-redux";
import {getInformations} from "../../actions/informations";

import styles from "./styles";

class Informations extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getInformations();
    }

    render() {
        let showInformations = (informations => {
            return informations.map(information => {
                return (
                    <ListItem button={true} key={information.title}
                              onPress={() => this.props.navigation.navigate("Information", information)}
                              style={{marginLeft: 0, paddingLeft: 10, backgroundColor: "white"}}>
                        <Text style={{color: "#29A06A"}}>{information.title}</Text>
                        <Right>
                            <Icon name="ios-arrow-forward"/>
                        </Right>
                    </ListItem>
                );
            });
        });

        let showInformationGroups = (informationGroups) => {
            return Object.keys(informationGroups).map(informationGroup => {
                return (
                    <View key={informationGroup}>
                        <ListItem itemDivider style={{backgroundColor: "#29A06A", marginTop: 10}}>
                            <Text style={{color: "white", fontWeight: "bold"}}>{informationGroup}</Text>
                        </ListItem>
                        {showInformations(informationGroups[informationGroup])}
                    </View>
                );
            });
        };

        return (
            <Image source={require("../../../images/background.png")} style={styles.backgroundImage}>
                <RNText style={styles.header}>
                    Information
                </RNText>
                <Container>
                    <Content>
                        <View style={styles.contentSpacing}>
                            <List>
                                {showInformationGroups(this.props.informations)}
                            </List>
                        </View>
                    </Content>
                </Container>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        getInformations: () => dispatch(getInformations())
    };
}

const mapStateToProps = state => ({
    informations: state.informations.informations
});

const ConnectedInformations = connect(mapStateToProps, bindAction)(Informations);

export default ConnectedInformations;

