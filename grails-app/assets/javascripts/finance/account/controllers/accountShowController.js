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
        vm.errors = undefined;
        vm.account.$delete(function () {
            $state.go('account.list');
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
