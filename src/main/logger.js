/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-18 19:02:18                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-01-20 19:07:21                                *
 * @FilePath              : auto-header-plus/src/main/logger.js                *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
const vscode = require('vscode')

class Logger {
  constructor() {
    this.outputChannel = vscode.window.createOutputChannel(`Auto Header Plus`, { log: true })
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

  /**
   * Set the log level for filtering messages
   * 
   * @param {string} logLevel - The log level to set (NONE, ERROR, WARN, INFO, DEBUG)
   */
  setOutputLevel(logLevel) {
    this.logLevel = logLevel
  }

  /**
   * Append debug messages to the output channel and format it with a title
   *
   * @param {string} message - The message to append to the output channel
   * @param {JSON} [data] - Optional additional data to log (will be formatted as JSON)
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
   * Append info messages to the output channel and format it with a title
   *
   * @param {string} message - The message to append to the output channel
   * @param {JSON} [data] - Optional additional data to log (will be formatted as JSON)
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
   * Append warning messages to the output channel and format it with a title
   *
   * @param {string} message - The message to append to the output channel
   * @param {JSON} [data] - Optional additional data to log (will be formatted as JSON)
   */
  warn(message, data) {
    if (this.logLevelPriority[this.logLevel] < this.logLevelPriority['WARN']) {
      return
    }
    this.logMessage(message, 'WARN')
    vscode.window.showWarningMessage(message)
    if (data) {
      this.logObject(data)
    }
  }

  /**
   * Append error messages to the output channel and format it with a title
   *
   * @param {string} message - The error message to display
   * @param {string|Error|*} [error] - Optional error object or string to log
   */
  error(message, error) {
    if (this.logLevelPriority[this.logLevel] < this.logLevelPriority['ERROR']) {
      return
    }
    this.logMessage(message, 'ERROR')
    vscode.window.showErrorMessage(message)

    if (typeof error === 'string') {
      // Errors as a string usually only happen with
      // plugins that don't return the expected error.
      this.outputChannel.error(`${error}`)
    } else if (error instanceof Error) {
      if (error?.message) {
        this.logMessage(error.message, 'ERROR')
      }
      if (error?.stack) {
        this.outputChannel.error(`${error.stack}`)
      }
    } else if (error) {
      this.logObject(error)
    }
  }

  /**
   * Show the output channel in VS Code
   */
  show() {
    this.outputChannel.show()
  }

  /**
   * Log an object as formatted JSON
   *
   * @param {*} data - The object to log
   */
  logObject(data) {
    const message = JSON.stringify(data, null, 2)
    this.outputChannel.appendLine(`${message}`)
  }

  /**
   * Append formatted messages to the output channel with timestamp and log level
   *
   * @param {string} message - The message to append to the output channel
   * @param {string} logLevel - The log level for this message
   */
  logMessage(message, logLevel) {
    //const time = new Date().toLocaleTimeString()
 
    
    // 同时输出到控制台，保持原有行为
    switch (logLevel) {
      case 'DEBUG':
        console.debug(message)
        this.outputChannel.appendLine(`${message}`)
        break
      case 'INFO':
        console.log(message)
        this.outputChannel.appendLine(`${message}`)
        break
      case 'WARN':
        console.warn(message)
        this.outputChannel.appendLine(`${message}`)
        break
      case 'ERROR':
        console.error(message)
        this.outputChannel.appendLine(`${message}`)
        break
      default:
        break
    }
  }
}
const logger = new Logger()
module.exports = logger