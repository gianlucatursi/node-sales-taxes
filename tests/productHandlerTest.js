const test = require('tape');
const ProductHandler = require('../src/ProductHandler');
const Product = require('../src/Product');

test('Product Handler check PRODUCT_REGEX for scan', function(t){

  var notThrow1 = ProductHandler.analize.bind(undefined, "1 button at 10");
  var notThrow2 = ProductHandler.analize.bind(undefined, "10 imported button at 10");
  var notThrow3 = ProductHandler.analize.bind(undefined, "3 button great at 11.22");
  var notThrow4 = ProductHandler.analize.bind(undefined, "1 imported button great at 23.33");

  t.doesNotThrow(notThrow1, "'1 button at 10' should be a valid input");
  t.doesNotThrow(notThrow2, "'10 imported button at 10' should be a valid input");
  t.doesNotThrow(notThrow3, "'3 button great at 11.22' should be a valid input");
  t.doesNotThrow(notThrow4, "'1 imported button great at 23.33' should be a valid input");

  var throw1 = ProductHandler.analize.bind(undefined, "1.2 button at 10");
  var throw2 = ProductHandler.analize.bind(undefined, "10 button at");
  var throw3 = ProductHandler.analize.bind(undefined, "3");
  var throw4 = ProductHandler.analize.bind(undefined, "imported button great at 23.33");
  var throw5 = ProductHandler.analize.bind(undefined, "1 great at <PRICE>");

  t.throws(throw1, "'1 button at 10' should NOT be a valid input");
  t.throws(throw2, "'10 imported button at 10' should NOT be a valid input");
  t.throws(throw3, "'3 button great at 11.22' should NOT be a valid input");
  t.throws(throw4, "'imported button great at 23.33' should NOT be a valid input");
  t.throws(throw5, "'1 great at <PRICE>' should NOT be a valid input");

  t.end();

});

test('Product Handler tax of product', function(t){

  var product1 = new Product({
    price: 10,
    name: 'NoTax',
    type: 'food'
  });

  var product2 = new Product({
    price: 10,
    name: 'Sales Tax',
    type: 'other'
  });


  var product3 = new Product({
    price: 10,
    name: 'imported',
    type: 'food'
  });

  var product4 = new Product({
    price: 10,
    name: 'Sales and imported',
    type: 'other'
  });

  t.equal(ProductHandler.getTaxedPriceOf(product1), '10.00', "Price with Tax for <'NoTax',10,food> should be 10");
  t.equal(ProductHandler.getTaxedPriceOf(product2), '11.00', "Price with Tax for <'Sales Tax',10,other> should be 11");
  t.equal(ProductHandler.getTaxedPriceOf(product3), '10.50', "Price with Tax for <'imported',10,food> should be 10.50");
  t.equal(ProductHandler.getTaxedPriceOf(product4), '11.50', "Price with Tax for <'Sales and imported',10,other> should be 11.50");

  t.end();
});