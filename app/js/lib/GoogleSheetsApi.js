import Moment from "moment/moment";

class GoogleSheet {
    static _getSheet(sheetIndex){
        return fetch("https://spreadsheets.google.com/feeds/list/1CcCXGgPrmARs6vQhgwoAg2_rZbtxx8l5UZsUHFy4VT0/"+sheetIndex+"/public/values?alt=json", {
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
            return data.feed.entry;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    static getInformations(){
        return this._getSheet(2).then(informations => {
            let res = informations.map(information => {
                return {
                    title: information.gsx$title.$t,
                    category: information.gsx$category.$t,
                    text: information.gsx$text.$t
                };
            });

            console.log(res);
            return res;
        })

    }

    static getConfiguration(){
        return this._getSheet(1).then(configurations => {
            let res = {};

            configurations.forEach(configuration => {
                res[configuration.gsx$egenskab.$t] = configuration.gsx$værdi.$t;
            });

            console.log(res);
            return res;
        })

    }
}

export default GoogleSheet;