const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

interface AppErrorOptions {
  name: string;
  statusCode: number;
  description: string;
  isOperational: boolean;
  errorStack?: string | boolean;
  logingErrorResponse?: boolean;
}

class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errorStack?: string | boolean;
  public logError?: boolean;

  constructor({
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logingErrorResponse,
  }: AppErrorOptions) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

class APIError extends AppError {
  constructor(
    name: string,
    statusCode: number = STATUS_CODES.INTERNAL_ERROR,
    description: string = "Internal Server Error",
    isOperational: boolean = true
  ) {
    super({ name, statusCode, description, isOperational });
  }
}

class BadRequestError extends AppError {
  constructor(
    description: string = "Bad request",
    logingErrorResponse?: boolean
  ) {
    super({
      name: "NOT FOUND",
      statusCode: STATUS_CODES.BAD_REQUEST,
      description,
      isOperational: true,
      logingErrorResponse,
    });
  }
}

class ValidationError extends AppError {
  constructor(description: string = "Validation Error", errorStack?: string) {
    super({
      name: "BAD REQUEST",
      statusCode: STATUS_CODES.BAD_REQUEST,
      description,
      isOperational: true,
      errorStack,
    });
  }
}

export { APIError, AppError, BadRequestError, STATUS_CODES, ValidationError };
