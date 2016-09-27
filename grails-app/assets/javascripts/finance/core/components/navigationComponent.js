//= wrapped

angular.module('finance.core')
    .component('navigation', {
        templateUrl: '/finance/core/navigation.html',
        controller: 'NavigationController',
        controllerAs: 'vm',
        bindings: {}
    })
    .controller('NavigationController', NavigationController);

function NavigationController() {
    var vm = this;
}