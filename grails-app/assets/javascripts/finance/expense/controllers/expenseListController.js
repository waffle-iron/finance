//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseListController", ExpenseListController);

function ExpenseListController(Document, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    Document.list({type: 'EXPENSE', max: max, offset: offset}, function (data) {
        vm.expenseList = data;
    });
}
