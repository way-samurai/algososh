export const MAXLENGTH: number = 2;
export const MINVALUE: number = 1;

export const fib = (n: number): number => {
  if (n <= 2) {
    return 1;
  }
  return fib(n - 2) + fib(n - 1);
};

export const getFibArray = (stringValue: string) => {
  const n = parseInt(stringValue, 10);
  const fibArr = [];
  for (let i = 1; i <= n; i++) {
    fibArr.push(fib(i));
  }
  return fibArr;
};
