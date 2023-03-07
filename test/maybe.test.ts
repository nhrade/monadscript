import Maybe, { Just } from "../src/maybe";

test("creates maybe monad", () => {
    const maybe = new Maybe<number>(1);
    expect(maybe.value).toBe(1);
});

test("tests that bind works", () => {
    const maybe = (new Maybe<number>(2))
        .bind(n => Maybe.return(n * n))
        .bind(n => Maybe.return(n + 1));
    expect(maybe.value).toBe(5);
});


test("tests that bind carries null", () => {
    const maybe = (new Maybe<any>(1))
        .bind(n => Maybe.return(null))
        .bind(n => Maybe.return(n + 1));
    expect(maybe.value).toBe(null);
});


test("tests shift", () => {
    const maybe = (new Maybe<any>(1))
        .shift(Maybe.return(3));
    expect(maybe.value).toBe(3);
});



test("tests fail", () => {

    const maybe = () => (new Maybe<any>(1))
        .bind(n => Maybe.return(null))
        .fail("fail the bind");
    expect(maybe).toThrow(Error);
});
