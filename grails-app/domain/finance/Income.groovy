package finance

class Income {

    String description
    Set operations

    static hasMany = [
            operations: Operation
    ]

    static constraints = {
    }
}
