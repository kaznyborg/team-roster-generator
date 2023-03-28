
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

const employees = []

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'position',
            message: 'What position is this employee?',
            choices: [
                'Manager',
                'Intern',
                'Engineer'
            ]
    
        },
        {
            type: ' input',
            name: 'name',
            message: 'What is the name of the employee?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the employee?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee?'
        }
    ]).then(({position, name, email, id}) => {
        switch(position) {
            case 'Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is the office number?'
                    }
                ]).then(({officeNumber}) => {
                    employees.push(new Manager(
                        name,
                        id,
                        email,
                        officeNumber
                    ))

                    another()
                })
                break;
            case 'Intern':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'school',
                            message: 'What school is the interm from?'
                        }
                    ]).then(({school}) => {
                        employees.push(new Intern(
                            name,
                            id,
                            email,
                            school
                        ))

                        another()
                    })
                break;
            case 'Engineer':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'github',
                        message: 'What is your github name?'
                    }
                ]).then(({github}) => {
                    employees.push(new Engineer(
                        name,
                        id,
                        email,
                        github
                    ))

                    another()
                })
                break;
            default:
        }

        
    })
}

function roleEntry(employee) {
    switch (employee.getRole()) {
        case "Manager":
            return `Office:${employee.getOfficeNumber()}`

        case "Engineer":
            return `<a href="https://www.github.com/${employee.getGithub()}">${employee.getGithub()}<a>`

        case "Intern":
            return `Student at: ${employee.getSchool()}`
    }
}

function another() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Create another?'
        }
    ]).then(({more}) => {
        if (more) newEmployee()
        else renderHTMLFile()
    })
}

function renderHTMLFile(){
    fs.writeFileSync('./index.html', /*html*/ `
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Team Roster</title>
    <link rel="stylesheet" href="./assets/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
  </head>
  <body>
    <h1 class="title">Team Roster</h1>
        <div class="row">
            ${employees.map(employee => /*html*/`
                <div class="col-md-4">
                    <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${employee.getName()}</h5>
                      <p class="card-text">${employee.getRole()}</p>
                      <p class="card-text">${employee.getId()}</p>
                      <a href="mailto:${employee.getEmail()}">${employee.getEmail()}<a>
                      <p class="card-text">${roleEntry(employee)}</p>
                    </div>
                  </div>
                </div>
            `)}
        </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js" integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N" crossorigin="anonymous"></script>
  </body>
</html>

        
    `)
}

newEmployee()