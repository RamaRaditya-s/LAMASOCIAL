function fibonacciSumInArray(nums: number[]): number {
  let fib = [0,1];
  let a = 0;
  let b = 1;
  let c = 0;
  while(c<=100){
    c = a + b;
    a = b;
    b = c;
    fib.push(c);
  }

  let jumlah = 0;
  for(let i=0;i<nums.length;i++){
    for(let j=0;j<fib.length;j++){
      if(nums[i]==fib[j]){
        jumlah = jumlah + nums[i];
        j = fib.length;
      }
    }
  }
  return jumlah;
}

console.log(fibonacciSumInArray([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(fibonacciSumInArray([10, 20, 21, 30, 34]));
console.log(fibonacciSumInArray([4, 6, 9, 10, 12]));
