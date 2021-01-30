const {fromWei} = require('web3-utils');
const {BN} = require('@openzeppelin/test-helpers');

/**
 * Validates that `actual` equals `expected` with a precision of at least `decimalPrecision` ETH decimals.
 * @param {BN} actual the actual value, in WEI.
 * @param {BN} expected the expected value, in WEI.
 * @param {Number} decimals the number ETH decimals. The default value is 4 which is a precision of 10^4 = 0.0001 ETH
 */
function shouldBeEqualWithETHDecimalPrecision(actual, expected, decimals = 4) {
  const exponent = new BN(18 /* ETH-precision divisor */ - decimals);
  const tolerance = new BN(10).pow(exponent);
  const delta = actual.sub(expected).abs();
  delta.should.be.bignumber.lte(tolerance, `${fromWei(actual)} differs from expected ${fromWei(expected)} (tolerance ${fromWei(tolerance)} ETH)`);
}

/**
 * Validates that `actual` equals `expected` with a difference not exceeding 1/`N`-th of the expected value.
 * @param {BN} actual the actual value, in WEI.
 * @param {BN} expected the expected value, in WEI.
 * @param {Number} divisor `N` in the above formula. The default value is 1,000,000.
 */
function shouldBeEqualWithProportionalPrecision(actual, expected, divisor = 1000000) {
  const divsPrecision = new BN(10).pow(new BN(15)); // used to preserve floating point division precision
  const tolerance = expected.mul(divsPrecision).div(new BN(divisor)).div(divsPrecision);
  const delta = actual.sub(expected).abs();
  delta.should.be.bignumber.lte(tolerance, `${fromWei(actual)} differs from expected ${fromWei(expected)} (proportional tolerance 1/${divisor}th)`);
}

/**
 * Validates that `acutal` equals `expected` with a difference not exceeding `P`% of the expected value.
 * Where 0 < `P` <= 100, and `P` = `N` * 10 ^ `M`
 * @param {BN} actual the actual value, in WEI.
 * @param {BN} expected the expected value, in WEI.
 * @param {Number} significand `N` in the above formula. This must be an unsigned integer > 0.
 * @param {Number} orderOfMagnitude `M` in the above formula. This must be an integer <= 2. The default value is 0.
 */
function shouldBeEqualWithPercentPrecision(actual, expected, significand, orderOfMagnitude = 0) {
  // e.g. 0.5% max deviation of expected
  //  abs(expected - actual) <= expected * 5 * (10 ^ -1) / 100
  //  abs(expected - actual) <= expected * significand * (10 ^ orderOfMagnitude) / 100
  //  abs(expected - actual) <= expected * significand * (10 ^ orderOfMagnitude) / 10 ^ 2
  //  abs(expected - actual) <= expected * significand / 10 ^ (2 - orderOfMagnitude)
  //  abs(expected - actual) * (10 ^ (2 - orderOfMagnitude)) <= significand * expected
  const delta = expected.sub(actual).abs();
  const exponent = new BN(2 - orderOfMagnitude);
  const coefficient = new BN(10);
  const lhs = delta.mul(coefficient.pow(exponent));
  const rhs = expected.muln(significand);
  lhs.should.be.bignumber.lte(
    rhs,
    `${fromWei(actual)} differs from expected ${fromWei(expected)} (percent tolerance ${significand} x 10 ^ ${orderOfMagnitude})`
  );
}

module.exports = {
  shouldBeEqualWithETHDecimalPrecision,
  shouldBeEqualWithProportionalPrecision,
  shouldBeEqualWithPercentPrecision,
};
