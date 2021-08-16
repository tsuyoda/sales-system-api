class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);

    this.status = status || 500;
    this.message = message || 'Internal Server Error';
  }
}

export default ApiError;
