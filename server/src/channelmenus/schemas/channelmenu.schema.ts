import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelMenuDocument = ChannelMenu & Document;

@Schema()
export class ChannelMenu {
  @Prop()
  _id: string;

  @Prop()
  menus: Array<string>;
}

export const ChannelMenuSchema = SchemaFactory.createForClass(ChannelMenu);
