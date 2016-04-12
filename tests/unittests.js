// load Unit.js module
var test = require('unit.js');
var Bill = require('../model/bill.js');
var Client = require('../model/client.js');

describe('Unit tests for the Bill class',function(){
	
	it('Create a new instance of a Bill and ensure correct init in Constructor',function(){
		var mybill = new Bill(1,'reference');	// new empty Bill	
		test.assert(mybill != null);
		test.assert(mybill._subtotal === 0);
		test.assert(mybill._discount === 0);
		test.assert(mybill._total === 0);
		test.assert(mybill._id === 1);
		test.assert(mybill._reference === 'reference');
		test.assert(mybill._lines.length === 0);				
	});
	
	it('Testing the CalcTotal function on a Bill object',function(){
		var mybill = new Bill(2,'reference');
		mybill._subtotal = 100;
		mybill._discount = 10;
		test.assert (mybill.CalcTotal() === 90);
		test.assert (mybill._total === 90);
	});				
});

describe('Unit tests for the Client class',function(){
	it('Create a client object',function(){
		var myClient = new Client('name', 'usertype', '1981/01/05');
		test.assert(myClient != null);
		test.assert(myClient._name === 'name');
		test.assert(myClient._usertype === 'usertype');		
		test.assert(myClient._startdate.getMonth() === 0);
		test.assert(myClient._startdate.getDate() === 5);
		test.assert(myClient._startdate.getFullYear() === 1981);
	});	
	
	it('Test duration method',function(){
		var myClient = new Client('name', 'usertype', '1981/01/05');
		var billDate = new Date(2016,4,12);
		var yearDiff = myClient.Duration(billDate);
		test.dump (yearDiff);
	});	
	
});