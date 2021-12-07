import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  //안써서 지워도 될듯
  async findAll(channelNo: string): Promise<Product[]> {
    return await this.ProductModel.find({
      'channel.channelNo': channelNo,
    }).exec();
  }

  //8개씩 return함
  async findByPageAndMenu(
    page: number,
    channelNo: string,
    menuId: string,
  ): Promise<Product[]> {
    if (page < 1) return;
    let filter = {
      'channel.channelNo': channelNo,
    };
    if (menuId) {
      filter['menus'] = { $in: [menuId] };
    }

    return await this.ProductModel.find(filter)
      .skip(8 * (page - 1))
      .limit(8)
      .exec();
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

    return 'test';
  }
}
