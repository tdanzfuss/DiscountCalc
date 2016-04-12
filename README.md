# Project: DiscountCalc
This project is a set of classes that can be used by retail websites to calculate fancy discounts

## Getting Started
This project is built in NodeJS and express.
For testing purposes we use UnitJS with mocha as the test execution platform

### Running the Unit tests
mocha tests/unittests.js

### Running the App
node index.js
Then use your favourite browser(Chrome) and navigate to http://localhost:3000

## The logic
The client provided the following discount logic:
> On a retail website, the following discounts apply: 
> 1. If the user is an employee of the store, he gets a 30% discount 
> 2. If the user is an affiliate of the store, he gets a 10% discount 
> 3. If the user has been a customer for over 2 years, he gets a 5% discount. 
> 4. For every $100 on the bill, there would be a $ 5 discount (e.g. for $ 990, you get $ 45 as a discount). 
> 5. The percentage based discounts do not apply on groceries. 
> 6. A user can get only one of the percentage based discounts on a bill. Write a program with test cases such that given a bill, it finds the net payable amount. Please note the stress is on object oriented approach and test coverage.  

### Implementation Logic
We created the following classes to implement the logic:
#### Bill
A Bill Class contains the following properties
ID
reference
Subtotal
Discount
Total

-> client: user
	-> Name
	-> userType
	-> isEmployee
	-> isAffiliate
	-> customerSince
	
-> BillLines: billentry
	-> amount
	-> billType

#### Discount
The discount class is where most of the magic happens.
To support the various types of discount we've created child classes like CustomerTypeDiscount, CustomerLoyaltyDiscount and BulkDiscount.
Each child class overrides the EvalEffect method to implement its specific discount logic
	-> BaseDiscount
	-> CustomerTypeDiscount
	-> CustomerLoyaltyDiscount
	-> BulkDiscount
	
### Discount Calculation
Discounts are configured by adding them to the a discountMatrix which shared across all bills

To add a new Discount, simply add it to the DiscountMatrix list. e.g.
var DiscountMatrix = [
   new Discount.CustomerTypeDiscount('Employee Discount', '%', 30,'employee')
  ,new Discount.CustomerTypeDiscount('Affiliate Discount', '%', 10,'affiliate')
  ,new Discount.CustomerLoyaltyDiscount('Loyalty Discount', '%', 5,2)
  ,new Discount.BulkDiscount('Bulkd Discount', '$', 5,100)];