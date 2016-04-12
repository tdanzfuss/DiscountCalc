// load Unit.js module
var test = require('unit.js');
var Bill = require('../model/bill.js');

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