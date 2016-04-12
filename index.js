"use strict"
/* 

Main application entry page. 

*/
var test = require('unit.js');
var Bill = require('./model/bill.js');
var BillEntry = require('./model/billentry.js');
var Client = require('./model/client.js');
var Discount = require('./model/discount.js');
var express = require('express');
var app = express();

// This is a mock function that loads the bills and caluclates the Total Amount Due
function LoadBills()
{
		var myBill = new Bill(1,'reference');
		myBill.SetClient( new Client('Test Customer 1', 'employee', '2013/01/01') );		
		myBill.lines.push( new BillEntry(1,0,'Line item 1','groceries',50) );
		myBill.lines.push( new BillEntry(2,1,'Line item 2','groceries',50) );
		myBill.lines.push( new BillEntry(3,2,'Line item 2','booze',50) );
		myBill.CalcTotal();
		console.log("Bill Subtotal: " + myBill._subtotal + " Total Discount: " + myBill._discount + " Total Due: " + myBill._total); 
		
		return myBill;
}

// Routing magic happens here
app.get('/', function (req, res) {
	// Load an imaganry bill and Caluclate the discounts
	var bill = LoadBills();  
	// Then return the Bill object as JSON to the client
  	res.send(bill);
});


// Start express
app.listen(3000, function () {      
				
	  console.log('Example app listening on port 3000!');
});