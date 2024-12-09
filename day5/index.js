/* 
This Christmas, you’ve been tasked with running an anagram quiz at 
the family gathering.

You have been given a list of anagrams, but you suspect that some 
of the anagram pairs might be incorrect.

Your job is to write a JavaScript function to loop through the array
and filter out any pairs that aren’t actually anagrams.

For this challenge, spaces will be ignored, so "Be The Helm" would 
be considered a valid anagram of "Bethlehem".
*/

let anagrams = [
  ["Can Assault", "Santa Claus"],
  ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"],
  ["Frosty The Snowman", "Honesty Warms Front"],
  ["Drastic Charms", "Christmas Cards"],
  ["Congress Liar", "Carol Singers"],
  ["The Tin Glints", "Silent Night"],
  ["Be The Helm", "Betlehem"],
  ["Is Car Thieves", "Christmas Eve"]
];

function findAnagrams(array) {
  if (!Array.isArray(array)) {
    throw new Error("Input must be an array of anagram pairs.");
  }

  const verifiedAnagrams = array.filter(item => {
    if (!Array.isArray(item) || item.length !== 2) {
      throw new Error("Each item must be an array containing exactly two strings.");
    }

    const normalizeString = str =>
      str.replace(/\s/g, '').toLowerCase().split('').sort().join('');

    const normalizedEntry1 = normalizeString(item[0]);
    const normalizedEntry2 = normalizeString(item[1]);

    return normalizedEntry1 === normalizedEntry2;
  });

  return verifiedAnagrams;
}

console.log(findAnagrams(anagrams));