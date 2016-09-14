//= wrapped

angular
    .module("finance.operationType")
    .controller("OperationTypeListController", OperationTypeListController);

function OperationTypeListController(OperationType, $state) {
    var vm = this;
    vm.go = $state.go;

    var max = 10, offset = 0;

    OperationType.list({max: max, offset: offset}, function (data) {
        vm.operationTypeList = data;
    });
}
