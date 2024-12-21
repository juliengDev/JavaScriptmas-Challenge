const elfFirstNames = [
  "Aurora", "Blitzen", "Crispin", "Dazzle", "Evergreen", "Frost", "Glimmer",
  "Holly", "Icicle", "Joyful", "Kringle", "Luna", "Merry", "Nutmeg",
  "Olwen", "Pine", "Quill", "Razzle", "Sparkle", "Tinsel", "Umbra",
  "Vixen", "Whisk", "Xylo", "Yule", "Zippy"
];

const elfLastNames = [
  "Applecheeks", "Bells", "Candycane", "Dazzlebright", "Everbright", "Frostwhisk",
  "Gingersnap", "Hollyberry", "Icestorm", "Jovial", "Kindleflame", "Lightwhisper",
  "Merrysprout", "Nutcracker", "Oakenleaf", "Peppermint", "Quicksilver", "Raindrop",
  "Snowdust", "Twinkletoes", "Underwood", "Velvet", "Winterberry", "Xylospark",
  "Yuletide", "Zestwind"
];


/*
 * 🎅 Task:
 * - Generate an elf first and last name that matches the user’s first and last name initials, then display it on the screen.
 * - Example: if the user’s name is "John Doe," the elf name could be "Joyful Dazzle."
 * - Display the generated elf names in the "Registered Employees" list.
 */

/*
 * 🌟 Stretch Goals:
 * - Generate the elf names using an LLM API (like HuggingFace). 
 * - Don't save the same name twice. (not necessary for the normal task)
 * - Make sure to use Scrimba's environment variables feature so you don't expose your API key 
 */ 


const firstnameInputEl = document.querySelector('input[name="first-name"]');
const lastnameInputEl = document.querySelector('input[name="last-name"]');
const formEl = document.getElementById('form');
const employeesListEl = document.getElementById('elf-names-list');


formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  employeesListEl.innerHTML= ''
  const userFirstnameInitial = firstnameInputEl.value[0].toUpperCase();
  const userLastnameInitial = lastnameInputEl.value[0].toUpperCase();

  const matchFirstname = elfFirstNames.find((name) =>
    name[0].toUpperCase() === userFirstnameInitial
  );

  const matchLastname = elfLastNames.find((name) =>
    name[0].toUpperCase() === userLastnameInitial
  );

  if (matchFirstname && matchLastname) {
    const finalName = matchFirstname + ' ' + matchLastname;
    const newEmployee = document.createElement('li');
    newEmployee.textContent = finalName;
    employeesListEl.insertAdjacentElement('beforeEnd', newEmployee);
  } else {    
    const finalName = 'Joyful Dazzle';
    const newEmployee = document.createElement('li');
    newEmployee.textContent = finalName;
    employeesListEl.insertAdjacentElement('beforeEnd', newEmployee);
  }
});
