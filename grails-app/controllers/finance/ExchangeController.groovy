package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ExchangeController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Exchange.list(params), model: [exchangeCount: Exchange.count()]
    }

    def show(Exchange exchange) {
        respond exchange
    }

    @Transactional
    def save(Exchange exchange) {
        if (exchange == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (exchange.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond exchange.errors, view: 'create'
            return
        }

        exchange.save flush: true

        respond exchange, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Exchange exchange) {
        if (exchange == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (exchange.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond exchange.errors, view: 'edit'
            return
        }

        exchange.save flush: true

        respond exchange, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Exchange exchange) {

        if (exchange == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        exchange.delete flush: true

        render status: NO_CONTENT
    }
}
