import { codedMessage } from './codedMessage.js'

/*
codedMessage.js holds a coded message (well, the name makes it obvious, huh?).

**Task**
- Decode the message!

key.md will help!

**Stretch Goal**
No stretch goal for the final day. Just stretch your legs!
*/ 


const decoded = codedMessage.map((bin) => {
  let charCode = parseInt(bin, 2) - 10
  if (charCode < 32) {
      charCode += 96
  }
  return String.fromCharCode(charCode)
}).join('')

console.log(decoded)