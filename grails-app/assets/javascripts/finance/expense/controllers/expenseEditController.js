//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseEditController", ExpenseEditController);

function ExpenseEditController(Expense, $stateParams, $state, Operation, $uibModal) {
    var vm = this;

    vm.operationList = Operation.list();

    Expense.get({id: $stateParams.id}, function (data) {
        vm.expense = new Expense(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve expense with ID " + $stateParams.id}];
    });

    vm.updateExpense = function () {
        vm.errors = undefined;
        vm.expense.$update(function () {
            $state.go('expense.show', {id: vm.expense.id});
        }, showError);
    };

    vm.addOperation = function () {
        var newOperationModalInstance = $uibModal.open({
            controller: 'OperationCreateModalController',
            controllerAs: 'vm',
            templateUrl: '/finance/operation/createModal.html'
        });

        newOperationModalInstance.result.then(function (operation) {
            if (vm.expense.operations == undefined || vm.expense.operations == null) vm.expense.operations = [];
            vm.expense.operations.push(operation);
        }, function () {

        });
    };

    vm.removeOperation = function (operation) {
        var index = vm.expense.operations.indexOf(operation);
        vm.expense.operations.splice(index, 1);
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
