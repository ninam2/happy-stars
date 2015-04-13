angular.module('happy', ['ngResource', 'ngSanitize'])
    .controller('happyController', function ($scope, $resource, $interval) {
        $scope.name = 'World';

        var starsResource = $resource('stars');
        var starResource = $resource('stars/:id');


        // START: Stars!
        $scope.stars = {};
        $scope.getStars = function () {
            var promise = starsResource.get().$promise;
            promise.then(function (result) {
                console.info(result);
                $scope.stars = result;
            });
            promise.catch(function () {
                console.error(error);
                $scope.stars = {};
            });
        };



        $scope.saveStar = function (newStar) {
            var starToSave = {id: 1, name: newStar, color: 'BLUE'};
            console.info('Saving star:');
            console.info(starToSave);

            var promise = starsResource.save(starToSave).$promise;
            promise.then(function (result) {
                console.info('Star saved!');
                $scope.getStars();
            });
            promise.catch(function () {
                console.error('Star not saved :(');
                console.error(error);
            });
        };

        $scope.deleteStar = function (id) {
            console.info('Deleting star: ' + id);

            var promise = starResource.delete({id: id}).$promise;
            promise.then(function (result) {
                console.info('Star deleted!');
                $scope.getStars();
            });
            promise.catch(function () {
                console.error('Star not deleted :(');
                console.error(error);
            });
        };


        // END: Stars!

        // INIT!
        $scope.checkAlive();
        $scope.getStars();
    }
);