export default {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit === 'Initial plan']
}
