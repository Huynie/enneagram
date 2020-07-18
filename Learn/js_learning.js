//syntax doesn't require ";" but it's typically used by coders anyways

// data types - string, numbers, boolean, null, undefined
const what = 'ball'; //string
let amount = 2; // numbers, decimals allowed
const isRed = true; // boolean
const x = null;
const y = undefined;

amount = 3; // you can change 'let' variables, you can't with 'const'
let hi; // you don't have to define 'let' variables, with const you have to 

//concatenation
console.log('There are' + amount + what + isRed);
// Template string, you can do the same thing above like this instead
console.log(`There are ${amount} ${what} ${isRed}`);
// you can assign a variable to the whole thing
const look = (`There are ${amount} ${what} ${isRed}`);
// and then reference it like this
console.log(look);

// properties
console.log(what.length); //length property counts the # of char in the variable
// methods
console.log(what.toUpperCase()); //makes all the char upper case
console.log(what.substring(0,2)); //this pulls the first 2 char, 0 starts before 'b' not after
console.log(what.substring(0,3).toUpperCase()); //you can chain it like this
// arrays - variables that hold multiple values
const numbers = new Array(1,2,3,4,5); //'new' is a constructor and here it's constructing an 'Array'
console.log(numbers);

const metal = ['screws', 'nuts', 'bolts', 0, false, undefined]; // you can put different types of data as well
console.log(metal[2]); //[2] means it's calling the 3rd data type
                        // because arrays are zero-based meaning the count starts at 0 then 1 etc, it doesn't start at 1

// arrays with methods
const tighteners = 'screws, nuts, bolts';
console.log(tighteners.split('')); //splits the variable by w.e is in (''), which is nothing since its empty so it'll split by each char
console.log(tighteners.split(', ')); //in this example, it's split by 'comma and space' so it should list only the words

// object within object
const human ={
    firstName: 'Huy',
    lastName: 'Chau',
    age: 28,
    hobbies: ['bboying', 'art', 'keyboard'],
    physical: {  // you can have objects inside an object
        hairColor: 'black',
        height: 5,
        asian: true,
    }
}
console.log(human.hobbies[1], human.age)
console.log(human.physical.asian);//  call the object within an object like this

//destructuring
const { firstName, lastName, physical: {hairColor}} = human;

console.log(hairColor);  // you can pull variables like this

// adding properties can be like this
human.diet = 'rice';
console.log(human);

const lunch = [
    {
        meal: 1,
        food: 'salad',
        eaten: true
    },
    {
        meal: 2,
        food: 'chicken',
        eaten: false
    },
    {
        meal: 3,
        food: 'steak',
        eaten: true
    }
];

console.log(lunch[1].food); // what did you eat for lunch the 2nd time?

//JSON format is what is used to send data to servers
const lunchJSON = JSON.stringify(lunch); // Writes it in JSON format
console.log(lunchJSON);

//For loops
for(let fries = 0; fries < 10; fries++) { //fries is 0 and as long as its less than 10, add 1
    console.log(`there are ${fries} fries`);
}

//While loop
let fries = 0;
while(fries <= 10) {
    console.log(`while there are ${fries} fries`);
    fries++;
    const leftover = fries-2;
    console.log(`you have ${leftover}`);
}

//loop through arrays
for(let fries = 0; fries < lunch.length; fries++) { //fries is 0 and as long as its less than # of item lunch has, add 1
    console.log(lunch[fries].food); //lunch has 3 items so were looking for lunch's 2nd item's food
}

//'for of' loop
for(let packedLunches of lunch) { //'packedLunches' inherit items in the array of 'lunch'
    console.log(packedLunches.eaten);// calls for the boolean of each item in 'lunch' array
}

// forEach, map, filter
lunch.forEach(function(lunch){ //for each set in lunch,
    console.log(lunch.food); // show me all the 'food'
});

const lunchMeal = lunch.map(function(lunch) { //map lunchMeal with arrays from 'lunch'
    return lunch.meal; //only pull variables that are 'meal' in the array
});
console.log(lunchMeal);

const lunchEaten = lunch.filter(function(lunch) {//filter for 'eaten'
    return lunch.eaten === true; // only look for ones where 'eaten' is true
}).map(function(lunch) {  //we can attach other functions
    return lunch.food; //so within the set that are 'eaten', pull the 'food' from those
})
console.log(lunchEaten);

//conditionals
const a = 20; //'=' and '==' disregards datatype
const b = 15;

if(a === 10) { //'===' data types has to be the same
    console.log('a IS 10');
}else if(a > 10) {
    console.log('a IS greater than 10');
}else {
    console.log('a IS less than 10');
};

if(a > 10 || b > 10) { // you can set multiple conditions, '||' = or
    console.log('a is more than 5 OR y is more than 10');
};

if(a > 10 && b > 10) { // '&&' = and
    console.log('a is more than 5 AND y is more than 10');
};

//Ternary Operator
const c = 10;
const color = c > 10 ? 'red' : 'blue'; // '?' = then, ':' = else
console.log(color);

//Switch
switch(color) {
    case 'red':
        console.log('color is red');
        break;
    case 'blue':
        console.log('color is blue');
        break;
    default:
        console.log('color is neither red nor blue');
        break;
}

//FUNCTIONS
function addNums(num1 = 1, num2 = 1) { //the values assigned here means it's default
    console.log(num1 + num2);
}
addNums(2,3); //assign new value here, if nothing then it will be default value above

    //another way to write the function above, '=>' = function
const addNumbs = (num1, num2) => { //you don't have to assign any value here ,had to change name since addNums is already being used
    return num1 + num2;
}
    //a slimmer version of the function above
const addNumbbs = (num1, num2) => num1 + num2; //don't have to write 'return'
console.log(addNumbbs(5,4)); //left to right, num1 = 5 num2 = 4, NaN in output = 'non a number'
    //if you only have 1 value, you can write it like this
const addNumbbss = num1 => num1 + 4;
console.log(addNumbbss(6));//num1 value is assigned here
    //functions are great to use with array methods
lunch.forEach((lunch) => console.log(lunch)); 

//LEXICAL DISC

//OBJECT ORIENTED in ES5
    //Constructor functions
function guy(hairColor, height, asian) {
    this.hairColor = hairColor;
    this.height = height;
    this.asian = asian;
    this.getHeightHair = function() { //you can add methods
        return `${this.height} ${this.hairColor}`//you can combine functions
    }
}
guy.prototype.getHeightHair = function() { //throw the function in the prototype so it doesn't show up in the object
    return `${this.height} ${this.hairColor}`;//you gotta comment out the function above though for this to work
}
    //Instantiate object
const guy1 = new guy('brown', '4ft', 'yes');
const guy2 = new guy('black', '6ft', 'no');// you can keep making new 'guys' with new var

console.log(guy1);
console.log(guy2.height);
console.log(guy2.getHeightHair());

//ES6 or ES2015, added class for syntactic sugar, meaning its a prettier way to write things
    //most people write using classes, its cleaner, simpler
class girl{
    constructor(hairColor, height, asian) {
        this.hairColor = hairColor;
        this.height = height;
        this.asian = asian;
    }
    getHeightHair() {
        return `${this.height} ${this.hairColor}`;
    }
}
    //Instatiate like above in ES5
const girl1 = new girl('red', '7ft', 'yes');
const girl2 = new girl('blonde', '3ft', 'no');

console.log(girl1);
console.log(girl2.height);
console.log(girl2.getHeightHair());

//SELECTORS
console.log(window); //very top level, parented to the browser
    //Single
const reg = document.getElementById('regular'); //grab by ID
const bold = document.querySelector('.bold'); //select anything, ie: id, class, tags, etc
const Light = document.querySelector('.light');
    //Multiple
const light = document.querySelectorAll('.light'); //classes must have '.' before them
const byClass = document.getElementsByClassName('light'); //Older way, doesn't need '.' since it's only looking for classes
const byTags = document.getElementsByTagName('body');

bold.remove(); // removes all class of 'bold', only works with 'querySelector'
Light.lastElementChild.innerHTML = '<h2>3rd html</h4>'; //add html to last element
Light.firstElementChild.textContent = 'changed 1'; //changed the text of the first list item
Light.children[1].innerText = '2nd'; //changes 2nd item text
Light.style.color = 'red'; //changes the css to red

//EVENTS
Light.addEventListener('click', (e) => { //defines what to listen for and where
    e.preventDefault(); //if it was a submit button, it'll stop the click from disappearing in console
    console.log(e.target.className); //gets the class name of the clicked target
    document.querySelector('.light').children[1].style.color = 'blue'; //changes the color of the 2nd item when clicked
    Light.classList.add('green');//adds the class 'green' on w.e is clicked on
});