//= wrapped

angular
    .module("finance.operationType")
    .controller("OperationTypeListController", OperationTypeListController);

function OperationTypeListController(OperationType) {
    var vm = this;

    var max = 10, offset = 0;

    OperationType.list({max: max, offset: offset}, function (data) {
        vm.operationTypeList = data;
    });
}
