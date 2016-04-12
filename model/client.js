function Client (name, usertype, startdate)
{
  "use strict"   
  this._name = name;
  this._usertype = usertype;
  this._startdate = startdate;
}

module.exports = Client;