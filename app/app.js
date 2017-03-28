'use strict';

(function () {
    var app = angular.module('myApp', [
    'ui.router',
    'ui.mask',
    'idf.br-filters'
    ]);

    var runAppFunction = function ($rootScope, $state, authEvents, $timeout, atenticacaoService) {
        $rootScope.$state = $state;

        $state.go('cadastro', {}, { reload: true });
    };

    app.run(
    [
        '$rootScope',
        '$state',
        '$timeout',
        runAppFunction
    ]);
})();
