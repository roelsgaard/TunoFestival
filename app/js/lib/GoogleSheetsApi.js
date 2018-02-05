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
        return this._getSheet(2).then(informations => {
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
}

export default GoogleSheet;