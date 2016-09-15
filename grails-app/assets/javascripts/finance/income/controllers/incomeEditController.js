//= wrapped

angular
    .module("finance.income")
    .controller("IncomeEditController", IncomeEditController);

function IncomeEditController(Income, $stateParams, $state, Operation, $uibModal) {
    var vm = this;

    vm.operationList = Operation.list();
    vm.deletedOpearation = [];

    Income.get({id: $stateParams.id}, function (data) {
        vm.income = new Income(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve income with ID " + $stateParams.id}];
    });

    vm.updateIncome = function () {
        vm.errors = undefined;
        vm.income.$update(function () {
            $state.go('income.show', {id: vm.income.id});
        }, showError);
    };

    vm.addOperation = function () {
        var newOperationModalInstance = $uibModal.open({
            controller: 'OperationCreateModalController',
            controllerAs: 'vm',
            templateUrl: '/finance/operation/createModal.html'
        });

        newOperationModalInstance.result.then(function (operation) {
            if (vm.income.operations == undefined || vm.income.operations == null) vm.income.operations = [];
            vm.income.operations.push(operation);
        });
    };

    vm.removeOperation = function (operation) {
        var index = vm.income.operations.indexOf(operation);
        vm.income.operations.splice(index, 1);
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
