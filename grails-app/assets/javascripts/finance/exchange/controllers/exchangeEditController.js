//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeEditController", ExchangeEditController);

function ExchangeEditController(Exchange, $stateParams, $state) {
    var vm = this;


    Exchange.get({id: $stateParams.id}, function (data) {
        vm.exchange = new Exchange(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve exchange with ID " + $stateParams.id}];
    });

    vm.updateExchange = function () {
        vm.errors = undefined;
        vm.exchange.$update(function () {
            $state.go('exchange.show', {id: vm.exchange.id});
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
