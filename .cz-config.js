module.exports = {
  types: [
    {
      value: 'feat',
      nane: 'feat'
    },
    {
      value: 'fix',
      nane: 'fix'
    },
    {
      value: 'version',
      nane: 'version: 版本'
    }
  ],
  scopes: ['公共模块', '版本更新'],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']
}
