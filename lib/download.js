const { promisify } = require('util')

module.exports.clone = async function(repo, desc) {
  const download = promisify(require('download-git-repo')) // 下载组件
  const ora = require('ora')
  const process = ora(`⏳下载...... ${repo}`) // 用于显示加载效果，类似页面的 loading 效果
  process.start()
  await download(repo, desc)
  process.succeed()
}