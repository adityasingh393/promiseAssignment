console.log("Program started");
const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Program failure");
    }, 2000);
    setTimeout(() => {
        resolve("Program complete");
    }, 3000);
});

console.log("Promise is in Progress");
console.log("Promise pending:");
newPromise.
    then((message) => {
        console.log(message);
    })
    .catch((error => {
        console.log(error);
    }));



//output
// Program started
// Promise is in Progress
// Promise pending: Promise { <pending> }
// Program failure