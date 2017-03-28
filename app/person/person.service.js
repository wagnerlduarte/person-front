(function () {
    'use strict';
    var basketService = function ($q,
        $http) {

        var enumSexo = [
            { value: 0, description: "Feminino" },
            { value: 1, description: "Masculino" },
        ];

        var enumDeficiencias = {
            fisica: {
                description: 'Física'
            },
            auditiva: {
                description: 'Auditiva'
            },
            visual: {
                description: 'Visual'
            },
            mental: {
                description: 'Mental'
            }
        };

        // var enumDeficiencias = [
        //     {
        //         value: 'fisica',
        //         description: 'Física'
        //     },
        //     {
        //         value: 'auditiva',
        //         description: 'Auditiva'
        //     },
        //     {
        //         value: 'visual',
        //         description: 'Visual'
        //     },
        //     {
        //         value: 'mental',
        //         description: 'Mental'
        //     }
        // ];

        var urlPerson = 'http://localhost:3000/api/v1/person';

        var handleResponse = function (response, defer) {
            if (response.status === 200) {
                defer.resolve(response.data);
            }
            else {
                defer.reject({
                    valido: false,
                    mensagens: response.mensagens
                });
            }
        };

        var callApiPost = function (url, data) {
            var defer = $q.defer();

            $http.post(url, data).then(
                function (response) {
                    handleResponse(response, defer);
                }, function (response) {
                    handleResponse(response, defer);
                });

            return defer.promise;
        };

        var callApiPut = function (url, data) {
            var defer = $q.defer();

            $http.put(url, data).then(
                function (response) {
                    handleResponse(response, defer);
                }, function (response) {
                    handleResponse(response, defer);
                });

            return defer.promise;
        };

        var callApiGet = function (url) {
            var defer = $q.defer();

            $http.get(url).then(
                function (response) {
                    handleResponse(response, defer);
                }, function (response) {
                    handleResponse(response, defer);
                });

            return defer.promise;
        };

        var listPerson = function () {
            return callApiGet(urlPerson);
        };

        var createPerson = function (person) {
            return callApiPost(urlPerson, person);
        };

        var getDescription = function (id, list) {
            var description;

            for (var index = 0; index < list.length; index++) {
                var item = list[index];
                if (item.value === Number(id)) {
                    description = item.description;
                    break;
                }
            }

            return description;
        }

        var getGender = function (id) {
            return getDescription(id, enumSexo);
        };

        return {
            createPerson: createPerson,
            listPerson: listPerson,
            enumSexo: enumSexo,
            enumDeficiencias: enumDeficiencias,
            getGender: getGender
        };
    };
    angular.module('myApp')
        .service('person.service',
        [
            '$q',
            '$http',
            basketService
        ]);
})();
