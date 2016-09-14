package finance

class Operation {

    String description
    OperationType type
    Account credit
    Account debit
    BigDecimal decimal

    static constraints = {
        credit nullable: true
        debit nullable: true
    }
}
