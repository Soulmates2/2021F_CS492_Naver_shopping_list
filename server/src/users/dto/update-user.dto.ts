import { PartialType } from '@nestjs/mapped-types';

interface dataType {
    userId: string;
    mode: number; // MODE (0: signup / 1: addDibs / 2: deleteDibs)
    productId: string;
    time: string;
}

export class UpdateUserDto {
    data: dataType
}
