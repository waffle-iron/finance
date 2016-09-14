//= wrapped

angular
    .module("finance.account")
    .controller("AccountEditController", AccountEditController);

function AccountEditController(Account, $stateParams, $state) {
    var vm = this;


    Account.get({id: $stateParams.id}, function (data) {
        vm.account = new Account(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve account with ID " + $stateParams.id}];
    });

    vm.updateAccount = function () {
        vm.errors = undefined;
        vm.account.$update(function () {
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
