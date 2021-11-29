import { Controller, Get, Param, Query } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('api/menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get('/parent/:id')
  findChild(@Param('id') id: string) {
    return this.menusService.findChildmenus(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }
}
