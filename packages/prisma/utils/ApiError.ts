export class ApiError extends Error {
  public code: string;
  public status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
