//= wrapped

angular
    .module("finance.income")
    .controller("IncomeShowController", IncomeShowController);

function IncomeShowController(Document, $stateParams, $state) {
    var vm = this;

    Document.get({id: $stateParams.id}, function (data) {
        vm.income = new Document(data);
    }, function () {
        $state.go('income.list');
    });

    vm.delete = function () {
        vm.income.$delete(function () {
            $state.go('income.list');
        }, function () {
            //on error
        });
    };

}
