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

// Requires
var React;
var ReactTestUtils;
var reactComponentExpect;

// Test components
var LowerLevelComposite;
var MyCompositeComponent;

var expectSingleChildlessDiv;

/**
 * Integration test, testing the combination of JSX with our unit of
 * abstraction, `ReactCompositeComponent` does not ever add superfluous DOM
 * nodes.
 */
describe('ReactCompositeComponentDOMMinimalism', function() {

  beforeEach(function() {
    reactComponentExpect = require("../../reactComponentExpect");
    React = require("../../React");
    ReactTestUtils = require("../../ReactTestUtils");

    LowerLevelComposite = React.createClass({
      render: function() {
        return (
          React.DOM.div(null, 
            this.props.children
          )
        );
      }
    });

    MyCompositeComponent = React.createClass({
      render: function() {
        return (
          LowerLevelComposite(null, 
            this.props.children
          )
        );
      }
    });

    expectSingleChildlessDiv = function(instance) {
      reactComponentExpect(instance)
        .expectRenderedChild()
        .toBeCompositeComponentWithType(LowerLevelComposite)
          .expectRenderedChild()
          .toBeDOMComponentWithTag('div')
          .toBeDOMComponentWithNoChildren();
    };
  });

  it('should not render extra nodes for non-interpolated text', function() {
    var instance = (
      MyCompositeComponent(null, 
" A string child "      )
    );
    ReactTestUtils.renderIntoDocument(instance);
    expectSingleChildlessDiv(instance);
  });

  it('should not render extra nodes for non-interpolated text', function() {
    var instance = (
      MyCompositeComponent(null, 
        'Interpolated String Child'
      )
    );
    ReactTestUtils.renderIntoDocument(instance);
    expectSingleChildlessDiv(instance);
  });

  it('should not render extra nodes for non-interpolated text', function() {
    var instance = (
      MyCompositeComponent(null, 
        React.DOM.ul(null, 
" This text causes no children in ul, just innerHTML "        )
      )
    );
    ReactTestUtils.renderIntoDocument(instance);
    reactComponentExpect(instance)
      .expectRenderedChild()
      .toBeCompositeComponentWithType(LowerLevelComposite)
        .expectRenderedChild()
        .toBeDOMComponentWithTag('div')
        .toBeDOMComponentWithChildCount(1)
        .expectRenderedChildAt(0)
          .toBeDOMComponentWithTag('ul')
          .toBeDOMComponentWithNoChildren();
  });

});

require("../../mock-modules").register("core/__tests__/ReactCompositeComponentDOMMinimalism-test", module);
