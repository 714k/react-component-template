const fs = require('fs')
const { convertToPascalCase } = require('./utils')

const argv = require('yargs/yargs')(process.argv.slice(2))
  .alias('n', 'component-name')
  .describe('n', 'Name of your Component \nExample: my-component-name \n')
  .alias('p', './path/to/your/component')
  .describe('p', 'Path where you want your component \nExample ./src/ \n')
  .alias('v', 'version')
  .demandOption(['n', 'p'])
  .help('help')
  .argv

const componentPath = `${argv.p}${argv.n}`
const folderComponentName = argv.n
const componentName = convertToPascalCase(folderComponentName);
const templatePath = './src/component-template/ComponentTemplate.tsx'

fs.mkdir(componentPath, { recursive: true }, (error) => {
  if (error) {
    throw error
  }

  fs.readFile(templatePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error)
    }

    fs.writeFile(`${componentPath}/${componentName}.tsx`, data, (error) => {
      if (error) {
        throw error
      }

      console.info(`- ${componentName}.tsx component created successfully`)
    })

    fs.writeFile(`${componentPath}/${componentName}.test.tsx`, '// Add your unit tests with jest or rtl here', (error) => {
      if (error) {
        throw error
      }

      console.info(`- ${componentName}.test.tsx component created successfully`)
    })

    fs.writeFile(`${componentPath}/${componentName}.stories.tsx`, '// Add your stories for Storybook here', (error) => {
      if (error) {
        throw error
      }

      console.info(`- ${componentName}.stories.tsx component created successfully`)
    })

    fs.writeFile(`${componentPath}/constants.ts`, '// Add your constants here', (error) => {
      if (error) {
        throw error
      }

      console.info('- constants.tx file created successfully')
    })

    fs.writeFile(`${componentPath}/index.ts`, `export { default as ${componentName} } from "./${folderComponentName}"`, (error) => {
      if (error) {
        throw error
      }

      console.info('- index.ts file created successfully')
    })

    fs.writeFile(`${componentPath}/utils.ts`, `// Add your component utils here`, (error) => {
      if (error) {
        throw error
      }

      console.info('- utils.ts file created successfully')
    })

    fs.writeFile(`${componentPath}/types.ts`, `// Add your component types here`, (error) => {
      if (error) {
        throw error
      }

      console.info('- types.ts file created successfully')
    })

    console.log()
    console.info(`Your component has been created successfully at ${componentPath}`)
  })



});


// console.log(`Args: ${argv.n} - ${argv.p}`)

