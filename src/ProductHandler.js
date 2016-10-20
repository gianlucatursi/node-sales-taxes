const BASIC_TAX = 0.1;
const IMPORTED_TAX = 0.05; // 5 % for imported product
const PRODUCT_REGEX = /^([0-9]+) ((?:[A-z]+ )*(?:[A-z]+ at){1}) ((?:[0-9]{1,})(?:.[0-9]{1,2})*)$/g;

const TYPES =
  {
    'food' : {
      tax: 0,
      regex: /(chocolate)/g
    },
    'book' : {
      tax: 0,
      regex: /(book)/g
    },
    'medical' : {
      tax: 0,
      regex: /(pills)/g
    },
    'other': {
      tax: BASIC_TAX,
      regex: /[A-z]*/g
    }
  };

/**
 * Parse the input string
 * @param product_string
 * @returns {{price: number, quantity: number, name: string, imported: boolean, type: string}}
 */
function analize(product_string){

  var regex = new RegExp(PRODUCT_REGEX);
  var elements = regex.exec(product_string);

  if(!elements || elements.length < 3){
    throw new Error('Parsing error: ');
  }

  var name = elements[2].replace(' at', '');
  var type = getType(name);

  return {
    price: parseFloat(elements[3]),
    quantity: parseInt(elements[1]),
    name: name,
    type: type
  }

}

/**
 *
 * @param product_name
 * @returns {undefined|string}
 */
function getType(product_name){

  var type = undefined;
  var keys = Object.keys(TYPES);
  var i = 0;

  while(type == undefined && i < keys.length){

    if(product_name.match(TYPES[keys[i]].regex)){
      type = keys[i];
    }

    i++;
  }

  return type || 'other';

}

/**
 * Calculate taxed price for product
 * @param product
 * @returns {string}
 */
function getTaxedPriceOf(product){

  var price = product.getPrice();
  var taxedPrice = price;
  var type = product.getType();

  if(product.isImported()){
    // price + rounded value of tax
    taxedPrice = price + (Math.ceil( (price * IMPORTED_TAX) *20)/20);
  }
  // taxedPrice + rounded value of tax
  taxedPrice += (Math.ceil( (price * TYPES[type].tax) *20)/20);

  return taxedPrice.toFixed(2);
}

module.exports.analize = analize;
module.exports.getTaxedPriceOf = getTaxedPriceOf;