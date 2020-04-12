# if-method-chain

## Installation

```sh
$ npm install if-method-chain
```

## Usage

```ts
import { ifMethodChain } from 'if-method-chain';

const array = [1, 2, 3, 4, 5];
const result = ifMethodChain<number[], number[]>(array, [
  (item) => item.map(item => item * 2),
  (item) => item.map(item => item - 1)
]);

console.log(array) // [1, 3, 5, 7, 9]
```

if false, it will skip the conditional function.

```ts
import { ifMethodChain } from 'if-method-chain';

const result = ifMethodChain<number[], number[]>(array, [
  (item) => item.map(item => item * 2),
  [(item) => item.map(item => item - 1), false]
]);

console.log(array) // [2, 4, 6, 8, 10]
```

if the result is false, it will skipe the conditional function.


```ts
import { ifMethodChain } from 'if-method-chain';

const array = [1, 2, 3, 4, 5];
const result = ifMethodChain<number[], number[]>(array, [
  (item) => item.map(item => item * 2),
  [(item) => item.map(item => item - 1), (items) => items.some(item => item === 100)]
]);

console.log(array) // [2, 4, 6, 8, 10]
```


## Use Case

with firebase

```js
import { ifMethodChain } from 'if-method-chain';

type ShapShot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
type Query = firebase.firestore.Query;

const searchWithUid = true;
const useStartAfter = true;

const snapshot = await ifMethodChain<firebase.firestore.Query, Promise<ShapShot>>(
  db.collection("blog"), 
  [
    (item: Query) => item.orderBy("createdAt", "desc"),
    [(item: Query) => item.where("authorId", "==", uid), searchWithUid],
    [(item: Query) => item.startAfter(startAt), useStartAfter],
    (item: Query) => item.limit(5),
    (item: Query) => item.get()
  ]
);
```
