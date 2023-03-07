import Monad, { BindCallback } from "./monad";
import Maybe from "./maybe";


export type ContextMaybe = Maybe<CanvasRenderingContext2D | null>

/**
 * This is a monad similar to the identity monad except it wraps a canvas rendering context in a maybe monad.
 * It's useful for context state management without having to explicitly manage the context.
 */
export default class Canvas extends Monad<ContextMaybe> {

    /**
     * Constructor for canvas.
     * @param elem Canvas element to wrap
     */
    constructor(elem: HTMLCanvasElement | null) {
        if (elem === null) {
            throw new Error("Canvas element is null.");
        }
        const ctx = elem.getContext("2d");
        // create a maybe monad with the context without explicitly checking for null
        const maybe = new Maybe(ctx);
        super(maybe);
    }

    /**
     * Binds fn to the canvas context and applies the function. 
     * This is useful in many canvas rendering contexts as a functional approach to rendering. 
     * We can chain together rendering calls instead of needing to pass around the context.
     * 
     * @param fn function to apply to the context.
     * @returns A new monad with a maybe value inside.
     */
    public bind(fn: BindCallback<ContextMaybe>): Monad<ContextMaybe> {
        return fn(this.value);
    }

    /**
     * Create a new maybe value from the old canvas value.
     * @param value new maybe
     * @returns a new maybe with the new canvas maybe value
     */
    public return(value: ContextMaybe): Monad<ContextMaybe> {
        return new Maybe<ContextMaybe>(value);
    }

    /**
     * Calls drawing functions and unwraps the context so it is useable by the callback.
     * As an example we can write canvas.draw(ctx => {
     *                                  ctx.fillStyle = "red";
     *                                  ctx.fillRect(10, 10, 100, 50);
     *                          });
     * @param fn  function that contains drawing calls and draws on the unwrapped context
     * @returns the same context with the new drawing calls
     */
    public draw(fn: (ctx: CanvasRenderingContext2D) => void): Monad<ContextMaybe> {
        return this.bind(maybe => {
            if (maybe.value !== null) {
                fn(maybe.value);
            }
            return this;
        });
    }

    /**
     * Returns the context at that specific time.
     * @returns the current rendering context
     */
    public getContext(): CanvasRenderingContext2D | null {
        return this.value.value;
    }

}