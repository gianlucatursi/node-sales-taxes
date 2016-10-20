const test = require('tape');
const Product = require('../src/Product');
const Cart = require('../src/Cart');

test('Create empty Cart', function(t){

  var cart = new Cart();

  //string for toFixed(2)
  t.equal(cart.getTotal(), '0.00', "Empty cart should have 0 as total");
  t.equal(cart.getSalesTax(), '0.00', "Empty cart should have 0 as sales tax");
  t.deepEqual(cart.products.length, 0, "Empty cart should have 0 product");
  t.equal(cart.bill(), 'Sales Taxes: 0.00\nTotal: 0.00', "Empty cart should have bill: 'Sales Taxes: 0.00\nTotal: 0.00'");

  t.end();

});

test('Scan product to Cart', function(t){

  var cart = new Cart();
  cart.scanProduct('1 book at 12.49');

  t.equal(cart.getTotal(), '12.49', "Cart should have 12.49 as total");
  t.equal(cart.getSalesTax(), '0.00', "Cart should have 0 as sales tax");
  t.equal(cart.products.length, 1, "Cart should have 1 product");
  t.equal(cart.bill(),
    '1 book: 12.49\nSales Taxes: 0.00\nTotal: 12.49',
    "Cart should have bill: '1 book: 12.49\nSales Taxes: 0.00\nTotal: 12.49'");

  cart = new Cart();
  t.throws(cart.scanProduct.bind(cart, '2 malformed 10'), "Cart should throw Parsing Error for: '2 malformed 10'");
  t.equal(cart.getTotal(), '0.00', "Cart should have 0 as total");
  t.equal(cart.getSalesTax(), '0.00', "Cart should have 0 as sales tax");
  t.equal(cart.products.length, 0, "Cart should have 0 product");

  cart.scanProduct('2 coffe at 10');
  t.equal(cart.getTotal(), '22.00', "Cart should have 22.00 as total");
  t.equal(cart.getSalesTax(), '2.00', "Cart should have 2.00 as sales tax");
  t.equal(cart.products.length, 1, "Cart should have 1 product");

  cart.scanProduct('1 imported coffe at 10');
  t.equal(cart.getTotal(), '33.50', "Cart should have 0 as total");
  t.equal(cart.getSalesTax(), '3.50', "Cart should have 0 as sales tax");
  t.equal(cart.products.length, 2, "Cart should have 0 product");

  t.equal(cart.bill(),
    '2 coffe: 11.00\n1 imported coffe: 11.50\nSales Taxes: 3.50\nTotal: 33.50',
    "Cart should have bill: '2 coffe: 11.00\n1 imported coffe: 11.50\nSales Taxes: 3.50\nTotal: 33.50'");

  t.end();

});


test('Add product to Cart', function(t){

  var cart = new Cart();
  cart.addProduct({
    price: 10.50,
    name:'Bruno',
    type: 'food'
  }, 2);

  t.equal(cart.getTotal(), '21.00', "Cart should have 21.00 as total");
  t.equal(cart.getSalesTax(), '0.00', "Cart should have 0 as sales tax");
  t.equal(cart.products.length, 1, "Cart should have 1 product");

  t.throws(cart.addProduct.bind(cart, undefined, 2), "Add product to cart should have properties name, type and price");
  t.throws(cart.addProduct.bind(cart, { price: "hi" }, 1), "Add Product should have price as number");

  t.equal(cart.bill(),
    '2 Bruno: 10.50\nSales Taxes: 0.00\nTotal: 21.00',
    "Cart should have bill: '2 Bruno: 10.50\nSales Taxes: 0.00\nTotal: 21.00'");
  t.end();


});