import Moment from "moment/moment";

class GoogleSheet {
    static _getSheet(sheetIndex){
        return fetch("https://spreadsheets.google.com/feeds/list/1CcCXGgPrmARs6vQhgwoAg2_rZbtxx8l5UZsUHFy4VT0/"+sheetIndex+"/public/values?alt=json", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            return data.feed.entry;
        })
        .catch(err => {
            throw err;
        });
    }

    static getInformations(){
        return this._getSheet(3).then(informations => {
            let res = {};

            informations.forEach(information => {
                if(!res[information.gsx$category.$t]){
                    res[information.gsx$category.$t] = [];
                }
                let categoryList = res[information.gsx$category.$t];

                categoryList.push({
                    title: information.gsx$title.$t,
                    text: information.gsx$text.$t
                });
            });

            return res;
        })

    }

    static getConfiguration(){
        return this._getSheet(1).then(configurations => {
            let res = {};

            configurations.forEach(configuration => {
                res[configuration.gsx$egenskab.$t] = configuration.gsx$værdi.$t;
            });

            return res;
        })

    }

    static getEvents() {
        return this._getSheet(2)
            .then(events => {
                return events.map(event => {
                    return {
                        id: event.id.$t,
                        artist: event.gsx$kunstner.$t,
                        scene: event.gsx$kunstner.$t,
                        start: new Moment(event.gsx$start.$t, "DD/MM/YYYY HH:mm").valueOf(),
                        end: new Moment(event.gsx$slut.$t, "DD/MM/YYYY HH:mm").valueOf(),
                        picture: event.gsx$billede.$t,
                        description: event.gsx$beskrivelse.$t,
                    };
                });
            })
            .then(events => {
                return events.sort((a,b) => a.start - b.start);
            })
            .then(events => {
                let eventGroups = [];

                events.forEach(event => {
                    let startDay = (new Moment(event.start)).format("dddd");
                    let eventGroup = eventGroups.find(eg => eg.name === startDay);
                    if (!eventGroup) {
                        eventGroup = {
                            name: startDay,
                            events: []
                        };
                        eventGroups.push(eventGroup);
                    }

                    eventGroup.events.push(event);
                });

                return eventGroups;
            })
            .catch(err => {
                throw err;
            });
    }
}

export default GoogleSheet;