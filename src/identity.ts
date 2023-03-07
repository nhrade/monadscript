import Monad, { BindCallback } from "./monad";


/**
 * Generic identity monad which just applies function to value.
 */
export default class Identity<T> extends Monad<T> {

    /**
     * Constructor for identity monad
     * @param value value to wrap
     */
    constructor(value: T) {
        super(value);
    }

    /**
     * Just applies function without any modification.
     * @param fn function to apply
     * @returns new identity monad
     */
    public bind(fn: BindCallback<T>): Monad<T> {
        return fn(this.value);
    }

    /**
     * Wraps value in identity
     * @param value value to wrap
     * @returns new identity monad
     */
    public return(value: T): Monad<T> {
        return new Identity<T>(value);
    }

}

/**
 * Creates new identity monad
 * @param value value to wrap
 * @returns new identity monad
 */
export function Id<T>(value: T) {
    return new Identity<T>(value);
}