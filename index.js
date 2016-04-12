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

app.get('/', function (req, res) {  
  res.send('Hello World!');
});

app.listen(3000, function () {      
		var myBill = new Bill(1,'reference');
		myBill.SetClient( new Client('Test Customer 1', 'employee', '2013/01/01') );
		//myBill.lines.push( new BillEntry(1,0,'Line item 1','booze',100) );
		//myBill.lines.push( new BillEntry(2,1,'Line item 2','booze',1000) );
		myBill.lines.push( new BillEntry(3,2,'Line item 3','groceries',50) );
		myBill.CalcSubTotal();
					
		var discountAmnt = myBill.CalcDiscount();;
		console.log(discountAmnt);
	  console.log('Example app listening on port 3000!');
});