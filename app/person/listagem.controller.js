'use strict';

(function () {

    var listagemControllerFunction = function ($scope,
        personService
    ) {
        var model = {};

        var listPerson = function () {
            personService.listPerson()
                .then(function (response) {
                    model.people = response;
                }, function (response) {
                    alert('algo deu errado');
                }
                );
        };

        var init = function () {
            listPerson();
            $scope.model = model;
        };

        init();

        $scope.getGender = personService.getGender;
        $scope.enumDeficiencias = personService.enumDeficiencias;
    };

    var route = function ($stateProvider) {
        $stateProvider.state('listagem', {
            url: '/listagem',
            templateUrl: 'person/listagem.html',
            controller: 'listagem.controller'
        });
    };

    angular.module('myApp')
        .config(['$stateProvider', route])
        .controller('listagem.controller',
        [
            '$scope',
            'person.service',
            listagemControllerFunction
        ]);
})();