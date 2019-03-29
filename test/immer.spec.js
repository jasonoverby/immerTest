const { produce } = require('immer');

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
    const result = produce(input, (draft) => {
      // eslint-disable-next-line no-param-reassign
      draft.a = 2;
    });
    // result is now a new object...
    expect(result).not.toBe(input);

    // ...and that new object reflects our changes
    const expected = { a: 2 };
    expect(result).toEqual(expected);

    // result is frozen/immutable so can't change now.
    result.a = 3;
    result.b = 4;
    expect(result).toEqual(expected);
  });

  test('generates an immutable object', () => {
    // How to use immer to generate an immutable (frozen) object
    // (1) from scratch or (2) from an existing object

    // 1. from scratch - provide an object literal or method or something that returns
    //    a reference to an object.
    const immutableFromScratch = produce({}, () => ({ a: 1 }));
    expect(immutableFromScratch).toEqual({ a: 1 });
    immutableFromScratch.a = 2;
    immutableFromScratch.b = 2;
    // Doesn't update because frozen
    expect(immutableFromScratch).toEqual({ a: 1 });

    // 2. from existing object - same as above but providing a reference to an object
    const existing = { a: 1 };
    const immutableFromExisting = produce({}, () => existing);
    immutableFromExisting.a = 2;
    immutableFromExisting.b = 2;
    // Doesn't update because frozen
    expect(immutableFromExisting).toEqual({ a: 1 });
  });
});
