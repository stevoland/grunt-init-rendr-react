/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @jsx React.DOM
 * @emails react-core
 */

"use strict";

describe('ReactMount', function() {
  var React = require("../../React");
  var ReactMount = require("../../ReactMount");

  it('should render different components in same root', function() {
    var container = document.createElement('container');
    document.documentElement.appendChild(container);

    ReactMount.renderComponent(React.DOM.div(null), container);
    expect(container.firstChild.nodeName).toBe('DIV');

    ReactMount.renderComponent(React.DOM.span(null), container);
    expect(container.firstChild.nodeName).toBe('SPAN');
  });
});

require("../../mock-modules").register("core/__tests__/ReactMount-test", module);
