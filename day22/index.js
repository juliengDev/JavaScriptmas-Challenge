import { addresses } from './addresses.js'
/*
Writing out labels by hand is a real pain. Luckily, you are so organised that you have all of your contacts saved in an array.

But not all of your contacts are on your Christmas list. So your task is this:

** Task ** 
1. Render a label for each entry in the address book, but only if isOnChistmasList is set to true! The label should contain the recipient's name and address.
2. Decorate the label with two festive icons from the icons folder. Use whatever colour scheme and layout you think looks good! 

** Stretch goals **
1. Ensure that the label does not get two of the same icon.
2. Create your own CSS Christmas logo to add a personal touch to each label.
*/


const labelsContainer = document.querySelector('.labels-container')

addresses.forEach(address => {
  if (address.isOnChristmasList) {
    const label = document.createElement('div')
    label.classList.add('label')
    label.innerHTML = `
      <div class="label__name">${address.name}</div>
      <div class="label__address">${address["address line 1"]}</div>
      <img class="label__icon icon1" src="./icons/candy-cane.png"  width="25" alt="candy cane icon" />
      <img class="label__icon icon2" src="./icons/gifts.png" width="25" alt="gift icon" />
    `
    labelsContainer.appendChild(label)
  }
})