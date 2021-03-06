const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// pathway
// all
// name - getName()
// role - getRole()
// email - getEmail()
// id - getId()
// 

// //managerDifference
// officeNumber - getOfficeNumber()
// //engineerDifference
// github - getGithub()
// //internDifference
// school - getSchool()


const questions = [
//what is your name question
{
type: "input",
name: "name",
message:"What is the employee's name?"
},
//what is your role question
{
type: "list",
name: "role",
message:"What is the employee's role?",
choices: ["Manager", "Engineer","Intern"],
},
//what is your email question
{
type: "input",
name: "email",
message:"What is the employee's email?"
},
//what is your ID question
{
type: "input",
name: "id",
message:"What is the employee's id number?"
},
//what is your office number (***questions for MANAGER***)
{
type: "input",
name: "officeNumber",
message:"What is the manager's office phone number?",
when: (response) => response.role === 'Manager'
},
//what is your github (***question for ENGINEER***)
{
type: "input",
name: "github",
message:"What is the engineer's github name?",
when: (response) => response.role === 'Engineer'
},
//what is your school (***question for INTERN***)
{
type: "input",
name: "school",
message:"What is the intern's school?",
when: (response) => response.role === 'Intern'
},
{
type: "confirm",
name: "addEmployee",
message:"Do you need to add another employee?"
},
];



async function init() {
    let response = await inquirer.prompt(questions);
    let newEmployee;
    switch (response.role) {
        case 'Manager' : newEmployee = new Manager(response.name, response.email, response.id, response.officeNumber ); break;
        case 'Engineer' : newEmployee = new Engineer(response.name, response.email, response.id, response.github ); break;
        case 'Intern' : newEmployee = new Intern(response.name, response.email, response.id, response.school ); break;
    }
    employees.push(newEmployee);
    if(response.addEmployee === true) {
        init()
    } else{
        writeToFile()
    }
};

function writeToFile() {
  
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
        fs.writeFile(outputPath, render(employees), function (error) {
            if (error) {
                throw error;
            }
        })
            
}


function completeTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
    }
    fs.writeFileSync(outputPath, render(dreamTeam), "utf-8")
    console.log(dreamTeam);
}





// async function init() {
//     let input = await inquirer.prompt(questions);
//     console.log(input)


init();



//WHEN EXAMPLE
//    'type': 'input',
//    'name': 'url',
//    'message': 'Enter the URL'
//    'when': (answers) => answers.databasetype === 'mongoDB'

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```