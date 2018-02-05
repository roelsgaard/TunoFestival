const React = require("react-native");
const {StyleSheet} = React;

export default StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    headers: {
        flex: 1,
        flexDirection: "row",
        marginTop: 50,
        backgroundColor: "transparent",
    },
    headersWrap: {
        flex: 1,
    },
    header1: {
        color: "#fff",
        textAlign: "center",
        fontSize: 40,
    },
    header2: {
        color: "#fff",
        textAlign: "center",
        fontSize: 35,
        marginTop: 5,
    },
    header3: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
        marginTop: 20,
    },
    logo: {
        flex: 2,
        flexDirection: "row",
        width: null,
        height: null,
        resizeMode: "contain",
    },
});
