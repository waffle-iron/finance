//= wrapped

angular
    .module("finance.income")
    .controller("IncomeListController", IncomeListController);

function IncomeListController(Document, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    Document.list({type: 'INCOME', max: max, offset: offset}, function (data) {
        vm.incomeList = data;
    });
}
