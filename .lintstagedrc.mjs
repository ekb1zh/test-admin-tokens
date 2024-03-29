/*
  https://github.com/okonet/lint-staged#how-can-i-ignore-files-from-eslintignore
 */
import { ESLint } from 'eslint'

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    }),
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(' ')
}

export default {
  '**/*.{ts?(x),js?(x)}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return `eslint --max-warnings=0 ${filesToLint}`
  },
  '*': [
    () => 'npm run lint:ts',
    () => 'npm run lint:styles',
    () => 'npm run test:once',
    () => 'npm run lint:prettier',
  ],
}
