/* 
* CLASS NAME: Bill
* CLASS DESCRIPTION: The main Bill class which contains customer details and bill lines
*/
var Discount = require('./discount.js');

// The discountMatrix is shared across all bills for this instance
// To add a new Discount, simply add it to the DiscountMatrix list
var DiscountMatrix = [
   new Discount.CustomerTypeDiscount('Employee Discount', '%', 30,'employee')
  ,new Discount.CustomerTypeDiscount('Affiliate Discount', '%', 10,'affiliate')
  ,new Discount.CustomerLoyaltyDiscount('Loyalty Discount', '%', 5,2)
  ,new Discount.BulkDiscount('Bulkd Discount', '$', 5,100)];


function Bill (id,reference)
{
  "use strict"
  // Private fields    
  this._id = id;
  this._reference = reference;
  this._subtotal = 0;
  this._discount = 0;
  this._total = 0;
  
  
  // Public fields  
  this.lines = [];
  this.client = {};
  this.financialDate = new Date();
}

// Method iterates through the DiscountMatrix and computes discount for each discount type
// Then for percentage discount only the highest discount is applied.
// For other discounts, all discounts are just summed together
Bill.prototype.CalcDiscount = function()
{
  this._discount = 0;
  var percAppliedAmount = 0;
  var normAppliedAmount = 0;
  for (var i=0;i< DiscountMatrix.length;i++)
  {
    var discountAmount =  DiscountMatrix[i].EvalEffect(this);
    // For a percentage discount, we explicitly apply only 1 discount. Namely the biggest discount 
    if (DiscountMatrix[i]._discType === '%')
    {
      percAppliedAmount =  (discountAmount > percAppliedAmount) ? discountAmount : percAppliedAmount;
    } 
    else
      normAppliedAmount += discountAmount;      
  }
  
  this._discount = percAppliedAmount + normAppliedAmount;
   
  return  this._discount;
}

// Iterates through the line items and calculate sub total
Bill.prototype.CalcSubTotal = function()
{
  this._subtotal = 0;
    
  for(var i=0;i< this.lines.length; i++){
      this._subtotal += this.lines[i].amount;
  }    
   
  return this._subtotal;
}

// Calculates the SubTotal, Discount and then Total
Bill.prototype.CalcTotal = function()
{
  this.CalcSubTotal();
  this.CalcDiscount();
  
  this._total = this._subtotal - this._discount;
   
  return this._total;
}

// Change the Client for this bill
Bill.prototype.SetClient = function(client)
{
  this.client = client;
}

module.exports = Bill;
