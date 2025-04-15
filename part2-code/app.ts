function letterCombinations(digits: string): string[] {
  if (!digits) return [];

  const phoneMap: Record<string, string[]> = {
    '1': [''],
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  };

  return digits.split('').reduce<string[]>((acc, digit) => {
    const letters = phoneMap[digit];
    if (!acc.length) return letters;
    return acc.flatMap((combination: string) => 
      letters.map(letter => combination + letter)
    );
  }, []);
}

console.log(letterCombinations("23"));
console.log(letterCombinations(""));
console.log(letterCombinations("2"));
