/* 
* CLASS NAME: Client
* CLASS DESCRIPTION: Contains Client details thats contained on a Bill
*/
var moment = require('moment');

function Client (name, usertype, startdate)
{
  "use strict"  
  // private variables 
  this._name = name;
  
  var ts = Date.parse(startdate);
  if (!isNaN(ts))
    this._startdate = new Date(ts);
  else
    this._startdate = new Date();
    
    // public variables
  this.usertype = usertype;  
}

// This method calculates how long a client has been a customer.
// If no input is provided it uses the current date
// period can either be days, months or years
Client.prototype.Duration = function( endDate , period )
{
  if (endDate == null)
    endDate = new Date();       
  
  var start = moment([this._startdate.getFullYear(),this._startdate.getMonth(), this._startdate.getDate()]);
  var end = moment([endDate.getFullYear(),endDate.getMonth(), endDate.getDate()]);
    
  var diff = moment.duration(end.diff(start));
  
  if (period === 'days')
    return diff.asDays();
  if (period === 'months')
    return diff.asMonths();
    // default return number of years
  return diff.asYears();
}

module.exports = Client;