//= wrapped

angular
    .module("finance.operationType")
    .controller("OperationTypeShowController", OperationTypeShowController);

function OperationTypeShowController(OperationType, $stateParams, $state) {
    var vm = this;

    OperationType.get({id: $stateParams.id}, function (data) {
        vm.operationType = new OperationType(data);
    }, function () {
        $state.go('operationType.list');
    });

    vm.delete = function () {
        vm.operationType.$delete(function () {
            $state.go('operationType.list');
        }, function () {
            //on error
        });
    };

}
