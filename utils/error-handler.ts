import { createLogger, transports } from "winston";
import { AppError } from "./app-errors";

const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

class ErrorLogger {
  constructor() {}

  async logError(err: any): Promise<boolean> {
    console.log("==================== Start Error Logger ===============");
    LogErrors.log({
      private: true,
      level: "error",
      message: `${new Date()} - ${JSON.stringify(err)}`,
    });
    console.log("==================== End Error Logger ===============");
    return false;
  }

  isTrustError(error: unknown): boolean {
    return error instanceof AppError ? error.isOperational : false;
  }
}

export const ErrorHandler = async (err: any, req: any, res: any, next: any) => {
  const errorLogger = new ErrorLogger();

  process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
    console.log(reason, "UNHANDLED REJECTION");
    throw reason;
  });

  process.on("uncaughtException", (error: Error) => {
    errorLogger.logError(error);
    if (errorLogger.isTrustError(err)) {
    }
  });

  if (err) {
    await errorLogger.logError(err);
    if (errorLogger.isTrustError(err)) {
      if (err.errorStack) {
        const errorDescription = err.errorStack;
        return res.status(err.statusCode).json({ message: errorDescription });
      }
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(err.statusCode).json({ message: err.message });
  }
  next();
};
