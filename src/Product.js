'use strict';
const ProductHandler = require('./ProductHandler');

/**
 *
 * @param {Object} properties
 * @param {string} properties.name
 * @param {number} properties.price
 * @param {string} properties.type
 * @constructor
 */

function Product(properties){

  if(!properties){
    throw new Error('Product cannot be empty');
  }

  if(properties.price && isNaN(Number(properties.price))){
    throw new Error('Product price should be a number');
  }

  this.name     = properties.name || '';
  this.price    = Number(properties.price) || 0;
  this.type     = properties.type || 'other';

}

/**
 * Get name of product
 */
Product.prototype.getName = function(){
  return this.name;
};

/**
 * Set name of product
 */
Product.prototype.setName = function(name){
  this.name = name || '';
};

/**
 * Get price without tax
 */
Product.prototype.getPrice = function(){
  return this.price;
};

/**
 * Set price without tax
 */
Product.prototype.setPrice = function(price){

  if(isNaN(Number(price))){
    throw new Error('Product price should be a number');
  }

  this.price = Number(price) || 0;
};

/**
 * Get price without tax
 */
Product.prototype.getType = function(){
  return this.type;
};

/**
 * Set price without tax
 */
Product.prototype.setType = function(type){
  if(!type)
    throw new Error("Cannot set type as undefined");

  this.type = type;
};

/**
 *
 * @returns {boolean|*}
 */
Product.prototype.isImported = function(){
  return this.name.indexOf('imported') >= 0;
};

/**
 * toString
 */
Product.prototype.toString = function(){
  return this.name + ': ' + ProductHandler.getTaxedPriceOf(this);
};

module.exports = Product;