export const MAXLENGTH: number = 2;
export const MINVALUE: number = 1;

export const getFibArray = (stringValue: string) => {
  const n = parseInt(stringValue, 10);
  const fibArr = [1, 1];
  for (let i = 2; i < n + 1; i++) {
    fibArr.push(fibArr[i - 2] + fibArr[i -1]);
  }
  return fibArr;
};

