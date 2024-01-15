let myPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Promise 1 resolved');
	}, 6000);
});
console.log('Before calling the promise');

let myPromise2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Promise 2 resolved');
	}, 3000);
});
myPromise.then((res) => {
	console.log('From Callback ' + res);
});
myPromise2.then((res) => {
	console.log('From Callback ' + res);
});
console.log('After calling the promise');
