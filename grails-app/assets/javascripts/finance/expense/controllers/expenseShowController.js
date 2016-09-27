//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseShowController", ExpenseShowController);

function ExpenseShowController(Document, $stateParams, $state) {
    var vm = this;

    Document.get({id: $stateParams.id}, function (data) {
        vm.expense = new Document(data);
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
