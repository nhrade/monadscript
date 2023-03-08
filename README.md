
# Monadscript


### Introduction

Monadscript is a simple monad library for typescript and javascript. It has a monad abstract class with several subclasses implementing various monadic functions.
To use just git clone and then do `npm install`

Monads are a concept from functional programming that describes composable functionality within a context. What I mean by this is we can have functions that are bound together and process data together. The data is a wrapped value in a specific context.


For example with HTTP you might do something like this.
```javascript
fetch("http://example.com/movies.json")
  .then((response) => response.json())
  .then((data) => console.log(data));
```
This just gets an address via a GET request. Then processes the data by turning it into JSON and printing the data.

Monads generalize this for any wrapped value. For example the canvas monad can do this for HTTP canvas and draw shapes. The maybe monad does this for values that can be null and explicit null pointer errors can be avoided. 

How can monads help your code? Anywhere the code is context dependent and requires manual management, closing files, etc. A monadic context can make the code shorter and easier to understand.
For example a File monad might look something like this.

```typescript
const file = (new File<string>("file.txt"))
    .bind(data => data.toUpperCase())
    .bind(data => {
        console.log(data);
        return data;
    });
```

If this looks familiar that's because it is. It's a Promise that works on files. Promises are like a type of monad. This is similar to how the with keyword in Python works as well.
Code can be simplified this way. 

One quirk however is the bind function it has a type signature of
```typescript
export interface BindCallback<T> {
    (value: T): Monad<T>;
}

public abstract bind(fn: BindCallback<T>): Monad<T>
```

Meaning that bind takes in a function with the signature ```(value: T) => Monad<T>``` and returns 
a new monadic value. Thus our bind function must be passed a function that returns a new monad. This means that our monad is immutable and can be used without race conditions, etc. However, it can be a bit cumbersome to work with.

We can also use the alias ```then``` instead of bind, which just calls the corresponding bind function. This mirrors the promise syntax better than using bind. For the maybe monad we can do this for example.

```typescript
const maybe = (new Maybe<number>(4))
    .then(x => x * x)
    .then(x => x + 1);
console.log(maybe.value)
```
The value should then be 17.

### Monad

Monad is an abstract class which must be extended and then the bind function implemented.
Bind acts like an operator which binds a function to the monad and applies that function to the wrapped value producing a new monad. This is similar to the behavior of a functor with the fmap function. In some sense a monad is an object that can be "mapped" to.

To implement a new monad subclass monad and implement bind and return like this.

```typescript
class NewMonad<T> extends Monad<T> {

    public bind(fn: BindCallback<T>): Monad<T> {
        // put implementation here.
    }

    public return(value: T): Monad<T> {
        // put implementation here./
    }
}
```

Bind applies a function to the wrapped value and returns a new monad. Whereas return returns a new monad based upon an unwrapped value. A constructor should also be implemented however depending on the monadic context that may be unnecessary.

### Maybe

Maybe is a monad which can return a value or return nothing at all. It is like a failure monad which can fail but doesn't necessarily do so. Thus it is similar to a Promise.

```typescript
new Maybe<>
```

### Canvas

The canvas monad allows us to draw to the canvas without worrying about context management.
Normally we have to write canvas code like this.

```javascript
const elem = document.getElementById("canvas");
const ctx = elem.getContext("2d");
ctx.fillRect(0, 0, 120, 80);
```

However, with the canvas monad we can write it like this.

```typescript
const elem = document.getElementById("canvas");
const canvas = (new Canvas(elem))
    .draw(ctx => {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 120, 80);
    })
    .draw(ctx => {
        ctx.fillText("Hello Canvas Monad", 100, 100);
    })
```
This seems to do nothing but it allows us to separate draw calls and choose what we put in each draw call and run them separately. We also don't have to manage the context anymore as it's done for us.


### Creating a new monad

To create a new monad subclass Monad<T> and then implement bind and return like this example from the maybe monad.

```typescript
export default class Maybe<T> extends Monad<T> {

    /**
     * Returns value from maybe
     * @param value 
     */
    public return(value: T): Monad<T> {
        throw new Error('Method not implemented.');
    }

    /**
     * Constructor for maybe monad
     * @param value Value to wrap
     */
    constructor(value: T) {
        super(value);
    }

    /**
     * Return a monad from a value
     * @param value value to wrap
     * @returns monadic value
     */
    public static return<T>(value: T): Maybe<T> {
        return new Maybe<T>(value);
    }

    /**
     * Bind a function to the maybe monad. 
     * This unwraps the monad value, applies the function and wraps it again.
     * @param fn callback to apply to value
     * @returns monad with function applied to value
     */
    public bind(fn: BindCallback<T>): Monad<T> {
        if (this.value === null) {
            return new Maybe<any>(null);
        }
        return fn(this.value);
    }
}
```

### Testing
To run tests run `npm run test`


### Contributing

Tests are always helpful. Any new monads need to extend from the Monad base class and implement bind and return.