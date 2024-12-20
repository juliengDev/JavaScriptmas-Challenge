// Santa needs your help to figure out if he has enough money to give everyone change!
// Your goal will be to return true if everyone gets their correct change, and false if at least one person does not receive their correct change! Use the function below to get started!

// Good luck and happy coding!!
function correctChangeFromSanta(bills) {
    let fiveDollars = 0;
    let tenDollars = 0;
    
    for (let bill of bills) {
        if (bill === 5) {
            fiveDollars++;
        }
        else if (bill === 10) {
            if (fiveDollars === 0) {
                return false; 
            }
            fiveDollars--;
            tenDollars++;
        }
        else if (bill === 20) {
          
            if (tenDollars >= 1 && fiveDollars >= 1) {
                tenDollars--;
                fiveDollars--;
            }
           
            else if (fiveDollars >= 3) {
                fiveDollars -= 3;
            }
            else {
                return false; 
            }
        }
    }
    
    return true; 
}

// You can leave this code as is, this will simply console.log() different text depending on if the test case returns true or false. Feel free to add additional test cases if you would like!

// Should return true
if (correctChangeFromSanta([5,5,5,10,20])) {
    console.log("Nice job Santa, everyone got their correct change!")
}else {
    console.log("Looks like you have some work to do Santa, and bring some money next time!")
}

// Should return false
if (correctChangeFromSanta([5,5,10,10,20])) {
    console.log("Nice job Santa, everyone got their correct change!")
}else {
    console.log("Looks like you have some work to do Santa, and bring some money next time!")
}