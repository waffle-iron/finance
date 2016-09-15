//= wrapped

angular
    .module("finance.operation")
    .controller("OperationCreateModalController", OperationCreateModalController);

function OperationCreateModalController(Operation, Account, OperationType, $uibModalInstance) {

    var vm = this;
    vm.accountList = Account.list();
    vm.operationTypeList = OperationType.list();
    vm.operation = new Operation();

    vm.saveOperation = function () {
        vm.errors = undefined;
        vm.operation.$save({}, function () {
            $uibModalInstance.close(vm.operation);
        }, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

    vm.cancelCreateOperation = function () {
        $uibModalInstance.dismiss('cancel');
    }
}
