import { ifMethodChain } from "..";
describe("ifMethodChain", function () {
    it("should execute all method chain", function () {
        var array = [1, 2, 3, 4, 5];
        var result = ifMethodChain(array, [
            function (item) { return item.map(function (item) { return item * 2; }); },
            function (item) { return item.map(function (item) { return item - 1; }); }
        ]);
        expect(result).toEqual([1, 3, 5, 7, 9]);
    });
    it("should skip chain if false", function () {
        var array = [1, 2, 3, 4, 5];
        var result = ifMethodChain(array, [
            function (item) { return item.map(function (item) { return item * 2; }); },
            [function (item) { return item.map(function (item) { return item - 1; }); }, false]
        ]);
        expect(result).toEqual([2, 4, 6, 8, 10]);
    });
    it("should not skip chain if true", function () {
        var array = [1, 2, 3, 4, 5];
        var result = ifMethodChain(array, [
            function (item) { return item.map(function (item) { return item * 2; }); },
            [function (item) { return item.map(function (item) { return item - 1; }); }, true]
        ]);
        expect(result).toEqual([1, 3, 5, 7, 9]);
    });
    it("should skip chain if the condition returns false", function () {
        var array = [1, 2, 3, 4, 5];
        var result = ifMethodChain(array, [
            function (item) { return item.map(function (item) { return item * 2; }); },
            [function (item) { return item.map(function (item) { return item - 1; }); }, function (items) { return items.some(function (item) { return item === 100; }); }]
        ]);
        expect(result).toEqual([2, 4, 6, 8, 10]);
    });
    it("should not skip chain if the condition returns true", function () {
        var array = [1, 2, 3, 4, 5];
        var result = ifMethodChain(array, [
            function (item) { return item.map(function (item) { return item * 2; }); },
            [function (item) { return item.map(function (item) { return item - 1; }); }, function (items) { return items.some(function (item) { return item === 2; }); }]
        ]);
        expect(result).toEqual([1, 3, 5, 7, 9]);
    });
});
