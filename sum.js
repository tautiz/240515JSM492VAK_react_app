function sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Argumentai turi būti skaičiai');
    }
    return a + b;
  }
  
  module.exports = sum;