/* 
* CLASS NAME: BaseDiscount
* CLASS DESCRIPTION: The base discount class that contains basic discount computations
*/

function BaseDiscount(name, discType, val)
{
	this._name = name;
	this._discType = discType;
	this._val = val;
	this._percExclusionlist = ['groceries'];
	this._valExclusionlist = [];	
}

// The basic method that should be ovverridden for each child class
BaseDiscount.prototype.EvalEffect = function (bill)
{
	return 0; 
}

// Method checks for the type of discount and invoke respective method
BaseDiscount.prototype.Calc = function(bill)
{
	var discountAmount = 0;
	if (this._discType === '%')
	{
		discountAmount = this.CalcPercentageBasedDiscount(bill);		
	} 
	else 
	{
		discountAmount = this._val;
	} 
		
	return discountAmount;
}

// Percentage based discounts use this method.
// It excludes all the customer types listed in the exclusion list
BaseDiscount.prototype.CalcPercentageBasedDiscount = function (bill)
{
	var subtotal = 0;
	for (var i = 0 ; i < bill.lines.length; i++)
	{
		if (this._percExclusionlist.indexOf(bill.lines[i].entrytype) < 0 )
			subtotal += bill.lines[i].amount;
	}
	
	return subtotal * (this._val / 100);	
} 

/* 
* CLASS NAME: CustomerTypeDiscount
* CLASS DESCRIPTION: The Customer Type discount. Accepts a customerType and applies a specific discount for it
*/

function CustomerTypeDiscount(name, discType, val, customerType)
{
	BaseDiscount.call(this,name, discType, val);
	this._customerType = customerType;
}

CustomerTypeDiscount.prototype = new BaseDiscount();
// Override Base.EvalEffect to check userType.
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

/* 
* CLASS NAME: CustomerLoyaltyDiscount
* CLASS DESCRIPTION: The Customer Loyalty discount. Accepts a loaylty period(in years) and applies a specific discount for it
*/
function CustomerLoyaltyDiscount(name, discType, val, period)
{
	BaseDiscount.call(this,name, discType, val);
	this._period = period;
}
CustomerLoyaltyDiscount.prototype = new BaseDiscount();
// Override Base.EvalEffect to check client loaylty.
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

/* 
* CLASS NAME: BulkDiscount
* CLASS DESCRIPTION: The Bulk discount. Accepts a bulkValue and applies a specific discount for it
*/
function BulkDiscount (name, discType, val, bulkValue)
{
	BaseDiscount.call(this,name, discType, val);
	this._bulkValue = bulkValue;
}
BulkDiscount.prototype = new BaseDiscount();
// Override Base.EvalEffect to check to apply bulk discount.
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