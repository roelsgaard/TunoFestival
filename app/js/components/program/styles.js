import AppTheme from "../../themes/app-theme";

const React = require("react-native");
const {StyleSheet} = React;

export default StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
    },
    header: {
        marginTop: 20,
        backgroundColor: "transparent",
        textAlign: "center",
        lineHeight: 40,
        fontSize: 25,
        fontWeight: "bold",
        color: AppTheme.headerTextColor,
    },
    contentSpacing: {
        marginLeft: 10,
        marginRight: 10,
    },
    footer: {
        backgroundColor: "transparent",
    },
});
