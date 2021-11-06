import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  async findAll(channelNo: string, channelName: string): Promise<Product[]> {
    return await this.ProductModel.find({
      channel: { channelNo: channelNo, channelName: channelName },
    }).exec();
  }

  async findOne(id: number): Promise<Product> {
    return await this.ProductModel.findById(id).exec();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `PATCH request/미구현`;
  }
}
