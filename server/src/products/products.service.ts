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

  async update(id: number, updateProductDto: UpdateProductDto) {
    const befData = await this.ProductModel.findById(id).exec();
    const time = updateProductDto.data.time;
    befData.view.total += 1;
    if (Object.keys(befData.view).includes(time)) {
      befData.view[time] += 1;
    } else {
      befData.view[time] = 1;
    }
    const post = await this.ProductModel.findByIdAndUpdate(id, {
      view: befData.view,
    });
    // console.log('시작');
    // const products = await this.ProductModel.find().exec();
    // for (const item of products) {
    //   const post = await this.ProductModel.findByIdAndUpdate(item._id, {
    //     view: { total: 1, '11/6/2021, 23:09': 1 },
    //   });
    // }
    // console.log('완료');

    return 'test';
  }
}
