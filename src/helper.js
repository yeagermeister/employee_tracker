
class Clearconsole
function clearConsole() {
  inquirer
      .prompt([
      {type: 'input',
      message: 'Press enter to proceed',
      name: 'proceed'}
      ])
      .then((answers) => {
          console.clear();
          return mainMenu();
      })
};