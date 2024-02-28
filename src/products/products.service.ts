import { Inject,Injectable, NotFoundException } from "@nestjs/common";
import * as schema from '../modules/drizzle/schema';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { Product } from "./product.model";
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { log } from "console";

@Injectable()
export class ProductsService{

    constructor(
        @Inject(DRIZZLE_ORM) private conn: PostgresJsDatabase<typeof schema>,
      ) {}


    private products: Product[] = [];

    // const prisma:any = new PrismaClient();

    async insertProduct(title: string, desc: string, price: number) {
        console.log(">>>>>>>>>>>>>>>");
        
        const prodId = Math.random().toString();
        const sql: any = `
            INSERT INTO products (id, title, description, price)
            VALUES ('${prodId}', '${title}', '${desc}', ${price})
            RETURNING id
        `;
        try {
            const result = await this.conn.execute(sql);
            const createdProductId = result;
            return createdProductId;
        } catch (error) {
            console.error('Error inserting product:', error);
            throw new Error('Failed to insert product');
        }
    }

    async getProducts() {
        try {
            const products = await this.conn.query.products.findMany();
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }
    
    async getSingleProduct(productId: any){
        console.log("prodId>>>>",productId);
        const product = await this.conn.query.products.findFirst(productId);
        console.log("pro>>>",product);
        
        return {...product};
    }

    updateProduct(productId: string,title:string,desc: string,price:number){
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index,1);
    }

    private findProduct (id: string): [Product, number]{
        const productIndex = this.products.findIndex(prod=>prod.id === id);
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product,productIndex]
    }

   
}
