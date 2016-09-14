//= wrapped

angular
    .module("finance.account")
    .controller("AccountListController", AccountListController);

function AccountListController(Account, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    Account.list({max: max, offset: offset}, function (data) {
        vm.accountList = data;
    });
}
