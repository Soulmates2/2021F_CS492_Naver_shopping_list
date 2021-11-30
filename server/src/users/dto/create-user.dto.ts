import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class Products {
    @IsString()
    _id: string;
    constructor(id){
        this._id = id;
    }

}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly _id: string;

    // @ValidateNested({ each: true })
   dibs: Products[];
//    dibs: string[];
}
