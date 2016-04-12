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
