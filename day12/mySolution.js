const hackButton = document.createElement('button');
const h2El = document.querySelector('.prod-title')

hackButton.textContent = 'Click me';

hackButton.addEventListener('click', () => {
    console.log('You have been hacked 🏴‍☠️');
});

document.body.appendChild(hackButton);

h2El.textContent = "Do not buy this"



//the hack 

// const script = document.createElement('script')
// script.src = 'mySolution.js'
// script.type = 'text/javascript'
// document.head.appendChild(script)