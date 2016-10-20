const test = require('tape');
const Product = require('../src/Product');

test('Create default Product', function(t){

  var product = new Product({});
  t.equal(product.getName(), '', 'Empty product should have empty name');
  t.equal(product.getType(), 'other', 'Empty product should have "other" as type');
  t.equal(product.getPrice(), 0, 'Empty product should have 0 as price');

  t.end();
});

test('Create Product', function(t){

  var product = new Product({
    price: 10,
    name: 'ProductName',
    type: 'food'
  });

  t.equal(product.getName(), 'ProductName', 'Product name should be "ProductName"');
  t.equal(product.getPrice(), 10, 'Product Price should be an integer and 10');
  t.equal(product.getType(), 'food', 'Product type should be "food"');

  t.end();
});

test('Check Product types', function(t){

  var product = new Product({
    price: 10,
    name: 'ProductName',
    type: 'food'
  });

  var typeName = product.getName().constructor;
  var typePrice = product.getPrice().constructor;
  var typeType = product.getType().constructor;

  t.equal(typeName, ''.constructor, 'Product name should be a string');
  t.equal(typePrice, Number(10).constructor, 'Product Price should be number');
  t.equal(typeType, ''.constructor, 'Product type should be a string');

  t.end();
});

/**
 * Test input #3
 */
test('Product Setters', function(t){

  var product = new Product({});

  //name
  product.setName("Name");
  t.equal(product.getName(), 'Name', 'Product setter should be set name: "Name"');
  product.setName("NewName");
  t.equal(product.getName(), 'NewName', 'Product setter should be set "NewName"');

  //price
  product.setPrice(10.30);
  t.equal(product.getPrice(), 10.30, 'Product setter should be set price: 10.30');
  product.setPrice("5.21");
  t.equal(product.getPrice(), 5.21, 'Product setter should be set price: 5.21');

  t.throws(product.setPrice.bind(product, "hi"), "Product price should be a number" , 'Product price should be a number');

  //type
  product.setType("food");
  t.equal(product.getType(), 'food', 'Product setter should be set type:"food"');
  product.setType("other");
  t.equal(product.getType(), 'other', 'Product setter should be set type:"other"');
  t.throws(product.setType.bind(product), "Cannot set type as undefined" , 'Product should have type');

  t.end();
});