/*
 * Copyright (c) 2015 by Greg Reimer <gregreimer@gmail.com>
 * MIT License. See mit-license.txt for more info.
 */

/* eslint-env mocha */

import assert from 'assert';
import operate from '../src/operate';

describe('operate', () => {

  it('should mutate top-level items of an array', () => {
    const obj = ['a','b','c'];
    operate(obj, [{ select: ['$index'], edit: val => val.toUpperCase() }]);
    assert.deepEqual(obj, ['A','B','C']);
  });

  it('should mutate top-level props of an object', () => {
    const obj = {a:'a',b:'b'};
    operate(obj, [{ select: ['$key'], edit: val => val.toUpperCase() }]);
    assert.deepEqual(obj, {a:'A',b:'B'});
  });

  it('should selectively mutate top-level props of an object', () => {
    const obj = {a:'a',b:'b'};
    operate(obj, [{ select: ['b'], edit: val => val.toUpperCase() }]);
    assert.deepEqual(obj, {a:'a',b:'B'});
  });

  it('should mutate second-level props of an object', () => {
    const obj = {a:'a',b:['b','c']};
    operate(obj, [{ select: ['b','$index'], edit: val => val.toUpperCase() }]);
    assert.deepEqual(obj, {a:'a',b:['B','C']});
  });

  it('should selectively mutate second-level props of an object', () => {
    const obj = {a:'a',b:['b','c']};
    operate(obj, [{ select: ['b',0], edit: val => val.toUpperCase() }]);
    assert.deepEqual(obj, {a:'a',b:['B','c']});
  });
});