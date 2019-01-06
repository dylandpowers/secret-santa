var secretSanta = angular.module('secretSanta', []);

secretSanta.controller('mainController', ($scope, $http, $rootScope) => {
  $scope.addParticipant = function() {
    const params = {
      name: $scope.name,
      email: $scope.email
    };
    $http.post('/participants/add', params)
      .then((res) => {
        console.log(res.data);
        window.location.href = '/confirmation';
      })
      .catch(error => console.error(error));
  };

  $scope.countRecipients = function() {
    $http.get('/participants/count')
      .then((res) => {
        if (!res.data.rows) {
          throw new Error('Database does not exist');
        } else {
          $scope.count = res.data.rows[0].count;
          console.log(`${$scope.count} entries found`);
        }
      });
  }

  $scope.requestRecipient = function() {
    const params = {
      name: $scope.requestName
    };
    $http.get('/participants/match', {
      params: params
    })
      .then((res) => {
        console.log(res.data); // this should be the match name
        $scope.match = toFirstLetterUpperCase(res.data);
      })
      .catch(error => console.error(error));
  }

  $scope.countRecipients();

  /**
   * Turns the first letter of a name into uppercase
   * @param {String} name 
   * @returns {String}
   */
  function toFirstLetterUpperCase(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
});