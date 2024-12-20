/*
Santa wants to monetize Christmas so he has set up a merch store. To save money, he got a junior dev from the cheapest dev shop in the 
backstreets of Lapland to write the code.

The site is taking shape, but now Santa is concerned that it might not be secure, so it's time for you to put on your ethical hacker hat 
and see if you can do the following:

⚠️ IMPORTANT 1: When tackling tasks 1, 2 and stretch goals, you are not allowed to edit index.html, index.js, data.js, or index.css in any way! 
For task 3 you may edit these files.

⚠️ IMPORTANT 2: Any code you use to complete tasks 1 or 2 must be pasted into mySolution.js 👈. If you fail to do this your entry will not count!

Task 1 
Render a button that, when pressed, logs 'You have been hacked 🏴‍☠️' to the console just to prove there are vulnerabilities.

Task 2
Change the product title h2 to "Do not buy this".

Task 3
Fix the code so it's unhackable! 

🔥Stretch Goals 👇 - these are only for really dedicated (ethical 😇) hackers to do BEFORE task 3 above.

Task 4
Hijack the Buy button so when it is clicked it calls a new function. The new function should log 'diverting payment to my account 💰'

Task 5
Log out the credit card details.

*/

//Task 3 

// Restrict the document.createElement('script') Method
(function () {
    const preventScriptInjection = () => {
        const originalSetAttribute = Element.prototype.setAttribute;
        
        Element.prototype.setAttribute = function(name, value) {
            if (name.toLowerCase().startsWith('on') || 
                /<script|javascript:/i.test(value)) {
                console.warn('Potential script injection blocked');
                return;
            }
            return originalSetAttribute.call(this, name, value);
        };

        const originalCreateElement = document.createElement;
        document.createElement = function (tagName) {
            if (!tagName) {
                console.error('No tagName provided for createElement.');
                return null;
            }
            if (tagName.toLowerCase() === 'script') {
                console.warn('Script injection attempt blocked.');
                return null;
            }
            return originalCreateElement.call(document, tagName);
        };
    };

    preventScriptInjection();
})();

if (window.trustedTypes) {
    const policy = trustedTypes.createPolicy('Poppins', {
        createHTML: (input) => {
            const tempDiv = document.createElement('div');
            tempDiv.textContent = input;
            return tempDiv.innerHTML;
        },
        createScriptURL: (input) => {
            try {
                const url = new URL(input);
                return url.origin === window.location.origin ? input : '';
            } catch {
                return '';
            }
        }
    });
}

function sanitizeHTML(str) {
    if (typeof str !== 'string') return '';
    
    if (window.DOMPurify) {
        return DOMPurify.sanitize(str, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
        });
    }
    
    const tempDiv = document.createElement('div');
    tempDiv.textContent = str; 
    return tempDiv.innerHTML;
}

function validateInput(input, maxLength = 500) {
    if (!input || typeof input !== 'string') return '';
    
    const trimmedInput = input.trim().substring(0, maxLength);
    
    return trimmedInput.replace(/<script|>|</gi, '');
}

const stars = document.querySelectorAll('.stars li');
const hiddenRatingInput = document.getElementById('hidden-rating');
let currentRating = 0;

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        const safeIndex = Math.max(0, Math.min(index, stars.length - 1));
        setRating(safeIndex + 1);
    });

    star.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Enter':
            case ' ':
                const safeIndex = Math.max(0, Math.min(index, stars.length - 1));
                setRating(safeIndex + 1);
                break;
            case 'ArrowRight':
                const next = stars[Math.min(index + 1, stars.length - 1)];
                if (next) next.focus();
                break;
            case 'ArrowLeft':
                const prev = stars[Math.max(index - 1, 0)];
                if (prev) prev.focus();
                break;
        }
    });
});

function setRating(rating) {
    if (!Number.isInteger(rating) || rating < 1 || rating > stars.length) {
        console.error('Invalid rating value');
        return;
    }

    currentRating = rating;
    hiddenRatingInput.value = rating;

    stars.forEach((star, index) => {
        star.setAttribute('aria-checked', index < rating ? 'true' : 'false');
        star.setAttribute('tabindex', index + 1 === rating ? '0' : '-1');
    });

    console.log(`Rated ${rating} star(s)`);
}

document.addEventListener('submit', (e) => {
    e.preventDefault();

    const ratingValue = validateInput(hiddenRatingInput.value);
    let stars = [];
    if (ratingValue && !isNaN(ratingValue)) {
        const count = Math.min(parseInt(ratingValue), 5);
        for (let i = 0; i < count; i++) {
            stars.push('<span class="review-star">★</span>');
        }
    }

    const textArea = document.getElementById('text-area');
    const text = sanitizeHTML(validateInput(textArea.value));
    const textDisp = document.getElementById('text-output');
    
    textDisp.innerHTML = DOMPurify.sanitize(
        `<p>${stars.join(' ')} ${text}</p>`, 
        { ALLOWED_TAGS: ['p', 'span'], ALLOWED_ATTR: ['class'] }
    );
    
    textArea.value = '';
});

document.getElementById('prod-buy').addEventListener('click', function(){
    console.log('Product added to basket.');
});

Object.freeze(hiddenRatingInput);
Object.seal(document.getElementById('text-area'));
Object.seal(document.getElementById('text-output'));