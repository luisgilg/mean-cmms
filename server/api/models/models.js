'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var async = require('async');


/////////////////////////////////////////
///SCHEMAS
/////////////////////////////////////////

var CategorySchema = new Schema({
	creationDate : { type : Date, default : Date.now },
	updateDate : { type : Date, default : Date.now },
	code : { type : String, required : true, minlength : 1 },
	name : { type : String, required : true, minlength : 3, maxlength : 256 }
}, { collection : 'categories', DiscriminatorKey : '__t' } );

var UseLocationSchema = new Schema({
	codeName : { type : String },
	creationDate : { type : Date, default : Date.now },
	updateDate : { type : Date, default : Date.now },
	code : { type : String, required : true, minlength : 1 },
	name : { type : String, required : true, minlength : 3, maxlength : 256 }
}, { collection : 'locations', DiscriminatorKey : '__t' } );

var BusinessCategorySchema = CategorySchema.extend({
	owners : [{ type : Schema.ObjectId, ref : 'Organization' }]
});

var UnitCategorySchema = CategorySchema.extend({
	units : [{ type : Schema.ObjectId, ref : 'Unit' }]
});

var UnitSchema = UseLocationSchema.extend({
	category : { type : Schema.ObjectId, ref : 'UnitCategory' },
	installation : { type : Schema.ObjectId, ref : 'Installation' }
});

var OrganizationSchema = UseLocationSchema.extend({
	business : { type : Schema.ObjectId, ref : 'BusinessCategory' },
	industry : { type : Schema.ObjectId, ref : 'IndsutryCategory' },
	installations : [{ type : Schema.ObjectId, ref : 'Installation' }]
});

var InstallationCategorySchema = CategorySchema.extend({
	installations : [{ type : Schema.ObjectId, ref : 'Installation' }]
});

var InstallationSchema = UseLocationSchema.extend({
	category : { type : Schema.ObjectId, ref : 'InstallationCategory' },
	owner : { type : Schema.ObjectId, ref : 'Organization' },
	units : [{ type : Schema.ObjectId, ref : 'Unit' }],
	location : { type : Schema.ObjectId, ref : 'Country' }
});

var IndsutryCategorySchema = CategorySchema.extend({
	owners : [{ type : Schema.ObjectId, ref : 'Organization' }]
});

var CountrySchema = UseLocationSchema.extend({
	installations : [{ type : Schema.ObjectId, ref : 'Installation' }]
});



/////////////////////////////////////////
///INDEXES
/////////////////////////////////////////



UseLocationSchema.index({ code: 'text', codeName: 'text', name: 'text' });
CategorySchema.index({ code: 'text', name: 'text' });


/////////////////////////////////////////
///MIDLEWARE
/////////////////////////////////////////

OrganizationSchema.pre('update',function(){
	var doc = this;
	var docId = doc._id.toString();

	async.parallel({
		business:function(callback){
			if(doc.business!=null){
				var businessModel = models.BusinessCategory;
				businessModel.update({owners:docId},{$pull:{owners:docId}},callback);
			}
		},
		industry:function(callback){
			if(doc.industry!=null){
				var industryModel = models.IndsutryCategory;
				industryModel.update({owners:docId},{$pull:{owners:docId}},callback);
			}
		}

	},function(err,result){
		console.log("pre" + result);
		
	});
});

OrganizationSchema.post('update',function(doc){
	//var doc = this;
	console.log('in post');
	var docId = doc._id.toString();

	async.parallel({
		business:function(callback){
			if(doc.business!=null){
				var businessId=doc.business.toString();
				var businessModel = models.BusinessCategory;

				businessModel.find({owners:docId},function(err,obj){
					obj.update({$push:{owners:docId}},callback);
				});

				//businessModel.update({owners:docId},{$push:{owners:docId}},callback);
			}
		},
		industry:function(callback){
			if(doc.industry!=null){
				var industryId=doc.industry.toString();
				var industryModel = models.IndsutryCategory;
				//industryModel.update({owners:docId},{$push:{owners:docId}},callback);
				industryModel.find({owners:docId},function(err,obj){
					obj.update({$push:{owners:docId}},callback);
				});
			}
		}

	},function(err,result){
		console.log("post" + result);

		
	});	
});

OrganizationSchema.post('save',function(doc){
	var docId = doc._id.toString();

	async.parallel({
		business:function(callback){
			if(doc.business!=null){
				var businessId=doc.business.toString();
				var businessModel = models.BusinessCategory;
				businessModel.findByIdAndUpdate(businessId,{$push:{owners:docId}},callback);
			}
		},
		industry:function(callback){
			if(doc.industry!=null){
				var industryId=doc.industry.toString();
				var industryModel = models.IndsutryCategory;
				industryModel.findByIdAndUpdate(industryId,{$push:{owners:docId}},callback);
			}
		}

	},function(err,result){		

	});	
});

OrganizationSchema.post('remove',function(doc){
	var docId = doc._id.toString();

	async.parallel({
		business:function(callback){
			if(doc.business!=null){
				var businessId=doc.business.toString();
				var businessModel = models.BusinessCategory;
				businessModel.findByIdAndUpdate(businessId,{$pull:{owners:docId}},callback);
			}
		},
		industry:function(callback){
			if(doc.industry!=null){
				var industryId=doc.industry.toString();
				var industryModel = models.IndsutryCategory;
				industryModel.findByIdAndUpdate(industryId,{$pull:{owners:docId}},callback);
			}
		}

	},function(err,result){		

	});	
});


/////////////////////////////////////////
///MODEL FACTORY
/////////////////////////////////////////


var models = {
	Category : mongoose.model('Category', CategorySchema),
	UseLocation : mongoose.model('UseLocation', UseLocationSchema),
	BusinessCategory : mongoose.model('BusinessCategory', BusinessCategorySchema),
	UnitCategory : mongoose.model('UnitCategory', UnitCategorySchema),
	Unit : mongoose.model('Unit', UnitSchema),
	Organization : mongoose.model('Organization', OrganizationSchema),
	InstallationCategory : mongoose.model('InstallationCategory', InstallationCategorySchema),
	Installation : mongoose.model('Installation', InstallationSchema),
	IndsutryCategory : mongoose.model('IndsutryCategory', IndsutryCategorySchema),
	Country : mongoose.model('Country', CountrySchema)
};

module.exports =models;