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

function EmployeeDiscount(name, discType, val)
{
	BaseDiscount.call(this,name, discType, val);
}

EmployeeDiscount.prototype = new BaseDiscount();

module.exports = 
	{
		BaseDiscount : BaseDiscount, 
		EmployeeDiscount : EmployeeDiscount
	};