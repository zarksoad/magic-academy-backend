export class ApiResponse<TControllerResponseDto> {
  code: number;
  message: string;
  data: TControllerResponseDto;
}
