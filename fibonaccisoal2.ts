function CountFibonacciPairs(nums: number[]): number {
  let fib: number[] = [0, 1];
  let a = 0;
  let b = 1;
  let c = 0;

  while (c <= 100) {
    c = a + b;
    a = b;
    b = c;
    fib.push(c);
  }

  let jumlah = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let first = fib.includes(nums[i]);
      let second = fib.includes(nums[j]);
      if (first && second) {
        jumlah++;
      }
    }
  }

  return jumlah;
}

const input = prompt("Masukkan array (contoh: [1, 2, 3, 4, 5])");

if (input) {
  const nums = JSON.parse(input);
  const hasil = CountFibonacciPairs(nums);
  console.log("Jumlah Pairs Fibonacci:", hasil);
} else {
  console.log("Error.");
}
