
# Monadscript


### Introduction

Monadscript is a simple monad library for typescript and javascript. It has a monad abstract class with several subclasses implementing various monadic functions.
To use just git clone and then do `npm install`

### Monad

Monad is an abstract class which must be extended and then the bind function implemented.
Bind acts like an operator which binds a function to the monad and applies that function to the wrapped value producing a new monad. This is similar to the behavior of a functor with the fmap function. In some sense a monad is an object that can be "mapped" to.

### Maybe

Maybe is a monad which can return a value or return nothing at all. It is like a failure monad which can fail but doesn't necessarily do so. Thus it is similar to a Promise.

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
