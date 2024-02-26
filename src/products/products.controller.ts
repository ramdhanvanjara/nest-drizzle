import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsContoller {
  constructor(private readonly productServices: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') prodtitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generetedId = this.productServices.insertProduct(
      prodtitle,
      prodDesc,
      prodPrice,
    );
    return { id: generetedId };
  }

  @Get()
  getAllProducts() {
    return this.productServices.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productServices.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodtitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productServices.updateProduct(prodId,prodtitle,prodDesc,prodPrice)
    return null;
  }

  @Delete(':id')
  removeProduct( @Param('id') prodId: string){
    this.productServices.deleteProduct(prodId);
    return null
  }

}
