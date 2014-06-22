'use strict';

describe('ng-component', function () {

  beforeEach(function () {
    module('ng-component');
  });

  describe('componentFactory', function () {
    it('should be registered', inject(function (componentFactory) {
      expect(typeof componentFactory).toBe('function');
    }));
  });

  describe('componentFactoryDefaults', function () {
    it('should be registered', inject(function (componentFactoryDefaults) {
      expect(typeof componentFactoryDefaults).toBe('object');
    }));
  });

  describe('componentFactoryNamingConventions', function () {
    it('should be registered', inject(function (componentFactoryNamingConventions) {
      expect(typeof componentFactoryNamingConventions).toBe('object');
    }));
  });

  describe('componentViewPathFactory', function () {
    it('should be registered', inject(function (componentViewPathFactory) {
      expect(typeof componentViewPathFactory).toBe('function');
    }));
  });

});

describe('testModule', function () {
  var module, $compileProvider;

  beforeEach(function () {
    $compileProvider = {
      directive: jasmine.createSpy('$compileProvider.directive')
    };
    
    module = angular.module('testModule', []);

    module.config(function ($provide) {
        $provide.value('$compileProvider', $compileProvider)
    });

    module.component('test', {});
  });

  it('should register a component', function() {
    expect($compileProvider.directive).toHaveBeenCalled();
  });

});