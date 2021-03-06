/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const WebInspector = require('../../lib/web-inspector');
const assert = require('assert');

/* global describe, it */
describe('Web Inspector lib', function() {
  it('WebInspector exported is the real one', () => {
    assert.equal(typeof WebInspector, 'object');
    assert.ok(WebInspector.CSSMetadata);
  });

  it('does not polyfill setImmediate incorrectly', done => {
    const fakeArg = {
      foo() {},
    };

    setImmediate(function(arg) {
      try {
        arg.foo(); // make sure setImmediate passed the fakeArg
        done();
      } catch (err) {
        done(err);
      }
    }, fakeArg);
  });

  // Our implementation of using DevTools doesn't sandbox natives
  // In the future, it'd be valuable to handle that so lighthouse can safely
  // be consumed as a lib, without dirtying the shared natives
  it.skip('Array native globals dont leak', () => {
    assert.equal(Array.prototype.peekLast, undefined);
  });

  // Same story, but with some global variables
  it.skip('WebInspector global doesn\'t leak', () => {
    assert.equal('WebInspector' in global, false);
    assert.equal('Runtime' in global, false);
    assert.equal('TreeElement' in global, false);
    assert.equal('WorkerRuntime' in global, false);
    assert.equal('Protocol' in global, false);
  });
});
