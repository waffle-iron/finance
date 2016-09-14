//= wrapped

angular
    .module("finance.income")
    .controller("IncomeListController", IncomeListController);

function IncomeListController(Income, $state) {
    var vm = this;
    vm.go = $state.go;

    var max = 10, offset = 0;

    Income.list({max: max, offset: offset}, function (data) {
        vm.incomeList = data;
    });
}
