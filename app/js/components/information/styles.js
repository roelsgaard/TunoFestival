import AppTheme from "../../themes/app-theme";

const {StyleSheet, Platform} = require("react-native");

export default StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
    },
    header: {
        marginTop: (Platform.OS === "ios") ? 20 : 10,
        marginBottom: (Platform.OS === "ios") ? 0 : 10,
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    footer: {
        backgroundColor: "transparent",
    },
});