//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseEditController", ExpenseEditController);

function ExpenseEditController(Expense, $stateParams, $state, Operation) {
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
        }, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };
}