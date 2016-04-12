
function Bill (id,reference)
{
  "use strict"    
  this._id = id;
  this._reference = reference;
  this._subtotal = 0;
  this._discount = 0;
  this._total = 0;
  this._lines = [];
}

Bill.prototype.CalcTotal = function()
{
  this._total = this._subtotal - this._discount; 
  return this._total;
}

Bill.prototype.AddLine = function ()
{
  
}

module.exports = Bill;
