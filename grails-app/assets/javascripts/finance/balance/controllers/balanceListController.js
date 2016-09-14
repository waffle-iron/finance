//= wrapped

angular
    .module("finance.balance")
    .controller("BalanceListController", BalanceListController);

function BalanceListController(Balance) {
    var vm = this;

    var max = 10, offset = 0;

    Balance.list({max: max, offset: offset}, function (data) {
        vm.balanceList = data;
    });
}
