import Identity, { Id } from "../src/identity";

test("creates identity monad", () => {
    const id = new Identity<number>(4);
    expect(id.value).toBe(4);
});

test("test identity bind", () => {
    const id = new Identity<number>(4).bind(x => Id<number>(x * x));
    expect(id.value).toBe(16);
});