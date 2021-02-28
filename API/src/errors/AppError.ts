export class AppError {
  readonly message: string;
  readonly statusCode: number;

  constructor(msg: string, status = 400) {
    this.message = msg;
    this.statusCode = status;
  }
}
