import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop()
  _id: string;

  @Prop()
  name: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
