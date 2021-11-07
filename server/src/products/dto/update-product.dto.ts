import { PartialType } from '@nestjs/mapped-types';

interface dataType {
  time: string;
  type: string;
}

export class UpdateProductDto {
  data: dataType;
}
