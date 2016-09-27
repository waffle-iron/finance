//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeShowController", ExchangeShowController);

function ExchangeShowController(Document, $stateParams, $state) {
    var vm = this;

    Document.get({id: $stateParams.id}, function (data) {
        vm.exchange = new Document(data);
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
