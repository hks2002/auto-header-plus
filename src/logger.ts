/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 10:59:15                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-04 10:59:15                               *
 * @FilePath              : auto-header-plus/src/logger.ts                    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { window } from 'vscode'
import packageJson from '../package.json'

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'NONE'

export class Logger {
  private outputChannel = window.createOutputChannel(packageJson.displayName)

  private logLevel: LogLevel = 'INFO'

  public setOutputLevel(logLevel: LogLevel) {
    this.logLevel = logLevel
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  public debug(message: string, data?: unknown): void {
    if (this.logLevel === 'NONE' || this.logLevel === 'INFO' || this.logLevel === 'WARN' || this.logLevel === 'ERROR') {
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
  public info(message: string, data?: unknown): void {
    if (this.logLevel === 'NONE' || this.logLevel === 'WARN' || this.logLevel === 'ERROR') {
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
  public warn(message: string, data?: unknown): void {
    if (this.logLevel === 'NONE' || this.logLevel === 'ERROR') {
      return
    }
    this.logMessage('\u001b[35m' + message + '\u001b[0m', 'WARN')
    window.showWarningMessage(message)
    if (data) {
      this.logObject(data)
    }
  }

  public error(message: string, error?: unknown) {
    if (this.logLevel === 'NONE') {
      return
    }
    this.logMessage('\u001b[31m' + message + '\u001b[0m', 'ERROR')
    window.showErrorMessage(message)

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

  public show() {
    this.outputChannel.show()
  }

  private logObject(data: unknown): void {
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
  private logMessage(message: string, logLevel: LogLevel): void {
    const title = new Date().toLocaleTimeString()
    this.outputChannel.appendLine(`["${logLevel}" - ${title}] ${message}`)
  }
}
