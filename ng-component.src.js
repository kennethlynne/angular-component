(function (angular) {
  'use strict';

  angular.module('ng-component', [])
    .factory('componentFactory', function (componentFactoryDefaults, componentViewPathFactory) {
      return function (componentName, settings) {
        settings.templateUrl = componentViewPathFactory(componentName);
        return angular.extend(componentFactoryDefaults, settings);
      };
    })
    .value('componentFactoryNamingConventions', {
      prefix: '',
      suffix: 'Component'
    })
    .value('componentFactoryDefaults', {
      replace: true,
      scope: {},
      restrict: 'E'
    })
    .value('componentViewPathFactory', function (componentName) {
      var componentBaseViewPath = 'views/components/',
        componentSnakeName = componentName
          .replace(/(?:[A-Z]+)/g, function (match) { //camelCase -> snake-case
            return "-" + match.toLowerCase();
          })
          .replace(/^-/, '');
      return componentBaseViewPath + componentSnakeName + '/' + componentSnakeName + '.html';
    });

  var originalModule = angular.module;
  angular.module = function () {
    var module = originalModule.apply(this, arguments);
    module.component = function (name, factoryFn) {
      if (module.requires.indexOf('ng-component') == -1) {
        module.requires.push('ng-component');
      }
      module.config(['$compileProvider', 'componentFactoryNamingConventions', function ($compileProvider, naming) {
        $compileProvider.directive(naming.prefix + name + naming.suffix, ['$injector', 'componentFactory', function ($injector, componentFactory) {
          return componentFactory(name, $injector.invoke(factoryFn || angular.noop) || {});
        }]);
      }]);
    };
    return module;
  };

}(angular));
