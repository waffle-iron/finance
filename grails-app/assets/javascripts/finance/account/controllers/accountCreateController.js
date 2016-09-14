//= wrapped

angular
    .module("finance.account")
    .controller("AccountCreateController", AccountCreateController);

function AccountCreateController(Account, $state) {

    var vm = this;

    vm.account = new Account();

    vm.saveAccount = function () {
        vm.errors = undefined;
        vm.account.$save({}, function () {
            $state.go('account.show', {id: vm.account.id});
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
