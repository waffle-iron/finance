//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeListController", ExchangeListController);

function ExchangeListController(Document, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    Document.list({max: max, offset: offset}, function (data) {
        vm.exchangeList = data;
    });
}
