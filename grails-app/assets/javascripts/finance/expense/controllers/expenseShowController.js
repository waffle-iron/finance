//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseShowController", ExpenseShowController);

function ExpenseShowController(Expense, $stateParams, $state) {
    var vm = this;

    Expense.get({id: $stateParams.id}, function (data) {
        vm.expense = new Expense(data);
    }, function () {
        $state.go('expense.list');
    });

    vm.delete = function () {
        vm.expense.$delete(function () {
            $state.go('expense.list');
        }, function () {
            //on error
        });
    };

}
