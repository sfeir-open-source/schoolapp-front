/**
 * User error class
 */
export class UserError extends Error {
  constructor(message?: string) {
    if (message) {
      super(`User error : ${message}`);
    } else {
      super(`User error`);
    }
  }
}

/**
 * Missing email user error class
 */
export class MissingEmailError extends UserError {
  constructor(message?: string) {
    if (message) {
      super(`Missing email in user definition : ${message}`);
    } else {
      super(`Missing email in user definition`);
    }
  }
}
