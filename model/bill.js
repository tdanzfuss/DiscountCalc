var Discount = require('./discount.js');

// The discountMatrix is shared across all bills for this instance
/*var DiscountMatrix = [
  new Discount('Employee Discount', '%', 30),
  new Discount('Affiliate Discount', '%', 10),
  new Discount('Long Term Customer Discount', '%', 5),
  new Discount('Dollar based Discount', '$', 5)];
*/

function Bill (id,reference)
{
  "use strict"
  // Private fields    
  this._id = id;
  this._reference = reference;
  this._subtotal = 0;
  this._discount = 0;
  this._total = 0;
  this._client = {};
  
  // Public fields  
  this.lines = [];
}

Bill.prototype.CalcDiscount = function()
{
  this._discount = 0;
  // employee discount
  // affiliate discount
  // long term discount
  // $100 discount
  
}

Bill.prototype.CalcTotal = function()
{
  this._subtotal = 0;
    
  for(var i=0;i< this.lines.length; i++){
      this._subtotal += this.lines[i].amount;
  }
  
  this._total = this._subtotal - this._discount;
   
  return this._total;
}

Bill.prototype.SetClient = function(client)
{
  this._client = client;
}

module.exports = Bill;
