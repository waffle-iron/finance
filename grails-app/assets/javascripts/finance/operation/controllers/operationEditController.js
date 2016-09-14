//= wrapped

angular
    .module("finance.operation")
    .controller("OperationEditController", OperationEditController);

function OperationEditController(Operation, $stateParams, $state, Account, OperationType) {
    var vm = this;

    vm.accountList = Account.list();
    vm.operationTypeList = OperationType.list();

    Operation.get({id: $stateParams.id}, function (data) {
        vm.operation = new Operation(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve operation with ID " + $stateParams.id}];
    });

    vm.updateOperation = function () {
        vm.errors = undefined;
        vm.operation.$update(function () {
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
