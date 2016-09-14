//= wrapped

angular
    .module("finance.balance")
    .controller("BalanceShowController", BalanceShowController);

function BalanceShowController(Balance, $stateParams, $state) {
    var vm = this;

    Balance.get({id: $stateParams.id}, function (data) {
        vm.balance = new Balance(data);
    }, function () {
        $state.go('balance.list');
    });

    vm.delete = function () {
        vm.balance.$delete(function () {
            $state.go('balance.list');
        }, function () {
            //on error
        });
    };

}
