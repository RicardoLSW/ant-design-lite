// .cz-config.js
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     一个新功能' },
    { value: 'fix', name: 'fix:      修复一个bug' },
    { value: 'docs', name: 'docs:     仅修改了文档' },
    { value: 'release', name: 'release:     发布一个版本' },
    { value: 'style', name: 'style:    不会影响代码含义的更改(空格, 格式化, 缺少分号)' },
    { value: 'refactor', name: 'refactor: 既不修复bug也不添加特性的代码更改' },
    { value: 'perf', name: 'perf:     改进性能的代码更改' },
    { value: 'test', name: 'test:     添加测试' },
    { value: 'ci', name: 'chore:    更改构建过程或辅助工具和库，例如文档生成' },
    { value: 'revert', name: 'revert:   撤销一个提交' },
    { value: 'WIP', name: 'WIP:      工作正在进行中' },
    { value: 'init', name: 'init:      项目初始化' }
  ],

  scopes: [{ name: 'accounts' }, { name: 'admin' }, { name: 'exampleScope' }, { name: 'changeMe' }],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100
}
