// TODO: Write code to define and export the Employee class
class Employee {
    EmployeeInfo (name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
    getName () {
        return this.name;
    };
    getRole () {
        return "Employee";
    };
    getEmail () {
        return this.email;
    };
    getId () {
        return this.id;
    }
}

module.exports = Employee;
