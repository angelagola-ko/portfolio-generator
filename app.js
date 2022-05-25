const fs= require('fs');
const generatePage = require('./src/page-template.js');
const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (required)',
            validate: nameInput =>{
                if (nameInput) {
                    return true;
                } else {
                    console.log('NAAAH');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GithHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log("Please enter your GitHub username.")
                    return false;
                }
            }

        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for the "About" section?',
            default: true,
        },
        {
            type:'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmABout}) => confirmABout
        }
    ]);
}

const promptProject = portfolioData => {
    console.log(`
    =============================
    Add a New Project
    =============================
    `);
    
    //If theres no 'projects' in array property, create one
    if (!portfolioData.projects) {     
    portfolioData.projects = [];
    }

    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a name of the project.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message:'Provde a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description of the project.");
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'Waht did you build this project with? (Check all that apply)',
            choices: ['JavaScipt', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please enter a Github link.");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'fetaure',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};
    
promptUser()
//.then(answers => console.log(answers))
.then(promptProject)
//.then(projectAnswers => console.log(projectAnswers));
.then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
    fs.writeFile('./index.html', pageHTML, err => {
        if (err) throw new Error(err);

        console.log('Page created! Check out index.html in ths directory.')
    });
});

//console.log(inquirer);
//const generatePage = require("./src/page-template.js");

//const profileDataArgs= process.argv.slice(2);//, process.argv.length);

//const generatePage = () => 'Name: Jane, Github: janehub';
//console.log(generatePage());

//const [name, github] = profileDataArgs;

//const name = profileDataArgs[0];

//const github = profileDataArgs[1];
//const pageHTML = generatePage(name,github);

//fs.writeFile('./index.html',pageHTML, err => {
//    if (err) throw err;//generatePage(name,github), //new Error(err); 
//
//    console.log('Portfolio complete! Check out index.html to see the output!');
//});


//console.log(name, github);
//console.log(generatePage(name, github));
//const [name, github] = profileDataArgs;
//--------------------------------------------------------------------
// const generatePage = (username, githubName) => `
// Name: ${username}
// Github: ${githubName}`;
// console.log(generatePage('Angela', 'angelagola-ko'));
//------------------------------------------------------------------------

// console.log(profileDataArgs);

// // const printProfileData =profileDataArr => {
// //     console.log(profileDataArr);
// // };
// const printProfileData = profileDataArr => {
//     //This...
//     for (let i=0; i<profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     }
//     console.log("======================");

//     //Is the same as this...
//     profileDataArr.forEach((profileItem) => {
//         console.log(profileItem)
//     });
//     console.log("====================")

//     //Is the same as
//     profileDataArr.forEach(profileItem => console.log(profileItem));

// };

// printProfileData(profileDataArgs)

