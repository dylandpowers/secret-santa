var secretSanta = angular.module('secretSanta', []);

secretSanta.controller('mainController', ($scope, $http, $location) => {
  $scope.requestRecipient = function() {
    const params = {
      name: $scope.name,
      email: $scope.email
    };
    $http.post('/participants/add', params)
      .then((res) => {
        console.log(res.data);
        console.log($location.path());
      })
      .catch(error => console.log(error));
  };
});