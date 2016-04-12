function BaseDiscount(name, discType, val)
{
	this._name = name;
	this._discType = discType;
	this._val = val;
}

BaseDiscount.prototype.EvalEffect = function (bill)
{
	return 0; 
}

BaseDiscount.prototype.Calc = function(bill)
{
	var discountAmount = 0;
	if (this._discType === '%')
	{
		discountAmount = bill._subtotal * (this._val / 100);
	} 
	else 
	{
		discountAmount = this._val;
	} 
		
	return discountAmount;
}

function CustomerTypeDiscount(name, discType, val, customerType)
{
	BaseDiscount.call(this,name, discType, val);
	this._customerType = customerType;
}

CustomerTypeDiscount.prototype = new BaseDiscount();
CustomerTypeDiscount.prototype.EvalEffect = function(bill)
{
	var discountAmount = 0;
	if (bill.client.usertype === this._customerType)
	{
		// This discount is applicable
		discountAmount = this.Calc(bill);
	}	
	
	return discountAmount;
}

function CustomerLoyaltyDiscount(name, discType, val, period)
{
	BaseDiscount.call(this,name, discType, val);
	this._period = period;
}
CustomerLoyaltyDiscount.prototype = new BaseDiscount();
CustomerLoyaltyDiscount.prototype.EvalEffect = function(bill)
{
	var discountAmount = 0;
	
	if (bill.client.Duration(bill.financialDate) >= this._period)
	{
		// This discount is applicable
		discountAmount = this.Calc(bill);		
	}	
	
	return discountAmount;
}

function BulkDiscount (name, discType, val, bulkValue)
{
	BaseDiscount.call(this,name, discType, val);
	this._bulkValue = bulkValue;
}
BulkDiscount.prototype = new BaseDiscount();
BulkDiscount.prototype.EvalEffect = function(bill)
{
	var discountAmount = 0;
	if (this._discType === '%')
	{
		// Apply normal percentage discount
		discountAmount = bill._subtotal * (this._val / 100);
	} 
	else 
	{
		// Apply custom bulk discount
		discountAmount = (Math.floor(bill._subtotal/this._bulkValue)) * this._val;
	}
	return discountAmount;
}

module.exports = 
	{
		BaseDiscount : BaseDiscount, 
		CustomerTypeDiscount : CustomerTypeDiscount,
		CustomerLoyaltyDiscount : CustomerLoyaltyDiscount,
		BulkDiscount : BulkDiscount
	};