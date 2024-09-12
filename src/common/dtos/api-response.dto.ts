export class ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
