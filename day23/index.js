/*
Santa has been hacked! In the list of kids to deliver to, the Grinch has replaced some kids' names with his own name.

The original array looked like this: 
['James', 'Yi', 'Florinda', 'Fatima', 'Tariq', 'Jose', 'Clare', 'Gibbs']

**Task** 
Remove 'Grinch' from santasArr and put the missing kids back in their original places!

**Stretch goal**
- Do this without creating a new array and using no array methods other than .forEach().
*/

const santasArr = ['James', 'Yi', 'Grinch', 'Fatima', 'Tariq', 'Grinch', 'Clare', 'Grinch']

const missingNamesArr = ['Florinda', 'Jose', 'Gibbs']
 
const removeGrinch = (santasArr, missingNamesArr) => {  
  let counter = 0
  santasArr.forEach((name, index) => {
    if (name === 'Grinch') {
      santasArr[index] = missingNamesArr[counter]
      counter++
    }
  })
  return santasArr
}

console.log(removeGrinch(santasArr, missingNamesArr))

// Expected Output: ['James', 'Yi', 'Florinda', 'Fatima', 'Tariq', 'Jose', 'Clare', 'Gibbs']