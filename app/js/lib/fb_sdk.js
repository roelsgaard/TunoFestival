class Facebook {
    static getPageFeed() {
        return fetch("https://graph.facebook.com/v2.11/tunoefestival/posts?fields=message,story,picture,created_time,likes.limit(0).summary(true),comments.limit(0).summary(true)&access_token=765827880295219%7ChdjDO38R3S8r8ZUfUABPldns6vQ", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            console.log("DATA", data.data);
            return data.data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }
}

export default Facebook;