//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseCreateController", ExpenseCreateController);

function ExpenseCreateController(Document, Account, $state) {

    var vm = this;

    vm.accounts = Account.list();

    vm.expense = new Document();
    vm.expense.type = 'EXPENSE';

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
