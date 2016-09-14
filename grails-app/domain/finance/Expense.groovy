package finance

class Expense {

    String description
    Set operations

    static hasMany = [
            operations: Operation
    ]

    static constraints = {
    }
}
