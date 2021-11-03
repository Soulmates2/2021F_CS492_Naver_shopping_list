import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  _id: string;

  @Prop()
  productImages: Array<object>;

  @Prop()
  salePrice: number;

  @Prop()
  soldOut: boolean;

  @Prop()
  modDate: Date;

  @Prop()
  menus: Array<string>;

  @Prop({ type: Object })
  channel: any;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
