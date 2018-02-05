import Moment from "moment/moment";
import GoogleSheetsApi from "./GoogleSheetsApi";

class Facebook {
    static getPageFeed() {
        return GoogleSheetsApi
            .getConfiguration()
            .then(configuration => {
                return fetch("https://graph.facebook.com/v2.11/tunoefestival/posts?fields=message,story,picture,created_time&access_token=" + configuration.FacebookPageToken, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
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
        let config;

        return GoogleSheetsApi
            .getConfiguration()
            .then(configuration => {
                config = configuration;
                return fetch("https://graph.facebook.com/v2.11/tunoefestival/events?fields=name,start_time,place,picture&since=2017-01-01&until=2017-12-31&limit=1000&access_token=" + configuration.FacebookPageToken, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
            })
            .then(data => {
                return data.json();
            })
            .then(data => {
                return data.data;
            })
            .then(events => {
                let startDate = new Moment(config.startdato, "DD/MM/YYYY");
                let endDate = new Moment(config.slutdato, "DD/MM/YYYY").add(1, "days");
                let currentDate = startDate;

                let eventGroups = [];

                while (currentDate.isBefore(endDate)) {
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
        return GoogleSheetsApi
            .getConfiguration()
            .then(configuration => {
                return fetch("https://graph.facebook.com/v2.11/" + id + "?fields=name,description,cover&access_token=" + configuration.FacebookPageToken, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
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
        return GoogleSheetsApi
            .getConfiguration()
            .then(configuration => {
                return fetch("https://graph.facebook.com/v2.11/tunoefestival/albums?fields=name,picture,count,type,created_time,description&access_token=" + configuration.FacebookPageToken, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
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
        return GoogleSheetsApi
            .getConfiguration()
            .then(configuration => {
                return fetch("https://graph.facebook.com/v2.11/" + id + "/photos?fields=source&access_token=" + configuration.FacebookPageToken, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
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