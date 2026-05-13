import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Category {
  ALIMENTOS = "alimentos",
  ELETRONICOS = "eletrônicos",
  COSMETICOS = "cosméticos",
  MODA = "moda",
  CASA = "casa",
}

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false, length: 125 })
  @IsNotEmpty({ message: "O nome do produto é obrigatório" })
  @IsString({ message: "O nome deve ser um texto" })
  name!: string;

  @Column({ type: "enum", enum: Category, nullable: false })
  @IsNotEmpty({ message: "A categoria do produto é obrigatória" })
  @IsEnum(Category, {
    message: "Categoria inválida, envie uma categoria válida",
  })
  categoria!: Category;

  @Column({ type: "integer", nullable: false })
  @IsNotEmpty({ message: "A quantidade do produto é obrigatório" })
  @IsNumber(
    {},
    { message: "O valor deve ser um número inteiro positivo, ou 0" }
  )
  quantity!: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
  @IsNotEmpty({ message: "O preço do produto é obrigatório" })
  @IsNumber(
    {},
    { message: "O valor deve ser um numeral decimal de duas casas" }
  )
  price!: number;
}
