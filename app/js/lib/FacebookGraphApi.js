import Moment from "moment/moment";

class Facebook {
    static getPageFeed() {
        return fetch("https://graph.facebook.com/v2.11/tunoefestival/posts?fields=message,story,picture,created_time&access_token=765827880295219%7ChdjDO38R3S8r8ZUfUABPldns6vQ", {
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
            return data.data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    static getEvents() {
        return fetch("https://graph.facebook.com/v2.11/tunoefestival/events?fields=name,start_time,place,picture&since=2017-01-01&until=2017-12-31&limit=1000&access_token=765827880295219%7ChdjDO38R3S8r8ZUfUABPldns6vQ", {
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
            return data.data;
        })
        .then(events => {
            let startDate = new Moment("2017-06-29");
            let endDate = new Moment("2017-07-02").add(1, "days");
            let currentDate = startDate;

            let eventGroups = [];

            while(currentDate.isBefore(endDate)){
                let startOfDay = new Moment(currentDate).startOf("day");
                let endOfDay = new Moment(currentDate).endOf("day");

                eventGroups.push({
                    name: currentDate.format("dddd"),
                    events: events.filter(event => {
                        let eventStart = new Moment(event.start_time);
                        return eventStart.isBetween(startOfDay, endOfDay);
                    })
                });

                currentDate.add(1, "days");
            }

            eventGroups.push({
                name: "andre",
                events: events.filter(event => {
                    let eventStart = new Moment(event.start_time);
                    return eventStart.isBefore(startDate) || eventStart.isAfter(endDate);
                })
            });

            console.log(eventGroups);
            return eventGroups;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    static getEvent(id) {
        return fetch("https://graph.facebook.com/v2.11/" + id + "?fields=name,description,cover&access_token=765827880295219%7ChdjDO38R3S8r8ZUfUABPldns6vQ", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(data => {
            return data.json();
        })
        .then(event => {
            console.log(event);
            return event;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    static getAlbums() {
        return fetch("https://graph.facebook.com/v2.11/tunoefestival/albums?fields=name,picture,count,type,created_time,description&access_token=765827880295219%7ChdjDO38R3S8r8ZUfUABPldns6vQ", {
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
            return data.data;
        })
        .then(albums => {
            albums = albums.filter(album => album.type === "normal");
            console.log(albums);
            return albums;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    static getAlbumImages(id) {
        return fetch("https://graph.facebook.com/v2.11/" + id + "/photos?fields=source&access_token=765827880295219%7ChdjDO38R3S8r8ZUfUABPldns6vQ", {
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
                return data.data;
            })
            .then(pictures => {
                console.log(pictures);
                return pictures;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
}

export default Facebook;