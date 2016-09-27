//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeShowController", ExchangeShowController);

function ExchangeShowController(Exchange, $stateParams, $state) {
    var vm = this;

    Exchange.get({id: $stateParams.id}, function (data) {
        vm.exchange = new Exchange(data);
    }, function () {
        $state.go('exchange.list');
    });

    vm.delete = function () {
        vm.exchange.$delete(function () {
            $state.go('exchange.list');
        }, function () {
            //on error
        });
    };

}
