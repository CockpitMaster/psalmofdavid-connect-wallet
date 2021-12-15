import BigNumber from "bignumber.js";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const hasValue = (x) => {
  return !(!x || !parseFloat(x.toString()));
};

export const convertToUnits = (value, decimals = 18) => {
  return BigNumber(value.toString())
    .multipliedBy(Math.pow(10, decimals))
    .decimalPlaces(0);
};

export const convertFromUnits = (value, decimals = 18) => {
  return BigNumber(value.toString()).dividedBy(Math.pow(10, decimals));
};

export const sumOf = (...amounts) => {
  let sum = new BigNumber("0");

  amounts.forEach((amount) => {
    if (amount.toString() === "NaN" || !hasValue(amount)) return;

    try {
      sum = sum.plus(amount.toString());
    } catch (error) {
      console.log("could not add", amount);
    }
  });

  return sum;
};
