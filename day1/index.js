/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:
- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.

**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
   - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
   - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words.

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input'); // Input field for new items
const addItemButton = document.getElementById('add-item-button'); // Button to add item to list
const shoppingList = document.getElementById('shopping-list'); // Container for displaying list
const listArr = []; // Array to hold the original items
const comparisonSet = new Set(); // Set to hold normalized (duplicated) items for comparison

/**
 * Normalize spaces in the input text:
 * - Trim leading and trailing spaces.
 * - Replace multiple spaces between words with a single space.
 * 
 * @param {string} text - The input string to normalize.
 * @returns {string} - The normalized string.
 */
const normalizeSpaceText = (text) => {
  return text.trim().replace(/\s+/g, " ");
}

/**
 * Remove accents and punctuation from the input text:
 * - Normalize accents (e.g., É -> E).
 * - Remove any non-alphanumeric characters (e.g., punctuation).
 * - Convert the text to lowercase to standardize for comparison.
 * 
 * @param {string} text - The input string to normalize.
 * @returns {string} - The cleaned and normalized string.
 */
const normalizeAccentAndPunctuation = (text) => {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // Remove diacritical marks (accents)
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove non-alphanumeric characters
    .toLowerCase(); // Convert to lowercase
}

/**
 * Combine space normalization and accent/punctuation removal for complete normalization.
 * 
 * @param {string} text - The input string to normalize.
 * @returns {string} - The fully normalized string.
 */
const normalizeInputTxt = (text) => {
  const textWithRemovedSpace = normalizeSpaceText(text);
  return normalizeAccentAndPunctuation(textWithRemovedSpace);
}

/**
 * Check if the input item is a duplicate, based on its normalized form.
 * - If the item has already been added (after normalization), do not add it again.
 * - Otherwise, add it to the list and the comparison set.
 */
function checkDuplicate() {
  const itemText = normalizeSpaceText(itemInput.value); // Normalize spaces in the input text

  if (!itemText) {
    console.log("The field is empty, no additions.");
    return; // Do nothing if the input field is empty
  }

  const normInput = normalizeInputTxt(itemText); // Normalize input text for comparison

  if (comparisonSet.has(normInput)) {
    console.log(`"${itemText}" is a duplicate and will not be added.`);
    return false; // Return false to indicate that it's a duplicate and won't be added
  }

  // Add the new item to both the original list and the comparison set
  listArr.push(itemText); // Add the original item to the list
  comparisonSet.add(normInput); // Add the normalized item to the set for future comparisons
  console.log(`"${itemText}" added successfully.`);
  renderList(); // Update the displayed list
}

/**
 * Render the shopping list to the DOM.
 * - Each item is displayed in an `<li>` element.
 * - The input field is cleared after rendering.
 */
function renderList() {
  shoppingList.innerHTML = ''; // Clear the shopping list

  // Loop through each item and create an `<li>` element
  listArr.forEach((gift) => {
    const listItem = document.createElement('li');
    listItem.textContent = gift; // Set the text content to the item text
    shoppingList.appendChild(listItem); // Append the list item to the shopping list
  });

  itemInput.value = ''; // Clear the input field after adding the item
}

// Add event listener to add the item when the button is clicked
addItemButton.addEventListener('click', checkDuplicate);

// Allow adding items by pressing the "Enter" key
itemInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    checkDuplicate(); // Trigger the function to check for duplicates and add the item
  }
});