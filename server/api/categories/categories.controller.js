'use strict';

var _ = require('lodash');
var models = require('../models/models');
var fs = require('fs');
var async = require('async');
// Get list of categories
function modelFactory(type){

  var source = {};

  switch(type){
    case "business":
      source.model = models.BusinessCategory;  
      source.type = 'BusinessCategory';
      source.populate = '';
      source.populateFields = '';

    break;

    case "unit":
      source.model = models.UnitCategory;    
      source.type = 'UnitCategory';
      source.populate = '';
      source.populateFields = '';

    break;

    case "industry":
      source.model= models.IndsutryCategory;
      source.type= 'IndsutryCategory';
      source.populate = '';
      source.populateFields = '';

    break;

    case "installation":
      source.model = models.InstallationCategory;    
      source.type= 'InstallationCategory';
      source.populate = '';
      source.populateFields = '';

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
  var orderBy = req.params.orderBy || "name";
  var search = req.params.search || null;

  var factory = modelFactory(req.params.type);

  source = factory.model;  
  if (source==null) { return res.send(401); };

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

// Get a single category
exports.show = function(req, res) {
  var source = {};
  
  source = modelFactory(req.params.type).model;  
  if (source==null) { return res.send(404); };

  source.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  var source = {};
  
  source = modelFactory(req.params.type).model;  
  if (source==null) { return res.send(404); };

  req.body.creationDate = new Date();
  source.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.json(201, category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  var source = {};
  
  source = modelFactory(req.params.type).model;  
  if (source==null) { return res.send(401);};

  if(req.body._id) { delete req.body._id; }

  async.waterfall([
    function(callback){
      source.findById(req.params.id, callback);
    },
    function(category,callback){
      var updated = _.merge(category, req.body);
      updated.updateDate = new Date();
      updated.save(callback);
    }],
    function(err, category){
      if (err) { return handleError(res, err); }
      if(!category) { return res.send(404); }
      return res.json(200, category);
    });

  /*source.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    var updated = _.merge(category, req.body);
    updated.updateDate = new Date();
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, category);
    });
  });*/
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  var source = {};
  
  source = modelFactory(req.params.type).model;  
  if (source==null) { return res.send(404); };
  
 
  source.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });

};

exports.populate = function(req, res) {  
  if (req.params.type=="business") {

    // fs.readFile(__dirname + '/data/isoCountries.json', 'utf8', function (err, data) {
    //   if (err) {
    //     return res.send(err)
    //   }
    //   var objs = JSON.parse(data);
    //   objs.forEach(function(item){
    //     var nCountry = new models.BusinessCategory({
    //       name:item.name,
    //       code:item.countryCode,
    //       codeName:item.alpha3
    //     });

    //     nCountry.save(function(err,data){
    //       if (err){
    //         console.log("error");
    //       }
    //     });
    //   });
    // });

  }else{
    return res.send(404);
  };

};

function handleError(res, err) {
  return res.send(500, err);
}
