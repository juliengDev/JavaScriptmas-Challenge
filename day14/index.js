/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

import { feedData } from './data.js'

// Global state to track current display state
let currentState = {
  userIndex: 0,
  imageIndex: 0,
  timer: null
};

// Render the avatars
function renderAvatars(data) {
  const avatarsSectionEl = document.querySelector('.feed-avatars');
  
  data.forEach(({avatarUrl, handle}) => {
    const friendEl = document.createElement('img');
    friendEl.src = `images/${avatarUrl}`;
    friendEl.alt = `${handle} Profile Picture`;
    friendEl.classList.add('avatar');
    friendEl.id = `${handle.toLowerCase()}-avatar`;
    avatarsSectionEl.insertAdjacentElement('afterbegin', friendEl);
  });
}

// Render a single image
function renderImage(imageData, container) {
  // Clear previous content
  container.innerHTML = '';
  
  if (imageData) {
    const pictureEl = document.createElement('img');
    pictureEl.src = `images/${imageData.imageUrl}`;
    pictureEl.alt = imageData.alt;
    pictureEl.classList.add('feature-image');
    container.appendChild(pictureEl);
  } else {
    container.textContent = 'Refresh to load latest images';
  }
}

// Handle avatar highlighting
function updateAvatarHighlight(avatars, highlightIndex) {
  avatars.forEach((avatar, index) => {
    if (index === highlightIndex) {
      avatar.classList.add('highlight');
    } else {
      avatar.classList.remove('highlight');
    }
  });
}

// Timer control function
function handleTimer(data) {
  const imagesSectionEl = document.querySelector('.feed-images');
  const avatars = document.querySelectorAll('.avatar');
  
  // Clear any existing timer
  if (currentState.timer) {
    clearInterval(currentState.timer);
  }
  
  // Function to advance to next image/user
  function advance() {
    const currentUser = data[currentState.userIndex];
    
    if (!currentUser) {
      // End of all users
      renderImage(null, imagesSectionEl);
      updateAvatarHighlight(avatars, -1);
      clearInterval(currentState.timer);
      return;
    }
    
    if (currentState.imageIndex >= currentUser.features.length) {
      // End of current user's images
      currentState.userIndex++;
      currentState.imageIndex = 0;
      advance();
      return;
    }
    
    // Display current image
    const currentImage = currentUser.features[currentState.imageIndex];
    renderImage(currentImage, imagesSectionEl);
    updateAvatarHighlight(avatars, currentState.userIndex);
    
    // Advance to next image
    currentState.imageIndex++;
  }
  
  // Initial display
  advance();
  
  // Set up timer for subsequent displays
  currentState.timer = setInterval(advance, 1500);
}

// Main display function
function renderAvatarHighlight(data) {
  // Reset state
  currentState = {
    userIndex: 0,
    imageIndex: 0,
    timer: null
  };
  
  // Start the display cycle
  handleTimer(data);
}

// Initialize the application
renderAvatars(feedData);
renderAvatarHighlight(feedData);