//= wrapped

angular
    .module("finance.balance")
    .controller("BalanceListController", BalanceListController);

function BalanceListController(Balance, $state) {
    var vm = this;
    vm.go = $state.go;

    var max = 10, offset = 0;

    Balance.list({max: max, offset: offset}, function (data) {
        vm.balanceList = data;
    });
}
