import React, { Component } from "react";
import {Platform} from 'react-native';
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from 'react-native-fcm';

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if (notif.local_notification) {
        //this is a local notification
    }
    if (notif.opened_from_tray) {
        //iOS: app is open/resumed because user clicked banner
        //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();

    if (Platform.OS === 'ios') {
        if (notif._actionIdentifier === 'com.myapp.MyCategory.Confirm') {
            // handle notification action here
            // the text from user is in notif._userText if type of the action is NotificationActionType.TextInput
        }
        //optional
        //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
        //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
            case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
            case NotificationType.NotificationResponse:
                notif.finish();
                break;
            case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
        }
    }
});

FCM.on(FCMEvent.RefreshToken, (token) => {
    console.log(token)
    // fcm token may not be available on first load, catch it here
});

class FCMHandler extends Component {
    componentDidMount() {
        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));

        FCM.getFCMToken().then(token => {
            console.log(token)
            // store fcm token in your server
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff
        });

        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
            console.log(notif)
        });

        FCM.subscribeToTopic('/topics/news');
    }

    componentWillUnmount() {
        // stop listening for events
        this.notificationListener.remove();
    }

    render(){
        return null;
    }

    otherMethods() {

        FCM.subscribeToTopic('/topics/foo-bar');
        FCM.unsubscribeFromTopic('/topics/foo-bar');
        FCM.presentLocalNotification({
            id: "UNIQ_ID_STRING",                               // (optional for instant notification)
            title: "My Notification Title",                     // as FCM payload
            body: "My Notification Message",                    // as FCM payload (required)
            sound: "default",                                   // as FCM payload
            priority: "high",                                   // as FCM payload
            click_action: "com.myapp.MyCategory",               // as FCM payload - this is used as category identifier on iOS.
            badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
            number: 10,                                         // Android only
            ticker: "My Notification Ticker",                   // Android only
            auto_cancel: true,                                  // Android only (default true)
            large_icon: "ic_launcher",                           // Android only
            icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
            big_text: "Show when notification is expanded",     // Android only
            sub_text: "This is a subText",                      // Android only
            color: "red",                                       // Android only
            vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
            wake_screen: true,                                  // Android only, wake up screen when notification arrives
            group: "group",                                     // Android only
            picture: "https://google.png",                      // Android only bigPicture style
            ongoing: true,                                      // Android only
            my_custom_data: 'my_custom_field_value',             // extra data you want to throw
            lights: true,                                       // Android only, LED blinking (default false)
            show_in_foreground                                  // notification when app is in foreground (local & remote)
        });

        FCM.scheduleLocalNotification({
            fire_date: new Date().getTime(),      //RN's converter is used, accept epoch time and whatever that converter supports
            id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
            body: "from future past",
            repeat_interval: "week" //day, hour
        })

        FCM.getScheduledLocalNotifications().then(notif => console.log(notif));

        //these clears notification from notification center/tray
        FCM.removeAllDeliveredNotifications()
        FCM.removeDeliveredNotification("UNIQ_ID_STRING")

        //these removes future local notifications
        FCM.cancelAllLocalNotifications()
        FCM.cancelLocalNotification("UNIQ_ID_STRING")

        FCM.setBadgeNumber(1);                                       // iOS and supporting android.
        FCM.getBadgeNumber().then(number => console.log(number));     // iOS and supporting android.
        FCM.send('984XXXXXXXXX', {
            my_custom_data_1: 'my_custom_field_value_1',
            my_custom_data_2: 'my_custom_field_value_2'
        });

        // Call this somewhere at initialization to register types of your actionable notifications. See https://goo.gl/UanU9p.
        FCM.setNotificationCategories([
            {
                id: 'com.myapp.MyCategory',
                actions: [
                    {
                        type: NotificationActionType.Default, // or NotificationActionType.TextInput
                        id: 'com.myapp.MyCategory.Confirm',
                        title: 'Confirm', // Use with NotificationActionType.Default
                        textInputButtonTitle: 'Send', // Use with NotificationActionType.TextInput
                        textInputPlaceholder: 'Message', // Use with NotificationActionType.TextInput
                        // Available options: NotificationActionOption.None, NotificationActionOption.AuthenticationRequired, NotificationActionOption.Destructive and NotificationActionOption.Foreground.
                        options: NotificationActionOption.AuthenticationRequired, // single or array
                    },
                ],
                intentIdentifiers: [],
                // Available options: NotificationCategoryOption.None, NotificationCategoryOption.CustomDismissAction and NotificationCategoryOption.AllowInCarPlay.
                // On iOS >= 11.0 there is also NotificationCategoryOption.PreviewsShowTitle and NotificationCategoryOption.PreviewsShowSubtitle.
                options: [NotificationCategoryOption.CustomDismissAction, NotificationCategoryOption.PreviewsShowTitle], // single or array
            },
        ]);

        FCM.deleteInstanceId()
           .then(() => {
               //Deleted instance id successfully
               //This will reset Instance ID and revokes all tokens.
           })
           .catch(error => {
               //Error while deleting instance id
           });
    }
}

export default FCMHandler;