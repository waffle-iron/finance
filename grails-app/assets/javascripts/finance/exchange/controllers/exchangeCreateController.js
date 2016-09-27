//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeCreateController", ExchangeCreateController);

function ExchangeCreateController(Document, $state) {

    var vm = this;

    vm.exchange = new Document();

    vm.saveExchange = function () {
        vm.errors = undefined;
        vm.exchange.$save({}, function () {
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
