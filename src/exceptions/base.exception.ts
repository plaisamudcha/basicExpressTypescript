import { HttpStatusCode } from "@/types/api.types";

export abstract class BaseException extends Error {
  success: false = false;
  abstract statusCode: HttpStatusCode;
  abstract code: string;
  details?: unknown;

  constructor(message: string) {
    super(message);
  }
}

export class EmailAlreadyExistsException extends BaseException {
  statusCode = HttpStatusCode.CONFLICT;
  code = "EMAIL_ALREADY_EXISTS";

  constructor() {
    super("Email already exists");
  }
}

export class ValidationException extends BaseException {
  statusCode = HttpStatusCode.BAD_REQUEST;
  code = "VALIDATION_ERROR";

  constructor(message: string, details: unknown) {
    super(message);
    this.details = details;
  }
}
