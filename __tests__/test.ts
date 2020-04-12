import { ifMethodChain } from "..";

describe("ifMethodChain", () => {
  it("should execute all method chain", () => {
    const array = [1, 2, 3, 4, 5];
    const result = ifMethodChain<number[], number[]>(array, [
      (item) => item.map(item => item * 2),
      (item) => item.map(item => item - 1)
    ]);
    expect(result).toEqual([1, 3, 5, 7, 9]);
  });

  it("should skip chain if false", () => {
    const array = [1, 2, 3, 4, 5];
    const result = ifMethodChain<number[], number[]>(array, [
      (item) => item.map(item => item * 2),
      [(item) => item.map(item => item - 1), false]
    ]);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  it("should not skip chain if true", () => {
    const array = [1, 2, 3, 4, 5];
    const result = ifMethodChain<number[], number[]>(array, [
      (item) => item.map(item => item * 2),
      [(item) => item.map(item => item - 1), true]
    ]);
    expect(result).toEqual([1, 3, 5, 7, 9]);
  });

  it("should skip chain if the condition returns false", () => {
    const array = [1, 2, 3, 4, 5];
    const result = ifMethodChain<number[], number[]>(array, [
      (item) => item.map(item => item * 2),
      [(item) => item.map(item => item - 1), (items) => items.some(item => item === 100)]
    ]);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  it("should not skip chain if the condition returns true", () => {
    const array = [1, 2, 3, 4, 5];
    const result = ifMethodChain<number[], number[]>(array, [
      (item) => item.map(item => item * 2),
      [(item) => item.map(item => item - 1), (items) => items.some(item => item === 2)]
    ]);
    expect(result).toEqual([1, 3, 5, 7, 9]);
  });
})