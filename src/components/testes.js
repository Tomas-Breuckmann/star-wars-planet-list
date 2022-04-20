const array = ['23', '1', '45', 'unk', 'unk', '345', '5'];

const sortDsc = (arr) => {
  const numbers = arr.filter((num) => num !== 'unknown');
  const notNumbers = arr.filter((num) => num === 'unknown');
  const newa = numbers.sort((a, b) => Number(b) - Number(a));
  return [...newa, ...notNumbers];
};

console.log(sortDsc(array));
