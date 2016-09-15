//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeCreateController", ExchangeCreateController);

function ExchangeCreateController(Exchange, $state, Operation, $uibModal) {

    var vm = this;
    vm.operationList = Operation.list();
    vm.exchange = new Exchange();

    vm.saveExchange = function () {
        vm.errors = undefined;
        vm.exchange.$save({}, function () {
            $state.go('exchange.show', {id: vm.exchange.id});
        }, showError);
    };

    vm.addOperation = function () {
        var newOperationModalInstance = $uibModal.open({
            controller: 'OperationCreateModalController',
            controllerAs: 'vm',
            templateUrl: '/finance/operation/createModal.html'
        });

        newOperationModalInstance.result.then(function (operation) {
            if (vm.exchange.operations == undefined || vm.exchange.operations == null) vm.exchange.operations = [];
            vm.exchange.operations.push(operation);
        }, function () {

        });
    };

    vm.removeOperation = function (operation) {
        var index = vm.exchange.operations.indexOf(operation);
        vm.exchange.operations.splice(index, 1);
        vm.deletedOpearation.push(operation);
    };

    function showError(response) {
        var data = response.data;
        if (data.hasOwnProperty('message')) {
            vm.errors = [data];
        } else {
            vm.errors = data._embedded.errors;
        }
    }
}
