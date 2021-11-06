import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
  @Prop()
  _id: string;

  @Prop()
  parentId: string;

  @Prop()
  name: string;

  @Prop()
  wholeIds: Array<string>;

  @Prop()
  order: number;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
