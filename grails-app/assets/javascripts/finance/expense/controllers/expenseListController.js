//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseListController", ExpenseListController);

function ExpenseListController(Expense, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    Expense.list({max: max, offset: offset}, function (data) {
        vm.expenseList = data;
    });
}
