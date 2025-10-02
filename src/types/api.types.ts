export type SuccessApiResponse<T = any> = {
  success: true;
  message?: string;
  data: T;
};

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export type ErrorApiResponse = {
  success: false;
  message: string;
  statusCode: HttpStatusCode;
  detail?: any;
};

export type ApiResponse = SuccessApiResponse | ErrorApiResponse;
