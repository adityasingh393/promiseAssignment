console.log("Program started");

const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ data: "Hello, friend!", error: null });
    }, 5000);
});

console.log("Program in progress");
console.log("Promise pending:");

promise
    .then((result) => {
        console.log("Resolved value (first chain):", result);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("First promise chain complete!");
            }, 2000);
        });
    })
    .then((message) => {
        console.log(message);
    });

promise
    .then((result) => {
        console.log("Resolved value (second chain):", result);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Second promise chain complete!");
            }, 10000);
        });
    })
    .then((message) => {
        console.log(message);
    });

// 
// output
// Program started
// Program in progress...
// Promise pending: Promise 
// ERROR!
// Resolved value (first chain): { data: 'Hello, friend!', error: null }
// ERROR!
// Resolved value (second chain): { data: 'Hello, friend!', error: null }
// First promise chain complete!
// Second promise chain complete!
