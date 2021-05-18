const inquirer = require("inquirer")

module.exports.prompt = () => {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'simple',
      message: 'use simple',
      default: true
    }
  ])
}