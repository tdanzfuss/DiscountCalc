# Project: DiscountCalc
This project is a set of classes that can be used by retail websites to calculate fancy discounts

## Getting Started
This project is built in NodeJS and express.
For testing purposes we use UnitJS ith mocha as the test execution platform

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
