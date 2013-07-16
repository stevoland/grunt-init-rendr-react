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
 * @emails react-core
 * @jsx React.DOM
 */

"use strict";

describe('sliceChildren', function() {

  var React;
  var ReactTestUtils;

  var sliceChildren;
  var reactComponentExpect;

  var Partial;

  beforeEach(function() {
    React = require("../../React");
    ReactTestUtils = require("../../ReactTestUtils");

    sliceChildren = require("../../sliceChildren");
    reactComponentExpect = require("../../reactComponentExpect");

    Partial = React.createClass({
      render: function() {
        return (
          React.DOM.div(null, 
            sliceChildren(
              this.props.children,
              this.props.start,
              this.props.end
            )
          )
        );
      }
    });
  });

  function renderAndSlice(set, start, end) {
    var instance = Partial( {start:start, end:end}, set);
    ReactTestUtils.renderIntoDocument(instance);
    var rendered = reactComponentExpect(instance)
      .expectRenderedChild()
      .instance();
    return rendered.props.children;
  }

  it('should render the whole set if start zero is supplied', function() {
    var fullSet = [
      React.DOM.div( {key:"A"} ),
      React.DOM.div( {key:"B"} ),
      React.DOM.div( {key:"C"} )
    ];
    var children = renderAndSlice(fullSet, 0);
    expect(children).toEqual({
      '[A]': fullSet[0],
      '[B]': fullSet[1],
      '[C]': fullSet[2]
    });
  });

  it('should render the remaining set if no end index is supplied', function() {
    var fullSet = [
      React.DOM.div( {key:"A"} ),
      React.DOM.div( {key:"B"} ),
      React.DOM.div( {key:"C"} )
    ];
    var children = renderAndSlice(fullSet, 1);
    expect(children).toEqual({
      '[B]': fullSet[1],
      '[C]': fullSet[2]
    });
  });

  it('should exclude everything at or after the end index', function() {
    var fullSet = [
      React.DOM.div( {key:"A"} ),
      React.DOM.div( {key:"B"} ),
      React.DOM.div( {key:"C"} ),
      React.DOM.div( {key:"D"} )
    ];
    var children = renderAndSlice(fullSet, 1, 2);
    expect(children).toEqual({
      '[B]': fullSet[1]
    });
  });

  it('should allow static children to be sliced', function() {
    var a = React.DOM.div(null );
    var b = React.DOM.div(null );
    var c = React.DOM.div(null );

    var instance = Partial( {start:1, end:2}, a,b,c);
    ReactTestUtils.renderIntoDocument(instance);
    var rendered = reactComponentExpect(instance)
      .expectRenderedChild()
      .instance();

    expect(rendered.props.children).toEqual({
      '[1]': b
    });
  });

});

require("../../mock-modules").register("utils/__tests__/sliceChildren-test", module);