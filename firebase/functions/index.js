const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// subscribe app to facebook page
// curl -i -X GET "https://graph.facebook.com/v2.12/tunoefestival/subscribed_apps?access_token=EAAK4hDLDmzMBACRfTre1Oap0Hz0CMske2ZAiyd10XsCzKGY8OKKRbisZCsSPNAL7Ip4UFOJGhhaJZAMgSITMRfxdy2xzEqzcZCfTZCAwOm4VVXKekZCnwP7pou0BTxpZBA0o9VrDkcXJoEZAoToG8ZBVHKfCxr6abibacR6X5CzaZAjL25IvC7PRQZB11jky8gtZCAuwgy7ilJbHVAZDZD"

// read facebook page subscriptions
// curl -i -X GET "https://graph.facebook.com/v2.12/tunoefestival/subscribed_apps?access_token=EAAK4hDLDmzMBACRfTre1Oap0Hz0CMske2ZAiyd10XsCzKGY8OKKRbisZCsSPNAL7Ip4UFOJGhhaJZAMgSITMRfxdy2xzEqzcZCfTZCAwOm4VVXKekZCnwP7pou0BTxpZBA0o9VrDkcXJoEZAoToG8ZBVHKfCxr6abibacR6X5CzaZAjL25IvC7PRQZB11jky8gtZCAuwgy7ilJbHVAZDZD"

const topics = {
    NEWS: {
        topic: "news",
        title: "Der er kommet en nyheder"
    }
};
æ0pæø
const notifyTopic = (topic) => {
    const payload = {
        notification: {
            title: topic.title
        },
    };

    // Send notifications to all tokens.
    return admin
        .messaging()
        .sendToTopic(topic.topic, payload)
        .then(response => {
            console.log("notifying devices");
            return response;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

//Receive updates from Facebook
exports.webhooksPageFeed = functions.https.onRequest((req, res) => {
    let hubMode = req.query["hub.mode"];
    let hubChallenge = req.query["hub.challenge"];
    let hubVerifyToken = req.query["hub.verify_token"];

    if(hubMode === "subscribe" && hubVerifyToken === "tunofestival"){
        res.send(hubChallenge);
        return;
    }

    console.log("webhooksPageFeed", JSON.stringify(req.body));

    let entry = req.body.entry;
    console.log("webhooksPageFeed - entry:", JSON.stringify(entry));

    if(entry && entry[0].changes[0].value.verb === "add" && entry[0].changes[0].value.item === "status") {
        let pageId = req.body.entry[0].id;
        let postId = req.body.entry[0].changes[0].value.post_id;
        console.log("webhooksPageFeed - pageId: " + pageId + " - postId: " + postId);
    }

    return notifyTopic(topics.NEWS)
        .then(response => res.send(response));
});


exports.notifyPageFeedUpdated = functions.https.onRequest((req, res) => {
    return notifyTopic(topics.NEWS)
        .then(response => res.send(response));
});