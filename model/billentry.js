/* 
* CLASS NAME: BillEntry
* CLASS DESCRIPTION: The BillEntry class which contains the line items found on a Bill
*/

function BillEntry (id,seq,description,entrytype,amount)
{
  "use strict"
  // private fields
  
  // public fields    
	this.id = id;
	this.seq = seq;
	this.description = description;
	this.entrytype = entrytype;
	this.amount = amount;
}

module.exports = BillEntry;
