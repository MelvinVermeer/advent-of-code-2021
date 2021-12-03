const getOnes = (data: string[]) => {
  const ones = data.reduce((result, row) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "1") {
        result[i] = (result[i] || 0) + 1;
      }
    }

    return result;
  }, [] as number[]);

  return ones;
};

export const createDiagnosticReport = (data: string[]): any => {
  const ones = getOnes(data);
  const gamma = ones.map((x) => (x >= data.length / 2 ? "1" : "0")).join("");
  const epsilon = ones.map((x) => (x < data.length / 2 ? "1" : "0")).join("");

  let oxygen = data;
  let oxygenIndex = 0;
  while (oxygen.length !== 1) {
    const h = getOnes(oxygen)[oxygenIndex] >= oxygen.length / 2 ? "1" : "0";
    oxygen = oxygen.filter((row) => row[oxygenIndex] === h);
    oxygenIndex += 1;
  }

  let co2 = data;
  let co2Index = 0;
  while (co2.length !== 1) {
    const h = getOnes(co2)[co2Index] >= co2.length / 2 ? "0" : "1";
    co2 = co2.filter((row) => row[co2Index] === h);
    co2Index += 1;
  }

  return {
    oxygen: parseInt(oxygen[0], 2),
    co2: parseInt(co2[0], 2),
    gamma: parseInt(gamma, 2),
    epsilon: parseInt(epsilon, 2),
  };
};
