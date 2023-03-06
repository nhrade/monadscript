import Monad, { BindCallback } from './monad';

/**
 * Implementation of Maybe monad conforming to Haskell instance of
 * instance Monad Maybe where  
 *  return x = Just x  
 *  Nothing >>= f = Nothing  
 *  Just x >>= f  = f x  
 *  fail _ = Nothing 
 */
export default class Maybe<T> extends Monad<T> {

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
     * @param fn callback to pass through.
     */
    public bind(fn: BindCallback<T>): Monad<T> {
        if (this.value === null) {
            return new Maybe<any>(null);
        }
        return fn(this.value);
    }

    /**
     * Strict equality checking
     * @param other other monad
     * @returns whether both monads are equal
     */
    public equals(other: Maybe<T>): boolean {
        return this.value === other.value;
    }

}