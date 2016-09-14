//= wrapped

angular
    .module("finance.account")
    .controller("AccountShowController", AccountShowController);

function AccountShowController(Account, $stateParams, $state) {
    var vm = this;

    Account.get({id: $stateParams.id}, function (data) {
        vm.account = new Account(data);
    }, function () {
        $state.go('account.list');
    });

    vm.delete = function () {
        vm.account.$delete(function () {
            $state.go('account.list');
        }, function () {
            //on error
        });
    };

}
