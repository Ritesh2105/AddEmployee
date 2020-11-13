const fs = require("fs");

let employees = [];
let departments = [];


module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/departments.json', 'utf8', (err, data) => {
            if (err) {
                reject(err); return;
            }

            departments = JSON.parse(data);

            fs.readFile('./data/employees.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err); return;
                }

                employees = JSON.parse(data);
                resolve();
            });
        });
    });
}

module.exports.getAllEmployees = function () {
    return new Promise((resolve, reject) => {
        if (employees.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(employees);
    })
}

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].isManager == true) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getDepartments = function () {
    return new Promise((resolve, reject) => {
        if (departments.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(departments);
    });
}

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundEmployee = null;

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num) {
                foundEmployee = employees[i];
            }
        }

        if (!foundEmployee) {
            reject("query returned 0 results"); return;
        }

        resolve(foundEmployee);
    });
};

module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].department == department) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results"); return;
        }
        resolve(filteredEmployeees);
    });
};

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        let EmployeesLength= employees.length;
        if (employeeData.isManager == undefined) {
            employeeData.isManager = false;
        }
        else {
            employeeData.isManager = true;
        }
        employeeData.employeeNum=employees.length +1;
        employees.push(employeeData)
        if(employees.length==EmployeesLength+1)
        {
            resolve("Employee Added");
        }
        else{
            resolve("Employee not added");
        }
    });
};
