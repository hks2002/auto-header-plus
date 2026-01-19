/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-18 19:02:18                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2026-01-19 15:27:42                               *
 * @FilePath              : auto-header-plus/src/main/logger.js               *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

const vscode = require('vscode')

class Logger {
  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('Auto Header Plus')
    this.logLevel = 'INFO'
    
    // 日志级别优先级映射，数值越大优先级越高
    this.logLevelPriority = {
      'NONE': 0,
      'ERROR': 1,
      'WARN': 2,
      'INFO': 3,
      'DEBUG': 4
    }
  }

  setOutputLevel(logLevel) {
    this.logLevel = logLevel
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  debug(message, data) {
    if (this.logLevelPriority[this.logLevel] < this.logLevelPriority['DEBUG']) {
      return
    }
    this.logMessage(message, 'DEBUG')
    if (data) {
      this.logObject(data)
    }
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  info(message, data) {
    if (this.logLevelPriority[this.logLevel] < this.logLevelPriority['INFO']) {
      return
    }
    this.logMessage(message, 'INFO')
    if (data) {
      this.logObject(data)
    }
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  warn(message, data) {
    if (this.logLevelPriority[this.logLevel] < this.logLevelPriority['WARN']) {
      return
    }
    this.logMessage('\u001b[35m' + message + '\u001b[0m', 'WARN')
    vscode.window.showWarningMessage(message)
    if (data) {
      this.logObject(data)
    }
  }

  error(message, error) {
    if (this.logLevelPriority[this.logLevel] < this.logLevelPriority['ERROR']) {
      return
    }
    this.logMessage('\u001b[31m' + message + '\u001b[0m', 'ERROR')
    vscode.window.showErrorMessage(message)

    if (typeof error === 'string') {
      // Errors as a string usually only happen with
      // plugins that don't return the expected error.
      this.outputChannel.appendLine(error)
    } else if (error instanceof Error) {
      if (error?.message) {
        this.logMessage(error.message, 'ERROR')
      }
      if (error?.stack) {
        this.outputChannel.appendLine(error.stack)
      }
    } else if (error) {
      this.logObject(error)
    }
  }

  show() {
    this.outputChannel.show()
  }

  logObject(data) {
    // const message = JSON.parser
    //   .format(JSON.stringify(data, null, 2), {
    //     parser: "json",
    //   })
    //   .trim();
    const message = JSON.stringify(data, null, 2) // don't use prettier to keep it simple

    this.outputChannel.appendLine(message)
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  logMessage(message, logLevel) {
    const title = new Date().toLocaleTimeString()
    this.outputChannel.appendLine(`["${logLevel}" - ${title}] ${message}`)
  }
}
const logger = new Logger()
module.exports = logger
