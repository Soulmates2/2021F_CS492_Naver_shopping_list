import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreateUserDto, Products } from '../dto/create-user.dto';


export type UserDocument = User & Document;

// @Schema()
// class products {
//   @Prop()
//   _id: string;
// }

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  dibs: Array<Products>;
  // dibs: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
