
/**
 * Callback to bind
 */
export interface BindCallback<T> {
    (value: T): Monad<T>;
}

/**
 * Implementation of Monad typeclass conforming to Haskell implementation.
 * Return must be implemented as static method in subclass.
 * class Monad m where  
    return :: a -> m a  
  
    (>>=) :: m a -> (a -> m b) -> m b  
  
    (>>) :: m a -> m b -> m b  
    x >> y = x >>= \_ -> y  
  
    fail :: String -> m a  
    fail msg = error msg  
 */
export default abstract class Monad<T> {

    /**
     *  Constructor for Monad typeclass.
     * @param value Value to set monad as wrapped value.
     */
    constructor(value: T) {
        this._value = value;
    }

    /**
     * Value of the monad or the wrapped value.
     */
    private _value: T

    /**
     * Get monad value
     */
    public get value() {
        return this._value;
    }

    /**
     * Binds function to monad and applies it to value.
     * @param fn 
     */
    public abstract bind(fn: BindCallback<T>): Monad<T>;

    /**
     * Alias for bind. This function applies the function fn to the monadic value this is wrapped and returns the new monad.
     * @param fn callback to apply to value
     * @returns monad with function applied to value
     */
    public then(fn: BindCallback<T>): Monad<T> {
        return this.bind(fn);
    }

    /**
     * Shift >> operator which discards input and has no callback.
     * @param other other monad to use for shift
     * @returns new returned monad
     */
    public shift(other: Monad<T>): Monad<T> {
        return this.bind(() => other)
    }

    /**
     * Fail with error message
     * @param message message to throw
     */
    public fail(message: string): void {
        throw new Error(message);
    }

    public abstract return(value: T): Monad<T>;

}