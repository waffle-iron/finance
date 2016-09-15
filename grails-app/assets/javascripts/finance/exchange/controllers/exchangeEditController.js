//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeEditController", ExchangeEditController);

function ExchangeEditController(Exchange, $stateParams, $state, Operation, $uibModal) {
    var vm = this;

    vm.operationList = Operation.list();

    Exchange.get({id: $stateParams.id}, function (data) {
        vm.exchange = new Exchange(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve exchange with ID " + $stateParams.id}];
    });

    vm.updateExchange = function () {
        vm.errors = undefined;
        vm.exchange.$update(function () {
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
