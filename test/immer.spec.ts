import produce from 'immer';

interface ImmerObject {
  [key: string]: number;
}

describe('immer', () => {
  test('result is input if no change', () => {
    const input = { a: 1 };
    const result = produce(input, () => {});
    expect(result).toBe(input);
  });

  test('result is input if change is same value', () => {
    const input = { a: 1 };
    const result = produce(input, (draft) => {
      // Note: This is going to be annoying if this rule is kept:
      // eslint-disable-next-line no-param-reassign
      draft.a = 1;
    });
    expect(result).toBe(input);
  });

  test('result is new immutable object if change happens', () => {
    const input = { a: 1 };
    const result: ImmerObject = produce(input, (draft) => {
      // eslint-disable-next-line no-param-reassign
      draft.a = 2;
    });
    // result is now a new object...
    expect(result).not.toBe(input);

    // ...and that new object reflects our changes
    const expected = { a: 2 };
    expect(result).toEqual(expected);

    try {
      result.a = 3;
      result.b = 4;
    } catch (err) {
      // result is frozen/immutable so can't change now.
      expect(result).toEqual(expected);
      // throws TypeError because read-only (frozed) props can't be reassigned
      expect(err).toBeInstanceOf(TypeError);
    }
  });

  test('does not generate an immutable object unless change is made', () => {
    // 1. from scratch - provide an object literal or method or something that returns
    //    a reference to an object.
    // if not modified within function passed to produce, returned object will not be frozen
    const immutableFromScratch: ImmerObject = produce({}, () => ({ a: 1 }));
    expect(immutableFromScratch).toEqual({ a: 1 });
    immutableFromScratch.a = 2;
    immutableFromScratch.b = 2;
    // Not frozen because no changes were made w/in produce method
    expect(immutableFromScratch).toEqual({ a: 2, b: 2 });

    // 2. from existing object - same as above but providing a reference to an object
    const existing = { a: 1 };
    const immutableFromExisting: ImmerObject = produce({}, () => existing);
    immutableFromExisting.a = 2;
    immutableFromExisting.b = 2;
    // Not frozen because no changes were made w/in produce method
    expect(immutableFromExisting).toEqual({ a: 2, b: 2 });
    expect(immutableFromExisting).toEqual(existing);
  });
});
