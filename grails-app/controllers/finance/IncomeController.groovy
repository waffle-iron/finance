package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class IncomeController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Income.list(params), model: [incomeCount: Income.count()]
    }

    def show(Income income) {
        respond income
    }

    @Transactional
    def save(Income income) {
        if (income == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (income.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond income.errors, view: 'create'
            return
        }

        income.save flush: true

        respond income, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Income income) {
        if (income == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (income.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond income.errors, view: 'edit'
            return
        }

        income.save flush: true

        respond income, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Income income) {

        if (income == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        income.delete flush: true

        render status: NO_CONTENT
    }
}
