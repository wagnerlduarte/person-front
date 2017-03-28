'use strict';

(function () {

    var cadastroControllerFunction = function ($scope,
        personService
    ) {
        var model = {};


        var sendForm = function () {
            personService.createPerson(model.person)
                .then(function (response) {
                    alert('sucesso');
                }, function (response) {
                    alert('algo deu errado');
                }
                );
        };

        var validateForm = function () {
            if ($scope.form.$invalid && $scope.form.$pristine) {
                $scope.form.$setDirty();
            }
        };

        var init = function () {
            $scope.model = model;
        };

        init();

        $scope.sendForm = sendForm;
        $scope.validateForm = validateForm;
        $scope.model.tiposDeficiencia = personService.enumDeficiencias;
        $scope.model.sexos = personService.enumSexo;
    };

    var route = function ($stateProvider) {
        $stateProvider.state('cadastro', {
            url: '/cadastro',
            templateUrl: 'person/cadastro.html',
            controller: 'cadastro.controller'
        });
    };

    angular.module('myApp')
        .config(['$stateProvider', route])
        .controller('cadastro.controller',
        [
            '$scope',
            'person.service',
            cadastroControllerFunction
        ]);
})();