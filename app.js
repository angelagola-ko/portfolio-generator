const fs= require('fs');
const generatePage = require("./src/page-template.js");

const profileDataArgs= process.argv.slice(2);//, process.argv.length);

//const generatePage = () => 'Name: Jane, Github: janehub';
//console.log(generatePage());

const [name, github] = profileDataArgs;

//const name = profileDataArgs[0];
//const github = profileDataArgs[1];



fs.writeFile('./index.html', generatePage(name,github), err => {
    if (err) throw new Error(err); 

    console.log('Portfolio complete! Check out index.html to see the output!');
});
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

