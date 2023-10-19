// The point of this assignment is not to use the functional elements that are part of your chosen language (JavScript/Python).
// But, rather, implement the functionality from scratch using pure functions and higher level functions.
// Do the implimentation in order as given. 
// We have linked to info at MDN, this is just to give a sence of how the reduce,forEach,map and filter functions should work.
//
// 🛠️ Prerequisite:
// You must create an array persons that will contain the data from https://raw.githubusercontent.com/MM-203/misc/main/data/data.json
// This must be done before the first task
//
// ----------------------------------------------------------------------------------------------------------------------------------
// Bonus challenge 🎉 (a bit hard), the functions forEach, filter and map can all be created using the function reduce. 
// If you feel up for a challenge, try doing so. NB! The bonus challenge is optional. 
// ----------------------------------------------------------------------------------------------------------------------------------

const persons = [
    { "name": "Paula Key", "age": 23 },
    { "name": "Riya Dickerson", "age": 99 },
    { "name": "Layne Colon", "age": 53 },
    { "name": "Pranav Giles", "age": 51 },
    { "name": "Kamryn Davis", "age": 27 },
    { "name": "Taniyah Yu", "age": 17 },
    { "name": "Brendon Porter", "age": 23 },
    { "name": "Jordin Hancock", "age": 86 },
    { "name": "Shawn Vargas", "age": 88 },
    { "name": "Sawyer Copeland", "age": 14 },
    { "name": "Gustavo Baldwin", "age": 7 },
    { "name": "Renee Wilson", "age": 29 }
]
// 1
// Implement your own reduce function and count the number of people above the age of 50
// You can read about a reduce function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce 
console.log("\nReduce function:");
function reduce(callbackFn, array, initialValue) {
    let accumulator, currentValue, currentIndex;

    if (arguments[2] != undefined) {
        currentIndex = 0;
        currentValue = array[0];
        accumulator = initialValue;
    } else {
        currentIndex = 1;
        currentValue = array[1];
        accumulator = array[0];
    }
    for (currentIndex; currentIndex < array.length; currentIndex++) {
        currentValue = array[currentIndex];
        accumulator = callbackFn(accumulator, currentValue)
    }
    return accumulator;
}


const totalOver50 = reduce((accumulator, currentValue) => {
    if (currentValue.age > 50) accumulator += 1;
    return accumulator
}, persons, 0);

console.log(totalOver50);


// 2
// Implement your own forEach function and use it to greet all the people in the persons array (say Hi, persons name).
// Read about forEach https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach


function forEach(callbackFn, array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        callbackFn(element)
    }
}

console.log("\nForEach:")
forEach((element) => {
    console.log(`Hi, ${element.name}`)
}, persons)



// 3
// Implement your own map function and make everyone a year older.
// You can read about what the map function should do https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map 

function map(callbackFn, array) {
    let result = []
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const elementCopy = { ...element }
        result.push(callbackFn(elementCopy, index));
    }
    return result;
}

const addOne = map((element) => {
    element.age += 1;
    return element;
}, persons)

console.log("\nAdd one to age:");
console.log(addOne);

// 4
// Implement your own filter function, and use it to find evryone under the drinking age.
// Read about filter https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter


function filter(callbackFn, array) {
    let newArray = [];

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (callbackFn(element, index)) {
            newArray.push(element);
        }
    }
    return newArray;
}

const peopleUnderDrinkingAge = filter((element) => { return element.age < 18; }, persons)

console.log("\nPeople under drinking age:", peopleUnderDrinkingAge);


// 5
// Now create a function sum, that takes a list of numbers and returns the sum
// Try to use your previously created functions to make this function 
// Sum the total age of persons using this new function 
// NB! Do not manualy create the age listing

function sum(array, key) {
    return reduce((total, element) => {
        if (key) {
            return total + element[key];
        } else {
            return total + element;
        }
    }, array, 0)
}

const testSum = sum(persons, "age");
console.log("Sum of ages:", testSum)

// 6
// Now create a function average, that returns the average of a list of numbers
// Try to use your previously created functions to make this function 
// calculate the average age of the persons using this function
// NB! Do not manualy create the age listing

function average(array, key) {
    if (array.length === 0) return 0;
    return sum(array, key) / array.length;
}

const averageAge = average(persons, "age");
console.log("AverageAge:", averageAge);



// 7
// Finaly create a max and a min function that respectivly returns the maximum value and the minimum value
// Only use previously created functions to achieve this.
// Then find the min and max age of ther persons.
function max(array, key) {
    const max = reduce((max, element) => {
        if (key) {
            if (max < element[key]) max = element[key];
            return max;
        } else {
            if (max < element) max = element;
            return max;
        }
    }, array, Number.MIN_SAFE_INTEGER)
    return max;
}

const oldestPerson = max(persons, "age");
console.log("Oldest person:", oldestPerson);

function min(array, key) {
    const min = reduce((min, element) => {
        if (key) {
            if (min > element[key]) min = element[key];
            return min;
        } else {
            if (min > element) min = element;
            return min;
        }
    }, array, Number.MAX_SAFE_INTEGER)
    return min;
}

//const youngestPerson = min(map(element => element.age, persons));
const youngestPerson = min(persons, "age");
console.log("Youngest person:", youngestPerson);


