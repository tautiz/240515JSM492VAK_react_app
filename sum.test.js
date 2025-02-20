const sum = require('./sum');

test('prideda 1 + 2 ir gauname 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('prideda 1 + "2" ir gauname klaidos pranesima', () => {
  expect(() => sum(1, '2')).toThrow('Argumentai turi būti skaičiai');
});