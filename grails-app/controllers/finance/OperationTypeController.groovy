package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class OperationTypeController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond OperationType.list(params), model: [operationTypeCount: OperationType.count()]
    }

    def show(OperationType operationType) {
        respond operationType
    }

    @Transactional
    def save(OperationType operationType) {
        if (operationType == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (operationType.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond operationType.errors, view: 'create'
            return
        }

        operationType.save flush: true

        respond operationType, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(OperationType operationType) {
        if (operationType == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (operationType.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond operationType.errors, view: 'edit'
            return
        }

        operationType.save flush: true

        respond operationType, [status: OK, view: "show"]
    }

    @Transactional
    def delete(OperationType operationType) {

        if (operationType == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        operationType.delete flush: true

        render status: NO_CONTENT
    }
}
