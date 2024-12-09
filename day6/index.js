const snowGlobe = document.querySelector('.snow-globe')
const MAX_SNOWFLAKES = 50

function createSnowflake() {
/* 
Challenge:
1. Write JavaScript to create a snowflake and make it fall inside the snow globe. The snowflake should have a random starting position, animation duration, and size.
2. See index.css
*/ 
if (snowGlobe.children.length >= MAX_SNOWFLAKES) return;
     
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄️'
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.animationDelay = `${Math.random()}s`;
    snowGlobe.appendChild(snowflake);
    
    
    const animationDuration = parseFloat(snowflake.style.animationDuration) * 1000;
    setTimeout(() => {
      snowflakesContainer.removeChild(snowflake);
    }, animationDuration);
  
 }
}
window.addEventListener('load', createSnowflake);

setInterval(createSnowflake, 100) // Let's create a snowflake every 100 milliseconds!

/* Stretch goals: 
- Give some variety to your snowflakes, so they are not all the same. Perhaps every 25th one could be a snowman ☃️?
- Remove each snowflake after a set time - this will stop the scene from being lost in a blizzard!
- Add a button that makes the snow start falling, it could trigger a CSS-animated shake of the snow globe. Then make the snow become less frequent until it slowly stops - until the button is pressed again.  
- Change the direction of the snowflakes so they don’t all fall vertically.
- Make the style your own! 
*/