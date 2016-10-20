'use strict';
const ProductHandler = require('./ProductHandler');
const Product = require('./Product');

function Cart(){

  this.products = [];

  this.total_no_tax = 0;
  this.sales_tax = 0;


}

/**
 * Add product to the cart as string
 * @param product
 */

Cart.prototype.scanProduct = function(product){

  var product_properties = ProductHandler.analize(product);
  var quantity = product_properties.quantity;
  var new_product = new Product(product_properties);

  this.products.push({
      quantity: quantity,
      product: new_product
    });

  // update total of cart
  this.updateTotal(new_product, quantity);

};


/**
 * Add product to the cart as product
 * @param product
 */

Cart.prototype.addProduct = function(product, quantity){

  var new_product = new Product(product);

  this.products.push({
    quantity: quantity || 1,
    product: new_product
  });

  // update total of cart
  this.updateTotal(new_product, quantity);

};

/**
 * Return total and sales_tax as object
 * @param product
 * @returns {*}
 */
Cart.prototype.updateTotal = function(product, quantity){

  var price      = product.getPrice();
  var priceTaxed = ProductHandler.getTaxedPriceOf(product);

  this.total_no_tax += (quantity * price);
  this.sales_tax += quantity * (priceTaxed - price);

};


/**
 * Build the bill output
 * @returns {string}
 */

Cart.prototype.bill = function(){

  var bill = '';

  // calculate taxes and build bill
  this.products.forEach(
    function(toBuy){
      bill += toBuy.quantity + ' ' + toBuy.product.toString() + '\n';
    }
  );

  bill += 'Sales Taxes: '+ this.getSalesTax() + '\n';
  bill += 'Total: ' + this.getTotal();

  return bill;

};

/**
 * Get amount of tax
 * @returns {string}
 */
Cart.prototype.getSalesTax = function(){
  return this.sales_tax.toFixed(2);
};

/**
 * Get total of Cart
 * @returns {string}
 */
Cart.prototype.getTotal = function(){
  return (this.total_no_tax + this.sales_tax).toFixed(2);
}

module.exports = Cart;