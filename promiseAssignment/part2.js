console.log("Program Started");
const firstPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("step 1 completed");
    }, 3000)
});
console.log("Program in progress");

console.log("promise pending");

firstPromise.then((message) => {
    console.log(message);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("step 2 completed");
        }, 3000);
    });
}).then((message) => {
    console.log(message);
})

// output
// Program Started
// Program in progress
// promise pending
// step 1 completed
// step 2 completed
