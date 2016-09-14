//= wrapped

angular
    .module("finance.account")
    .controller("AccountListController", AccountListController);

function AccountListController(Account) {
    var vm = this;

    var max = 10, offset = 0;

    Account.list({max: max, offset: offset}, function (data) {
        vm.accountList = data;
    });
}
