//= wrapped

angular
    .module("finance.operationType")
    .controller("OperationTypeCreateController", OperationTypeCreateController);

function OperationTypeCreateController(OperationType, $state) {

    var vm = this;

    vm.operationType = new OperationType();

    vm.saveOperationType = function () {
        vm.errors = undefined;
        vm.operationType.$save({}, function () {
            $state.go('operationType.show', {id: vm.operationType.id});
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
