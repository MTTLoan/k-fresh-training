/**
 * Logger utility class to wrap console methods with SHOW_LOG toggle.
 *
 * Usage:
 *   - Enable/disable logs by setting the env var `SHOW_LOG=true|false`.
 *   - Default: SHOW_LOG = true.
 */
export class Logger {
  /**
   * Whether logging is enabled (true) or disabled (false).
   * Controlled by the environment variable SHOW_LOG.
   */
  static readonly SHOW_LOG: boolean =
    (process.env.SHOW_LOG ?? 'true').toLowerCase() === 'true';

  /**
   * Logs general information (default console.log).
   * @param {...any} args
   */
  static log(...args: any[]): void {
    if (Logger.SHOW_LOG) {
      console.log(...args);
    }
  }

  /**
   * Logs informational messages (console.info).
   * @param {...any} args
   */
  static info(...args: any[]): void {
    if (Logger.SHOW_LOG) {
      console.info(...args);
    }
  }

  /**
   * Logs debug messages (console.debug).
   * @param {...any} args
   */
  static debug(...args: any[]): void {
    if (Logger.SHOW_LOG) {
      console.debug(...args);
    }
  }

  /**
   * Logs warnings (console.warn).
   * @param {...any} args
   */
  static warn(...args: any[]): void {
    if (Logger.SHOW_LOG) {
      console.warn(...args);
    }
  }

  /**
   * Logs errors (always printed, not gated by SHOW_LOG).
   * @param {...any} args
   */
  static error(...args: any[]): void {
    console.error(...args);
  }

  /**
   * Prints a stack trace (console.trace).
   * @param {...any} args
   */
  static trace(...args: any[]): void {
    if (Logger.SHOW_LOG) {
      console.trace(...args);
    }
  }

  /**
   * Logs tabular data as a table (console.table).
   * @param _title
   * @param _data
   */
  static logData(_title: string, _data: any): void {}
  /**
   * Logs result
   * @param _icon
   * @param _message
   * @param _data
   */
  static logResult(_icon: string, _message: string, _data?: any): void {}

  /**
   * Logs tabular data as a table (console.table).
   * @param tabularData Array or object to display
   * @param properties Optional list of columns to include
   */
  static table(tabularData: any, properties?: string[]): void {
    if (Logger.SHOW_LOG) {
      console.table(tabularData, properties);
    }
  }

  /**
   * Starts a new inline group (console.group).
   * @param {...any} label
   */
  static group(...label: any[]): void {
    if (Logger.SHOW_LOG) {
      console.group(...label);
    }
  }

  /** Ends the current inline group (console.groupEnd). */
  static groupEnd(): void {
    if (Logger.SHOW_LOG) {
      console.groupEnd();
    }
  }

  /**
   * Starts a timer (console.time).
   * @param label
   */
  static time(label: string): void {
    if (Logger.SHOW_LOG) {
      console.time(label);
    }
  }

  /**
   * Ends a timer (console.timeEnd).
   * @param label
   */
  static timeEnd(label: string): void {
    if (Logger.SHOW_LOG) {
      console.timeEnd(label);
    }
  }
}
