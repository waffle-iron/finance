package finance

class Exchange {

    String description
    Set operations

    static hasMany = [
            operations: Operation
    ]

    static constraints = {
    }
}
