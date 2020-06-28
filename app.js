const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function managerPrompt() {
    return inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the Manager's name?"
                 },
                 {
            type: "input",
            name: "id",
            message: "What is the Manager's ID?"
                 },
                 {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
                 },
                 {
            type: "input",
            name: "officeNumber",
            message: "What is the office phone number?"     
                 },
            ]).then(function(answers){
               const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
               employees.push(manager);
               addEmployee();
            });
};

function engineerPrompt() {
     return inquirer
          .prompt([{
               type: "input",
               name: "name",
               message: "What is the engineer's name?"
          },
          {
               type: "input",
               name: "id",
               message: "what is the engineer's ID?"
          },
          {
               type: "input",
               name: "email",
               message: "what is the engineer's email?"
          },
          {
               type: "input",
               name: "github",
               message: "what is your Github user name?"
          },   

          ]).then(function(answers){
               const engineer = new Engineer(answers.name,answers.id,answers.email,answers.github);
               employees.push(engineer);
               addEmployee();
          });
};

function internPrompt() {
     return inquirer
          .prompt([{
               type: "input",
               name: "name",
               message: "what is the Intern's name?"
          },
          {
               type: "input",
               name: "id",
               message: "what is the Intern's id?"
          },   
          {
               type: "input",
               name: "email",
               message: "What is the Intern's email?"
          },   
          {
               type: "input",
               name: "school",
               message: "what is school is the Intern attending?"
          },   
          
          ]).then(function(answers){
               const intern = new Intern(answers.name,answers.id,answers.email,answers.school);
               employees.push(intern);
               addEmployee();
          });
};

async function addEmployee() {
     console.log("curently adding new Employee");
     return await inquirer
          .prompt([{
               type: "list",
               name: "role",
               message: "Which employee role are you adding?",
               choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "None"
               ]
          }
            ]).then(function(answers) {
               switch (answers.role) {
                    case "Manager":
                         managerPrompt();
                         break;
                    case "Engineer":
                         engineerPrompt();
                         break;
                    case "Intern":
                         internPrompt();
                         break;
                    default:
                        createTeam();
               };
          });
};

async function createTeam() {
     const outputHTML = render(employees);
     await fs.writeFile(outputPath, outputHTML, function(err) {
         if (err) throw err;
         console.log("Team Created Successfully!");
     });
 };

addEmployee();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
// for the provided `render` function to work! ```
