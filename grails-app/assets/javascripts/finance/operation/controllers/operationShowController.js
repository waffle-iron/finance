//= wrapped

angular
    .module("finance.operation")
    .controller("OperationShowController", OperationShowController);

function OperationShowController(Operation, $stateParams, $state) {
    var vm = this;

    Operation.get({id: $stateParams.id}, function (data) {
        vm.operation = new Operation(data);
    }, function () {
        $state.go('operation.list');
    });

    vm.delete = function () {
        vm.operation.$delete(function () {
            $state.go('operation.list');
        }, function () {
            //on error
        });
    };

}
