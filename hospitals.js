
const API_KEY = process.env.API_KEY; // specify your API key here

if (API_KEY==null || API_KEY=="" || API_KEY==undefined){
    console.error("ERROR: Did you created a .env file with API_KEY=<your_api_key_from_googleplaces> ??")
    return
}

var googleMapsClient = require('@google/maps').createClient({
  key: API_KEY
});

var request = require("request");


function hospitalsSP(nearByLocation, next_page_token=null){
    
    return new Promise(function(resolve, reject) {
        placesdf=[];

        var result=null;
        if(next_page_token==null){
            googleMapsClient.placesNearby({keyword:'SP', location:nearByLocation,type:'hospital', rankby:'distance'}, next)
        }else{
            googleMapsClient.placesNearby({keyword:'SP', location:nearByLocation,type:'hospital', rankby:'distance', pagetoken:next_page_token},next); 
        }
    
        function next(err, result){
            if (result.json.results.length>0){
                var placesdf=[];
                var getPromices=[];
                result.json.results.forEach(function(place) {
    
                    var newpromice = new Promise(function(resolve, reject) {
                        var options = { 
                            method: 'GET',
                            url: 'https://maps.googleapis.com/maps/api/place/details/json',
                            qs: {
                                placeid: place.place_id,
                                key:API_KEY},
                            headers: { 'cache-control': 'no-cache' } 
                        };
                    
                        request(options, function (error, response, body) {
                            if (error) throw new Error(error);
                    
                            resolve(body);
                        });
                     });
    
                    newpromice.then(body => {
                        var jbody=JSON.parse(body);
                        placesdf.push(jbody.result);
                        return;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
    
    
    
                    //now add thins promice to array
                    getPromices.push(newpromice);
                });
    
    
                var all =Promise.all(getPromices).then(result=>{
                    console.info("all details collected");
                    resolve(placesdf);
                }).catch(reason=>{
                    console.warn('Failed!', reason);
                    reject(null)
                })
    
            }else{
                reject(null)
            }
        }
    })
}





module.exports = {
    hospitalsSP: hospitalsSP
};
  