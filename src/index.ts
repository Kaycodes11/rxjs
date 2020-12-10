// import { Observable } from "rxjs";

// const obs = new Observable((observer) => {
//   observer.next(2);
//   observer.next(4);
// });

// // observer is an object with its own set of methods that could be called return/emit some value
// const observer = {
//   next: (x: number) => {
//     console.log(`X is ${x + 2}`);
//   },
//   error: (err: string) => {
//     console.log(`error ouccured, ${err}`);
//   },
//   complete: () => {
//     // some observable may not ever be completed
//     console.log("done");
//   },
// };

// // to get value from observable it has to be subscribed
// // obs.subscribe((data) => console.log(data));
// obs.subscribe(observer);

// # make a new observable
// import { from, Observable } from "rxjs";
// const obs = new Observable(function subscribe(subscriber) {
//   const setId = setInterval(() => {
//     // when making a new observable from any value; just emit the value via next method & then whichever needs it just subscribe
//     subscriber.next(1);
//   }, 1000);
// });

// /* when subscribibing not only it can just recieve the data but if needed it can emit new data via next() as well so whenever
// any new data needs to be emiited mostly from observable while subscribering then use next() method from within Subscriber() */

// // const subscribe = obs.subscribe((x: number) => console.log(x));
// const nums = from([10, 20]); //when array is used of return the value as it is from return the iterated values from array
// const subscribe = nums.subscribe((x: number) => console.log(x));

// subscribe.unsubscribe();

// # RxJS opearatos
// import { fromEvent, interval } from "rxjs";
// ## making (creation) :: of, from , formEvent, interval (these are impoted from 'rxjs')

// const obs = interval(1000); // start the number from 1 at the mentioned interval like 1000ms =  1sec
// let button = document.querySelector("button");
// fromEvent(button, "click").subscribe((e: MouseEvent) => {
//   console.log("clicked", e.clientX);
// });

// ## transformable (pipeable) :: map, switchMap, mergeMap, concatMap, filter, tap, scan, first, take, Subject, Behavior Subject,
import { fromEvent, interval, Observable, of } from "rxjs";
import {
  tap,
  map,
  mergeMap,
  switchMap,
  first,
  filter,
  throttleTime,
  debounceTime,
  distinctUntilChanged,
  pluck,
} from "rxjs/operators";

/* whether a value returns as observable or need to make a value observable; no matter what to access value from observable
it must be subscribed and when subscribing; it can just recive the value or emit some new value with next method */

// .subscribe(response => console.log(response)) :: here just get the value from observale and then whatever
// .subscribe((response) => {
//   next: () => {},
//   error: () => {},
//   complete: () => {}

// })

// Observer is nothing but an object that has necessary methods to emit a new value, show error from that value or mark as complete

// const obs = new Observable((observer) => {
//   observer.next(1)
//   observer.next(2)
//   observer.next(4)
//   observer.next(5)
// })

// const obs = of(1, 2, 4, 5); // this is what of did behind the scene now

// obs
//   .pipe(
//     map((item) => {
//       return item + 4;
//     })
//   )
//   .subscribe((v) => console.log(v));

// obs.pipe(first()).subscribe((v) => console.log(v));

// const obs = interval(1000)
//   .pipe(filter((item) => item % 2 === 0))
//   .subscribe((x) => console.log("x: ", x));

// setInterval(() => {
//   obs.unsubscribe();
// }, 5000);

// const button = document.querySelector("button");
// no matter how many user clickse each click will've a timegap of 1000 ms
// fromEvent(button, "click")
//   .pipe(throttleTime(1000))
//   .subscribe((e: MouseEvent) => {
//     console.log("button clicked", e.clientX);
//   });

// let input = document.querySelector("input");
// fromEvent(input, "input")
//   .pipe(
//     map((e: InputEvent) => (<HTMLInputElement>e.target).value),
//     debounceTime(1000),
//     distinctUntilChanged()
//   )
//   .subscribe((value) => {
//     // it will for the mentioed time after user typed (like setTimeout)
//     console.log("value: ", value);
//   });

// whatever user has completed typing after 1000ms whatever value remains; it will take that thanks debounceTime()

// fromEvent(input, "input")
//   .pipe(pluck("target", "value"), debounceTime(1000), distinctUntilChanged())
//   .subscribe((v) => console.log("v: ", v));

const title$ = of("Mr.", "Mrs.", "Master", "Student");
title$.subscribe((data) => console.log(data));

let inputEl = document.querySelector("input");
// now when button clicked as susbcribing not only can recive the event but also emit some value via next when needed
const input$ = fromEvent(inputEl, "input");
// input$.subscribe((e: InputEvent) => console.log((<HTMLInputElement>e.target).value));

// merge two observablels together :: the used child observable'll alwyas be able to access outer/parents observables value
const result$ = title$.pipe(
  mergeMap((title) => {
    // title = Mr. Mrs. Master Stduent; now whatever user types from input$ append the title which are these four
    return input$.pipe(
      debounceTime(1000),
      map((e: InputEvent) => title + " " + (<HTMLInputElement>e.target).value)
    );
  })
);
result$.subscribe(console.log);

const numbers$ = of(1, 2, 4, 5).pipe(switchMap((x: number) => of(x, 2 * x, 4 * x, 8 * x)));
numbers$.subscribe(console.log);
