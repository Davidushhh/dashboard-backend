function resultFormater(result, isCustomLabels) {
  if (isCustomLabels) {
    return {
      labels: Object.keys(result[0]),
      data: Object.values(result[0]).map((num) => Number(num)),
    };
  }

  const res = result.reduce(
    (acc, item) => {
      const objValues = Object.values(item);

      acc.labels.push(objValues[0]);
      acc.data.push(numbersToFixed(objValues[1]));

      return acc;
    },
    {
      labels: [],
      data: [],
    }
  );

  return res;
}

const numbersToFixed = (number) => {
  if (typeof number === "number") {
    return Number(number.toFixed(2));
  }

  if (typeof number === "object") {
    number.map((num) => {
      if (typeof num === "number") {
        return Number(num.toFixed());
      } else {
        return Number(num);
      }
    });
  }
};

module.exports = { resultFormater };
