//= wrapped

angular
    .module("finance.income")
    .controller("IncomeShowController", IncomeShowController);

function IncomeShowController(Income, $stateParams, $state) {
    var vm = this;

    Income.get({id: $stateParams.id}, function (data) {
        vm.income = new Income(data);
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
