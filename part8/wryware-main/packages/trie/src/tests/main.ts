import * as assert from "assert";
import { Trie } from "../index.js";

describe("Trie", function () {
  it("can be imported", function () {
    assert.strictEqual(typeof Trie, "function");
  });

  it("can hold objects weakly", function () {
    const trie = new Trie<object>(true);
    assert.strictEqual((trie as any).weakness, true);
    const obj1 = {};
    assert.strictEqual(
      trie.lookup(obj1, 2, 3),
      trie.lookup(obj1, 2, 3),
    );
    const obj2 = {};
    assert.notStrictEqual(
      trie.lookup(1, obj2),
      trie.lookup(1, obj2, 3),
    );
    assert.strictEqual((trie as any).weak.has(obj1), true);
    assert.strictEqual((trie as any).strong.has(obj1), false);
    assert.strictEqual((trie as any).strong.get(1).weak.has(obj2), true);
    assert.strictEqual((trie as any).strong.get(1).weak.get(obj2).strong.has(3), true);
  });

  it("can disable WeakMap", function () {
    const trie = new Trie<object>(false);
    assert.strictEqual((trie as any).weakness, false);
    const obj1 = {};
    assert.strictEqual(
      trie.lookup(obj1, 2, 3),
      trie.lookup(obj1, 2, 3),
    );
    const obj2 = {};
    assert.notStrictEqual(
      trie.lookup(1, obj2),
      trie.lookup(1, obj2, 3),
    );
    assert.strictEqual(typeof (trie as any).weak, "undefined");
    assert.strictEqual((trie as any).strong.has(obj1), true);
    assert.strictEqual((trie as any).strong.has(1), true);
    assert.strictEqual((trie as any).strong.get(1).strong.has(obj2), true);
    assert.strictEqual((trie as any).strong.get(1).strong.get(obj2).strong.has(3), true);
  });

  it("can produce data types other than Object", function () {
    const symbolTrie = new Trie(true, args => Symbol.for(args.join(".")));
    const s123 = symbolTrie.lookup(1, 2, 3);
    assert.strictEqual(s123.toString(), "Symbol(1.2.3)");
    assert.strictEqual(s123, symbolTrie.lookup(1, 2, 3));
    assert.strictEqual(s123, symbolTrie.lookupArray([1, 2, 3]));
    const sNull = symbolTrie.lookup();
    assert.strictEqual(sNull.toString(), "Symbol()");

    const regExpTrie = new Trie(true, args => new RegExp("^(" + args.join("|") + ")$"));
    const rXYZ = regExpTrie.lookup("x", "y", "z");
    assert.strictEqual(rXYZ.test("w"), false);
    assert.strictEqual(rXYZ.test("x"), true);
    assert.strictEqual(rXYZ.test("y"), true);
    assert.strictEqual(rXYZ.test("z"), true);
    assert.strictEqual(String(rXYZ), "/^(x|y|z)$/");

    class Data {
      constructor(public readonly args: any[]) {}
    }
    const dataTrie = new Trie(true, args => new Data(args));
    function checkData(...args: any[]) {
      const data = dataTrie.lookupArray(args);
      assert.strictEqual(data instanceof Data, true);
      assert.notStrictEqual(data.args, args);
      assert.deepStrictEqual(data.args, args);
      assert.strictEqual(data, dataTrie.lookup(...args));
      assert.strictEqual(data, dataTrie.lookupArray(arguments));
      return data;
    }
    const datas = [
      checkData(),
      checkData(1),
      checkData(1, 2),
      checkData(2),
      checkData(2, 3),
      checkData(true, "a"),
      checkData(/asdf/i, "b", function oyez() {}),
    ];
    // Verify that all Data objects are distinct.
    assert.strictEqual(new Set(datas).size, datas.length);
  });

  it("can peek at values", function () {
    const trie = new Trie(true, (args) => args);

    const obj = {};
    assert.strictEqual(trie.peek(1, 2, 'x'), undefined);
    assert.strictEqual(trie.peek(1, 2, obj), undefined);
    assert.strictEqual(trie.peekArray([1, 2, 'x']), undefined);
    assert.strictEqual(trie.peekArray([1, 2, obj]), undefined);
    // peek/peekArray should not create anything on its own
    assert.strictEqual(trie['weak'], undefined);
    assert.strictEqual(trie['strong'], undefined);
    assert.strictEqual(trie['data'], undefined);

    const data1 = trie.lookup(1, 2, 'x');
    const data2 = trie.lookup(1, 2, obj);

    assert.strictEqual(trie.peek(1, 2, 'x'), data1);
    assert.strictEqual(trie.peek(1, 2, obj), data2);
    assert.strictEqual(trie.peekArray([1, 2, 'x']), data1);
    assert.strictEqual(trie.peekArray([1, 2, obj]), data2);
  });
});
