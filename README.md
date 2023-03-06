
# Monadscript


### Introduction

Monadscript is a simple monad library for typescript and javascript. It has a monad abstract class with several subclasses implementing various monadic functions.
To use just git clone and then do `npm install`

### Monad

Monad is an abstract class which must be extended and then the bind function implemented.
Bind acts like an operator which binds a function to the monad and applies that function to the wrapped value producing a new monad. This is similar to the behavior of a functor with the fmap function. In some sense a monad is an object that can be "mapped" to.

### Maybe

Maybe is a monad which can return a value or return nothing at all. It is like a failure monad which can fail but doesn't necessarily do so. Thus it is similar to a Promise.

### Testing
To run tests run `npm run test`
