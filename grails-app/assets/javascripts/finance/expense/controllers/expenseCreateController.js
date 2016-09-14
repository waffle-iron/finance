//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseCreateController", ExpenseCreateController);

function ExpenseCreateController(Expense, $state, Operation) {

    var vm = this;
    vm.operationList = Operation.list();
    console.log(vm.operationList);
    vm.expense = new Expense();

    vm.saveExpense = function () {
        vm.errors = undefined;
        vm.expense.$save({}, function () {
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
