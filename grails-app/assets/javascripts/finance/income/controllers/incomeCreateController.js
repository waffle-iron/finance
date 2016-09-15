//= wrapped

angular
    .module("finance.income")
    .controller("IncomeCreateController", IncomeCreateController);

function IncomeCreateController(Income, $state, Operation, $uibModal) {

    var vm = this;
    vm.operationList = Operation.list();
    vm.income = new Income();

    vm.saveIncome = function () {
        vm.errors = undefined;
        vm.income.$save({}, function () {
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
        }, function () {

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
