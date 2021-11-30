import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class products {
    @IsString()
    _id: string;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly _id: string;

    // @ValidateNested({ each: true })
   // dibs: products[];
   dibs: string[];
}
