'use strict';

var _ = require('lodash');
var models = require('../models/models');
var fs = require('fs');
var async = require('async');
// Get list of locationss

function modelFactory(type){

  var source = {};

  switch(type){
    case 'country':
      source.model = models.Country;  
      source.type='Country';
      source.populate='';  
      source.populateFields='';

    break;

    case 'organization':
      source.model = models.Organization;   
      source.type='Organization';
      source.populate='business industry';
      source.populateFields='code name';
    break;
  
    default:
      source=null;

    break;
  }

  return source;
}

exports.index = function(req, res) {
  var source = {};
  var pageSize = req.params.pageSize || 20;
  var page =  req.params.page || 1;
  var orderBy = req.params.orderBy || 'name';
  var search = req.params.search || null;

  var factory =modelFactory(req.params.type); 
  source = factory.model;

  if (source==null) { return res.send(400); };

  var options = {
        skip:pageSize*(page-1),
        limit:pageSize
      };

  if (orderBy) {
    var orderParams = orderBy.split(' ');
    if (orderParams[1]=='asc') {
      orderParams[1] = '1';
    }else{
      orderParams[1] = '-1'
    }
    var sort ={};
    sort[orderParams[0]] = orderParams[1]; 

    options.sort = sort;
  };

  var query = {};

  if (search!=null && search!='$') {
    query = {$text:{$search: search}};
  };
   
  query.__t = factory.type;

  async.parallel({
    data:function(callback){
      return source.find(query,null,options)
      .populate(factory.populate,factory.populateFields)
      .exec(callback);
    },
    totalItems:function(callback){
      return source.count(query,callback);
    }
  },
  function(err, result){
      if(err) { return handleError(res, err); }
      return res.json(200, result);
  });
};

// Get a single locations
exports.show = function(req, res) {
  var source = {};
  
  source = modelFactory(req.params.type).model;  
  if (source==null) { return res.send(400); };

  source.findById(req.params.id, function (err, locations) {
    if(err) { return handleError(res, err); }

    if(!locations) { return res.send(404); }

    return res.json(200,locations);
  });
};

// Creates a new locations in the DB.
exports.create = function(req, res) {
  var source = {};
  
  source = modelFactory(req.params.type).model;  
  if (source==null) { return res.send(400);};

  req.body.creationDate = new Date();

  source.create(req.body, function(err,result){
    if(err) { return handleError(res, err); }
    return res.json(201, result);    
  });
};

// Updates an existing locations in the DB.
exports.update = function(req, res) {
  var source = {};
  
  source = modelFactory(req.params.type).model;  
  if (source==null) { return res.send(400); };

  if(req.body._id) { delete req.body._id; }

  async.waterfall([
    function(callback){
      return source.findById(req.params.id, callback);
    },
    function(locations,callback){
      
      if(!locations) { return callback(null,null); }

      var updated = _.merge(locations, req.body);
      updated.updateDate = new Date();
      return updated.save(callback);
    }],
    function(err,locations){
      
      if (err) { return handleError(res, err); }

      if(!locations) { return res.send(404); }

      return res.json(201,locations);
    });
};

// Deletes a locations from the DB.
exports.destroy = function(req, res) {
  var source = {};
  
  source = modelFactory(req.params.type).model;  
  if (source==null) { return res.send(400); };

  

  async.waterfall([
    function(callback){
      return source.findById(req.params.id,callback);
    },
    function(locations,callback){
      if(!locations) {return callback(null,null)}

      return locations.remove(callback);
    }],
    function(err,locations){
      if(err) { return handleError(res, err); }
      if(!locations) { return res.send(404); }

      return res.send(204);    
    });  
};

exports.populate = function(req, res) {  
  if (req.params.type=='country') {

    fs.readFile(__dirname + '/data/isoCountries.json', 'utf8', function (err, data) {
      if (err) {
        return res.send(err)
      }
      var objs = JSON.parse(data);
      objs.forEach(function(item){
        var nCountry = new models.Country({
          name:item.name,
          code:item.countryCode,
          codeName:item.alpha3
        });

        nCountry.save(function(err,data){
          if (err){
            console.log('error');
          }
        });
      });
    });

  }else{
    return res.send(404);
  };

};

function handleError(res, err) {
  return res.send(500, err);
}