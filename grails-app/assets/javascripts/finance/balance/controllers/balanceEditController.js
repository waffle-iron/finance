//= wrapped

angular
    .module("finance.balance")
    .controller("BalanceEditController", BalanceEditController);

function BalanceEditController(Balance, $stateParams, $state, Account) {
    var vm = this;

    vm.accountList = Account.list();

    Balance.get({id: $stateParams.id}, function (data) {
        vm.balance = new Balance(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve balance with ID " + $stateParams.id}];
    });

    vm.updateBalance = function () {
        vm.errors = undefined;
        vm.balance.$update(function () {
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
