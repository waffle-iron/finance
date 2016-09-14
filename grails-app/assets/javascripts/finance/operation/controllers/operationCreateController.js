//= wrapped

angular
    .module("finance.operation")
    .controller("OperationCreateController", OperationCreateController);

function OperationCreateController(Operation, $state, Account, OperationType) {

    var vm = this;
    vm.accountList = Account.list();
    vm.operationTypeList = OperationType.list();
    vm.operation = new Operation();

    vm.saveOperation = function () {
        vm.errors = undefined;
        vm.operation.$save({}, function () {
            $state.go('operation.show', {id: vm.operation.id});
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
