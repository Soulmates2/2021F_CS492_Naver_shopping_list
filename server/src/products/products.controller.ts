import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('channelNo') channelNo: string,
    @Query('channelName') channelName: string,
  ) {
    console.log('findall 호출', channelNo, channelName);
    return this.productsService.findAll(channelNo, channelName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }
}
