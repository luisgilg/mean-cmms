var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	creationDate : { type : Date, default : Date.now },
	updateDate : { type : Date, default : Date.now },
	code : { type : String, required : true, minlength : 1 },
	name : { type : String, required : true, minlength : 3, maxlength : 256 }
}, { collection : 'categories', DiscriminatorKey : '_type' } );

var UseLocationSchema = new Schema({
	codeName : { type : String },
	creationDate : { type : Date, default : Date.now },
	updateDate : { type : Date, default : Date.now },
	code : { type : String, required : true, minlength : 1 },
	name : { type : String, required : true, minlength : 3, maxlength : 256 }
}, { collection : 'locations', DiscriminatorKey : '_type' } );

var BusinessCategorySchema = CategorySchema.extend({
	owners : [{ type : Schema.ObjectId, ref : 'Ornganization' }]
});

var UnitCategorySchema = CategorySchema.extend({
	units : [{ type : Schema.ObjectId, ref : 'Unit' }]
});

var UnitSchema = UseLocationSchema.extend({
	category : { type : Schema.ObjectId, ref : 'UnitCategory' },
	installation : { type : Schema.ObjectId, ref : 'Installation' }
});

var OrnganizationSchema = UseLocationSchema.extend({
	business : { type : Schema.ObjectId, ref : 'BusinessCategory' },
	Industry : { type : Schema.ObjectId, ref : 'IndsutryCategory' },
	installations : [{ type : Schema.ObjectId, ref : 'Installation' }]
});

var InstallationCategorySchema = CategorySchema.extend({
	installations : [{ type : Schema.ObjectId, ref : 'Installation' }]
});

var InstallationSchema = UseLocationSchema.extend({
	category : { type : Schema.ObjectId, ref : 'InstallationCategory' },
	owner : { type : Schema.ObjectId, ref : 'Ornganization' },
	units : [{ type : Schema.ObjectId, ref : 'Unit' }],
	location : { type : Schema.ObjectId, ref : 'Country' }
});

var IndsutryCategorySchema = CategorySchema.extend({
	owners : [{ type : Schema.ObjectId, ref : 'Ornganization' }]
});

var CountrySchema = UseLocationSchema.extend({
	installations : [{ type : Schema.ObjectId, ref : 'Installation' }]
});

var Category = mongoose.model('Category', CategorySchema); 
var UseLocation = mongoose.model('UseLocation', UseLocationSchema); 
var BusinessCategory = mongoose.model('BusinessCategory', BusinessCategorySchema); 
var UnitCategory = mongoose.model('UnitCategory', UnitCategorySchema); 
var Unit = mongoose.model('Unit', UnitSchema); 
var Ornganization = mongoose.model('Ornganization', OrnganizationSchema); 
var InstallationCategory = mongoose.model('InstallationCategory', InstallationCategorySchema); 
var Installation = mongoose.model('Installation', InstallationSchema); 
var IndsutryCategory = mongoose.model('IndsutryCategory', IndsutryCategorySchema); 
var Country = mongoose.model('Country', CountrySchema); 

