/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-18 19:02:18                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-21 02:03:32                               *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/
const vscode = require('vscode')

class Logger {
  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('Auto Header Plus')
    // 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'NONE'
    this.logLevel = 'INFO'
  }

  /**
   * Show the output level
   * @param {string} logLevel
   */
  setOutputLevel(logLevel) {
    this.logLevel = logLevel.toUpperCase()
  }

  /**
   * Append messages to the output channel and format it with a title
   * @param {string} message The message to append to the output channel
   */
  debug(message) {
    if (this.logLevel === 'NONE' || this.logLevel === 'INFO' || this.logLevel === 'WARN' || this.logLevel === 'ERROR') {
      return
    }
    this.logMessage(message, 'DEBUG')
  }

  /**
   * Append messages to the output channel and format it with a title
   * @param {string} message The message to append to the output channel
   */
  info(message) {
    if (this.logLevel === 'NONE' || this.logLevel === 'WARN' || this.logLevel === 'ERROR') {
      return
    }
    this.logMessage(message, 'INFO')
  }

  /**
   * Append messages to the output channel and format it with a title
   * @param {string} message The message to append to the output channel
   */
  warn(message) {
    if (this.logLevel === 'NONE' || this.logLevel === 'ERROR') {
      return
    }
    this.logMessage('\u001b[35m' + message + '\u001b[0m', 'WARN')
    vscode.window.showWarningMessage(message)
  }

  /**
   * Append messages to the output channel and format it with a title
   * @param {string} message The message to append to the output channel
   * @param {unknown} error The level of the message
   */
  error(message, error) {
    if (this.logLevel === 'NONE') {
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

  /**
   * Log an object to the output channel
   * @param {Object} data
   */

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
   * @param {string} logLevel The level of the message
   * @param {string} message The message to append to the output channel
   */
  logMessage(logLevel, message) {
    const dateTime = new Date().toLocaleTimeString()
    this.outputChannel.appendLine(`["${logLevel}" - ${dateTime}] ${message}`)
  }
}

const logger = new Logger()
module.exports = logger
