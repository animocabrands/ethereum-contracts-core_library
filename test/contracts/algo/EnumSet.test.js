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
const {expectEvent, expectRevert} = require('@openzeppelin/test-helpers');
const {expect} = require('chai');

const EnumSetMock = artifacts.require('EnumSetMock');

describe('EnumSet', function () {
  const [accountA, accountB, accountC] = accounts;

  beforeEach(async function () {
    this.set = await EnumSetMock.new();
  });

  async function expectMembersMatch(set, values) {
    await Promise.all(values.map(async (account) => expect(await set.contains(account)).to.equal(true)));

    expect(await set.length()).to.bignumber.equal(values.length.toString());

    expect(await Promise.all([...Array(values.length).keys()].map((index) => set.at(index)))).to.have.same.members(values);
  }

  it('starts empty', async function () {
    expect(await this.set.contains(accountA)).to.equal(false);

    await expectMembersMatch(this.set, []);
  });

  it('adds a value', async function () {
    const receipt = await this.set.add(accountA);
    expectEvent(receipt, 'OperationResult', {result: true});

    await expectMembersMatch(this.set, [accountA]);
  });

  it('adds several values', async function () {
    await this.set.add(accountA);
    await this.set.add(accountB);

    await expectMembersMatch(this.set, [accountA, accountB]);
    expect(await this.set.contains(accountC)).to.equal(false);
  });

  it('returns false when adding values already in the set', async function () {
    await this.set.add(accountA);

    const receipt = await this.set.add(accountA);
    expectEvent(receipt, 'OperationResult', {result: false});

    await expectMembersMatch(this.set, [accountA]);
  });

  it('reverts when retrieving non-existent elements', async function () {
    await expectRevert(this.set.at(0), 'EnumSet: index out of bounds');
  });

  it('removes added values', async function () {
    await this.set.add(accountA);

    const receipt = await this.set.remove(accountA);
    expectEvent(receipt, 'OperationResult', {result: true});

    expect(await this.set.contains(accountA)).to.equal(false);
    await expectMembersMatch(this.set, []);
  });

  it('returns false when removing values not in the set', async function () {
    const receipt = await this.set.remove(accountA);
    expectEvent(receipt, 'OperationResult', {result: false});

    expect(await this.set.contains(accountA)).to.equal(false);
  });

  it('adds and removes multiple values', async function () {
    // []

    await this.set.add(accountA);
    await this.set.add(accountC);

    // [A, C]

    await this.set.remove(accountA);
    await this.set.remove(accountB);

    // [C]

    await this.set.add(accountB);

    // [C, B]

    await this.set.add(accountA);
    await this.set.remove(accountC);

    // [A, B]

    await this.set.add(accountA);
    await this.set.add(accountB);

    // [A, B]

    await this.set.add(accountC);
    await this.set.remove(accountA);

    // [B, C]

    await this.set.add(accountA);
    await this.set.remove(accountB);

    // [A, C]

    await expectMembersMatch(this.set, [accountA, accountC]);

    expect(await this.set.contains(accountB)).to.equal(false);
  });
});
