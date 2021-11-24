import { PartialType } from '@nestjs/mapped-types';
import internal from 'stream';

interface dataType {
    userId: string;
    mode: number; // MODE (0: signup / 1: addDibs / 2: deleteDibs)
    productId: string;
}

export class UpdateUserDto {
    data: dataType
}