//= wrapped

angular
    .module("finance.operationType")
    .controller("OperationTypeEditController", OperationTypeEditController);

function OperationTypeEditController(OperationType, $stateParams, $state) {
    var vm = this;


    OperationType.get({id: $stateParams.id}, function (data) {
        vm.operationType = new OperationType(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve operationType with ID " + $stateParams.id}];
    });

    vm.updateOperationType = function () {
        vm.errors = undefined;
        vm.operationType.$update(function () {
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
