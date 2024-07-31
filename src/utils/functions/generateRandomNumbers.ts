export function generateRandomNumbers(arrayLength: number, amount: number): number[] {
    if (amount > arrayLength) {
        console.log(arrayLength)
      throw new Error("Amount of numbers to be returned cannot exceed the array length.");
    }
  
    const result: number[] = [];
    const numbers = new Set<number>();
  
    while (numbers.size < amount) {
      const randomNum = Math.floor(Math.random() * arrayLength);
      if (!numbers.has(randomNum)) {
        numbers.add(randomNum);
        result.push(randomNum);
      }
    }
  
    return result;
  }