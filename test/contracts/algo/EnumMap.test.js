/*
https://github.com/OpenZeppelin/openzeppelin-contracts

The MIT License (MIT)

Copyright (c) 2016-2019 zOS Global Limited

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const {artifacts, accounts} = require('hardhat');

const {BN, expectEvent} = require('@openzeppelin/test-helpers');
const {expect} = require('chai');

const zip = require('lodash.zip');

const EnumMapMock = artifacts.require('EnumMapMock');

describe('EnumMap', function () {
  const [accountA, accountB, accountC] = accounts;

  const keyA = new BN('7891');
  const keyB = new BN('451');
  const keyC = new BN('9592328');

  beforeEach(async function () {
    this.map = await EnumMapMock.new();
  });

  async function expectMembersMatch(map, keys, values) {
    expect(keys.length).to.equal(values.length);

    await Promise.all(keys.map(async (key) => expect(await map.contains(key)).to.equal(true)));

    expect(await map.length()).to.bignumber.equal(keys.length.toString());

    expect(await Promise.all(keys.map((key) => map.get(key)))).to.have.same.members(values);

    // To compare key-value pairs, we zip keys and values, and convert BNs to
    // strings to workaround Chai limitations when dealing with nested arrays
    expect(
      await Promise.all(
        [...Array(keys.length).keys()].map(async (index) => {
          const entry = await map.at(index);
          return [entry.key.toString(), entry.value];
        })
      )
    ).to.have.same.deep.members(
      zip(
        keys.map((k) => k.toString()),
        values
      )
    );
  }

  it('starts empty', async function () {
    expect(await this.map.contains(keyA)).to.equal(false);

    await expectMembersMatch(this.map, [], []);
  });

  it('adds a key', async function () {
    const receipt = await this.map.set(keyA, accountA);
    expectEvent(receipt, 'OperationResult', {result: true});

    await expectMembersMatch(this.map, [keyA], [accountA]);
  });

  it('adds several keys', async function () {
    await this.map.set(keyA, accountA);
    await this.map.set(keyB, accountB);

    await expectMembersMatch(this.map, [keyA, keyB], [accountA, accountB]);
    expect(await this.map.contains(keyC)).to.equal(false);
  });

  it('returns false when adding keys already in the set', async function () {
    await this.map.set(keyA, accountA);

    const receipt = await this.map.set(keyA, accountA);
    expectEvent(receipt, 'OperationResult', {result: false});

    await expectMembersMatch(this.map, [keyA], [accountA]);
  });

  it('updates values for keys already in the set', async function () {
    await this.map.set(keyA, accountA);

    await this.map.set(keyA, accountB);

    await expectMembersMatch(this.map, [keyA], [accountB]);
  });

  it('removes added keys', async function () {
    await this.map.set(keyA, accountA);

    const receipt = await this.map.remove(keyA);
    expectEvent(receipt, 'OperationResult', {result: true});

    expect(await this.map.contains(keyA)).to.equal(false);
    await expectMembersMatch(this.map, [], []);
  });

  it('returns false when removing keys not in the set', async function () {
    const receipt = await this.map.remove(keyA);
    expectEvent(receipt, 'OperationResult', {result: false});

    expect(await this.map.contains(keyA)).to.equal(false);
  });

  it('adds and removes multiple keys', async function () {
    // []

    await this.map.set(keyA, accountA);
    await this.map.set(keyC, accountC);

    // [A, C]

    await this.map.remove(keyA);
    await this.map.remove(keyB);

    // [C]

    await this.map.set(keyB, accountB);

    // [C, B]

    await this.map.set(keyA, accountA);
    await this.map.remove(keyC);

    // [A, B]

    await this.map.set(keyA, accountA);
    await this.map.set(keyB, accountB);

    // [A, B]

    await this.map.set(keyC, accountC);
    await this.map.remove(keyA);

    // [B, C]

    await this.map.set(keyA, accountA);
    await this.map.remove(keyB);

    // [A, C]

    await expectMembersMatch(this.map, [keyA, keyC], [accountA, accountC]);

    expect(await this.map.contains(keyB)).to.equal(false);
  });
});
