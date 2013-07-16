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

describe('onlyChild', function() {

  var React;
  var onlyChild;
  var WrapComponent;

  beforeEach(function() {
    React = require("../../React");
    onlyChild = require("../../onlyChild");
    WrapComponent = React.createClass({
      render: function() {
        return (
          React.DOM.div(null, 
            onlyChild(this.props.children, this.props.mapFn, this)
          )
        );
      }
    });
  });

  it('should fail when passed two children', function() {
    expect(function() {
      var instance =
        WrapComponent(null, 
          React.DOM.div(null ),
          React.DOM.span(null )
        );
      onlyChild(instance.props.children);
    }).toThrow();
  });

  it('should fail when passed nully values', function() {
    expect(function() {
      var instance =
        WrapComponent(null, 
          null
        );
      onlyChild(instance.props.children);
    }).toThrow();

    expect(function() {
      var instance =
        WrapComponent(null, 
          undefined
        );
      onlyChild(instance.props.children);
    }).toThrow();
  });

  it('should fail when key/value objects', function() {
    expect(function() {
      var instance =
        WrapComponent(null, 
          {oneThing: React.DOM.span(null )}
        );
      onlyChild(instance.props.children);
    }).toThrow();
  });


  it('should not fail when passed interpolated single child', function() {
    expect(function() {
      var instance =
        WrapComponent(null, 
          React.DOM.span(null )
        );
      onlyChild(instance.props.children);
    }).not.toThrow();
  });


  it('should return the only child', function() {
    expect(function() {
      var instance =
        WrapComponent(null, 
          React.DOM.span(null )
        );
      onlyChild(instance.props.children);
    }).not.toThrow();
  });

});

require("../../mock-modules").register("utils/__tests__/onlyChild-test", module);
