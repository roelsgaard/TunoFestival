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
    Badge,
    Spinner
} from 'native-base';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    headers: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 50,
        backgroundColor: 'transparent',
    },
    headersWrap: {
        flex: 1,
    },
    header1: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 40
    },
    header2: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 35,
        marginTop: 5
    },
    header3: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
    },
    logo: {
        flex: 2,
        flexDirection: 'row',
        width: null,
        height: null,
        resizeMode: 'contain'
    }
});

class Splash extends Component {
    static navigationOptions = {
        header: null
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate("News");
        }, 3000);
    }

    render() {
        return (
            <Image source={require('../../../images/background.png')} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    <View style={styles.headers}>
                        <View style={styles.headersWrap}>
                            <RNText style={styles.header1}>TUNØ FESTIVAL</RNText>
                            <RNText style={styles.header2}>2018</RNText>
                            <RNText style={styles.header3}>om 56 dage</RNText>
                            <Spinner color='#fff'/>
                        </View>
                    </View>
                    <Image source={require('../../../images/tunologoold.png')} style={styles.logo}></Image>
                </View>
            </Image>
        );
    }
}

export default Splash;