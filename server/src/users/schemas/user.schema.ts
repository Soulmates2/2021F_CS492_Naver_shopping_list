import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
class products {
  @Prop()
  _id: string;
}

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  dibs: Array<products>;
}

export const UserSchema = SchemaFactory.createForClass(User);
