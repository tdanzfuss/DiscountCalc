// load Unit.js module
var test = require('unit.js');
var Bill = require('../model/bill.js');
var BillEntry = require('../model/billentry.js');
var Client = require('../model/client.js');
var Discount = require('../model/discount.js');

describe('Unit tests for the Bill class',function(){
	
	it('Create a new instance of a Bill and ensure correct init in Constructor',function(){
		var mybill = new Bill(1,'reference');	// new empty Bill	
		test.assert(mybill != null);
		test.assert(mybill._subtotal === 0);
		test.assert(mybill._discount === 0);
		test.assert(mybill._total === 0);
		test.assert(mybill._id === 1);
		test.assert(mybill._reference === 'reference');
		test.assert(mybill.lines.length === 0);				
	});
				
});

describe('Unit tests for the Client class',function(){
	it('Create a client object',function(){
		var myClient = new Client('name', 'usertype', '1981/01/05');
		test.assert(myClient != null);
		test.assert(myClient._name === 'name');
		test.assert(myClient.usertype === 'usertype');		
		test.assert(myClient._startdate.getMonth() === 0);
		test.assert(myClient._startdate.getDate() === 5);
		test.assert(myClient._startdate.getFullYear() === 1981);
	});	
	
	it('Test duration method',function(){
		var myClient = new Client('name', 'usertype', '1981/01/05');
		var billDate = new Date(2016,4,12);
		var yearDiff = Math.floor(myClient.Duration(billDate));
		test.assert(yearDiff === 35);		
	});	
	
});

describe('Unit tests for the BillEntry class',function(){
	it('Create a BillEntry object',function(){
		var myEntry = new BillEntry('id,seq,description,entrytype,amount');
		test.assert(myEntry != null);
	});		
	
	it('Create a BillEntry object with a Client and Bill entries',function(){
		var myBill = new Bill(1,'reference');
		test.assert(myBill != null);
		myBill.SetClient( new Client('Test Customer 1', 'employee', '2016/01/01') );
		myBill.lines.push( new BillEntry(1,0,'Line item 1','booze',100) );
		myBill.lines.push( new BillEntry(2,1,'Line item 2','booze',1000) );
		myBill.lines.push( new BillEntry(3,2,'Line item 3','airtime',50) );
		
		test.assert(myBill.CalcSubTotal() === 1150 );					
	});	
	
});

describe('Unit tests for the Discount classes',function(){
	it('Create a Discount object',function(){
		var myDiscount = new Discount.CustomerTypeDiscount('Employee Discount', '%', 30,'employee');
		test.assert(myDiscount != null);
		test.assert(myDiscount._name === 'Employee Discount');
		test.assert(myDiscount._discType === '%');
		test.assert(myDiscount._val === 30);
		test.assert(myDiscount._customerType === 'employee');
	});		
	
	it('Test Customer Type Discount',function(){
		var myDiscount = new Discount.CustomerTypeDiscount('Employee Discount', '%', 30,'employee');
		var myBill = new Bill(1,'reference');
		myBill.SetClient( new Client('Test Customer 1', 'employee', '2016/01/01') );
		myBill.lines.push( new BillEntry(1,0,'Line item 1','booze',100) );
		myBill.lines.push( new BillEntry(2,1,'Line item 2','booze',1000) );
		myBill.lines.push( new BillEntry(3,2,'Line item 3','airtime',50) );
		myBill.CalcTotal();
		var discountAmnt = myDiscount.EvalEffect(myBill); 		
		test.assert(discountAmnt === 345);
	});		
	
	it('Test Customer Loalty Discount',function(){
		var myDiscount = new Discount.CustomerLoyaltyDiscount('Loyalty Discount', '%', 5,2);
		var myBill = new Bill(1,'reference');
		myBill.SetClient( new Client('Test Customer 1', 'employee', '2013/01/01') );
		myBill.lines.push( new BillEntry(1,0,'Line item 1','booze',100) );
		myBill.lines.push( new BillEntry(2,1,'Line item 2','booze',1000) );
		myBill.lines.push( new BillEntry(3,2,'Line item 3','airtime',50) );
		myBill.CalcTotal();		
		var discountAmnt = myDiscount.EvalEffect(myBill);			
		test.assert(discountAmnt === 57.5);
	});
	
	it('Test Bulk Discount',function(){
		var myDiscount = new Discount.BulkDiscount('Bulkd Discount', '$', 5,100);
		var myBill = new Bill(1,'reference');
		myBill.SetClient( new Client('Test Customer 1', 'employee', '2013/01/01') );
		myBill.lines.push( new BillEntry(1,0,'Line item 1','booze',100) );
		myBill.lines.push( new BillEntry(2,1,'Line item 2','booze',1000) );
		myBill.lines.push( new BillEntry(3,2,'Line item 3','airtime',50) );
		myBill.CalcTotal();		
		var discountAmnt = myDiscount.EvalEffect(myBill);	
		test.assert(discountAmnt === 55);
	});
	
});

describe('Unit tests for Bill Class E2E',function(){
	
	var myBill = new Bill(1,'reference');	
	myBill.SetClient( new Client('Test Customer 1', 'unknown', '2016/01/01') );
	myBill.lines.push( new BillEntry(1,0,'Line item 1','booze',10) );
	myBill.lines.push( new BillEntry(2,1,'Line item 2','booze',20) );
	myBill.lines.push( new BillEntry(3,2,'Line item 3','airtime',50) );
	myBill.CalcTotal();	
		
	it('No discount due',function(){					
		// No discount due	
		test.assert(myBill.CalcDiscount() === 0 );					
	});	
	
	it('Customer Empmloyee discount due',function(){
		myBill.SetClient( new Client('Test Customer 1', 'employee', '2016/01/01') );
		// Only Employee discount due.
		// Non grocery subtotal = $80 * 30% = $24		
		test.assert(myBill.CalcDiscount() === 24 );					
	});	
	
	it('Customer Affiliate discount due',function(){
		myBill.SetClient( new Client('Test Customer 1', 'affiliate', '2016/01/01') );	
		// Only Affiliate discount due.
		// Non grocery subtotal = $80 * 10% = $8					
		test.assert(myBill.CalcDiscount() === 8 );					
	});	
	
	it('Customer Loyalty discount due',function(){
		myBill.SetClient( new Client('Test Customer 1', 'unknown', '2014/01/01') );
		// Only Loyalty discount due.
		// Non grocery subtotal = $80 * 5% = $8						
		test.assert(myBill.CalcDiscount() === 4 );					
	});	
	
	it('Bulk discount due',function(){
		// Only Bulk discount due.
		// Subtotal = floor($210/100) * $5 = $10	
		myBill.SetClient( new Client('Test Customer 1', 'unknown', '2016/01/01') );		
		myBill.lines.push( new BillEntry(4,3,'Line item 4','groceries',130) );
		myBill.CalcTotal();							
		test.assert(myBill.CalcDiscount() === 10 );					
	});	
	
	it('Percentage discount due - with groceries excluded from Percentage calcs',function(){
		// Bulk discount due.
		// Loyalty Discount due on all except groceries
		// Subtotal excl Groceries $80 * 5% = $4
		// Bulk Discount due floor($210/100) * $5 = $10
		// Total discount due $14
		myBill.SetClient( new Client('Test Customer 1', 'unknown', '2014/01/01') );								
		test.assert(myBill.CalcDiscount() === 14 );					
	});	
	
	it('Percentage discount due - Only one percentage discount applies',function(){
		// Multiple percentage discounts due (employee and loaylty)
		// Employee discount = $24		
		// Bulk Discount due floor($210/100) * $5 = $10
		// Total discount due $34
		myBill.SetClient( new Client('Test Customer 1', 'employee', '2013/01/01') );									
		test.assert(myBill.CalcDiscount() === 34 );					
	});		
	
});