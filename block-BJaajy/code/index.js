// - Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

const one = new Promise((resolve,reject) => setTimeout(() => resolve(1),1000));
const two = new Promise((resolve,reject) => setTimeout(() => resolve(2),2000));
const three = new Promise((resolve,reject) => setTimeout(() => resolve(3),3000));
const four = new Promise((resolve,reject) => setTimeout(() => resolve(4),4000));

Promise.all([one,two,three,four]).then(console.log);

// - Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

const githubUsers = ["kabir4691","vaibhavmule","minhd-nguyen","mountainfirefly","mammothgazillionaire"];

const githubUsersFollowers = Promise.all(
    githubUsers.map((user) => 
    fetch(`https://api.github.com/users/${user}`).then(res => res.json()))
).then(
    data => data.forEach(user => console.log(user.followers))
)


// - Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.
//   - https://random.dog/woof.json
//   - https://aws.random.cat/meow

const dog = new Promise(res => res(fetch(`https://random.dog/woof.json`)));
const cat = new Promise(res => res(fetch(`https://aws.random.cat/meow`)));

Promise.race([dog,cat]).then(value => console.log(value));

// - Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not


const oneS = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const twoS = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const threeS = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([oneS,twoS,threeS]).then(value => console.log(value));
//Promise.all([oneS,twoS,threeS]).then(value => console.log(value)); // Error: Whoops!


// - What will be the output of the following code snippet? How much time will it take for the promise to resolve?


Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

//Output - ['Arya', 'Sam', {name: 'John'}}]


