var promise = require('bluebird');
var request = require("request");
var hospitals = require("./hospitals");


var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);


function getHospitals(req, res, next) {
  var location=[req.body.lat, req.body.lng];
  var pagetoken=req.query.pagetoken;


  hospitals.hospitalsSP(location, pagetoken).then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err.message);
    });
 
  
}



function getHospitalsCsv(req, res, next) {
  var location=[req.body.lat, req.body.lng];
  var pagetoken=req.query.pagetoken;


  hospitals.hospitalsSP(location, pagetoken).then(result => {



      const Json2csvParser = require('json2csv').Parser;
      const fields = ['name', 'address_components', 'adr_address', 'formatted_address', 'loaction', 'icon', 'vicinity', 'website', 'formatted_phone_number', 'opening_hours', 'photos', 'reviews', 'rating'];
      const opts = { fields };
       
      try {
        const parser = new Json2csvParser(opts);
        const csv = parser.parse(result.results);
        res.setHeader('Content-disposition', 'attachment; filename=hospitais.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
      } catch (err) {
        console.error(err);
      }



    })
    .catch(err => {
      console.log(err.message);
    });
 
  
}



module.exports = {
  getHospitals: getHospitals,
  getHospitalsCsv: getHospitalsCsv
};
