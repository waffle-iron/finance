package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ExpenseController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Expense.list(params), model: [expenseCount: Expense.count()]
    }

    def show(Expense expense) {
        respond expense
    }

    @Transactional
    def save(Expense expense) {
        if (expense == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (expense.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond expense.errors, view: 'create'
            return
        }

        expense.save flush: true

        respond expense, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Expense expense) {
        if (expense == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (expense.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond expense.errors, view: 'edit'
            return
        }

        expense.save flush: true

        respond expense, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Expense expense) {

        if (expense == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        expense.delete flush: true

        render status: NO_CONTENT
    }
}
