#!/usr/bin/env node

const fs = require('fs')

function convertToPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, "").toUpperCase());
}

const argv = require('yargs/yargs')(process.argv.slice(2))
  .alias('n', 'component-name')
  .describe('n', 'Name of your Component \nExample: my-component-name \n')
  .alias('v', 'version')
  .demandOption(['n'])
  .help('help')
  .argv

const componentPath = `./${argv.n}`
const folderComponentName = argv.n
const componentName = convertToPascalCase(folderComponentName);
const lines = [
  'import React from "react"',
  '\n',
  `function ${componentName}() {`,
  '  return (',
  '    <p>Add here your component</p>',
  '  )',
  '}',
  '\n',
  `${componentName}.defaultProps = {}`,
  '\n',
  `${componentName}.displayName = '[your-component-name-to-display]'`,
  '\n',
  `export default ${componentName}`,
]
const templateFile = lines.join('\r')

fs.mkdir(componentPath, {recursive: true}, (error) => {
  if (error) {
    throw error
  }

  fs.writeFile(`${componentPath}/${componentName}.tsx`, templateFile, (error) => {
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

  console.info(`\nYour component has been created successfully at ${componentPath}`)
});


