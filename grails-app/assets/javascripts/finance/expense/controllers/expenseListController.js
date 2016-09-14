//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseListController", ExpenseListController);

function ExpenseListController(Expense) {
    var vm = this;

    var max = 10, offset = 0;

    Expense.list({max: max, offset: offset}, function (data) {
        vm.expenseList = data;
    });
}
