//= wrapped

angular
    .module("finance.balance")
    .controller("BalanceCreateController", BalanceCreateController);

function BalanceCreateController(Balance, $state, Account) {

    var vm = this;
    vm.accountList = Account.list();
    vm.balance = new Balance();

    vm.saveBalance = function () {
        vm.errors = undefined;
        vm.balance.$save({}, function () {
            $state.go('balance.show', {id: vm.balance.id});
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
