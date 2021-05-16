const { promisify } = require('util') // 将函数转为promise格式
const figlet = promisify(require('figlet')) // 字体包

const clear = require('clear') // 控制台清屏
const chalk = require('chalk') // 修改控制台中字符串的样式
const log = ctx => console.log(chalk.green(ctx)) // 封装日志输出

const { clone } = require('./download')

const { templates } = require('./template')

// 子进程输出流引入主进程输出流
const spawn = async (...args) => {
  const { spawn } = require('child_process')

  const options = args[args.length - 1]
  // 如果系统为windows，则需要修改 shell 为 true
  if (process.platform === 'win32') {
    // 设置 shell 为 true，以隐式的调用 cmd
    options.shell = true
  }

  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout) // 标准输出
    proc.stderr.pipe(process.stderr) // 错误标准输出
    proc.on('close', resolve)
  })
}

function getParam(params) {
  let p = Object.keys(params)
  for (let i = 0; i < p.length; i++) {
    if (params[p[i]]) {
      return p[i]
    }
  }
}

module.exports = async (name, params) => {
  // 打印欢迎页面
  clear()
  const data = await figlet('Hello ' + name)
  log(data)

  log('🚀创建项目 ' + name)
  await clone(templates[getParam(params) || 'project1'], name)

  // 安装依赖
  log('💣安装依赖......')
  await spawn('yarn', ['install'], {cwd: `./${name}`})
  log(`
    👌安装完成
    To get start
    ======================
      cd ${name}
      yarn dev
    ======================
  `)
}