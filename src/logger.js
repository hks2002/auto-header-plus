/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2023-02-04 10:59:15                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 19:53:06                                *
 * @FilePath              : auto-header-plus/src/logger.js                     *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import * as vscode from 'vscode'
import packageJson from '../package.json' with { type: 'json' }

class Logger {
  constructor() {
    this.outputChannel = vscode.window.createOutputChannel(packageJson.displayName)
    this.logLevel = 'INFO'

    // 日志级别优先级映射，数值越大优先级越高
    this.logLevelPriority = {
      NONE: 0,
      ERROR: 1,
      WARN: 2,
      INFO: 3,
      DEBUG: 4,
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
    console.log(message)
    const title = new Date().toLocaleTimeString()
    this.outputChannel.appendLine(`["${logLevel}" - ${title}] ${message}`)
  }
}

const logger = new Logger()
export { logger }
