import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false, length: 125 })
  name!: string;

  @Column({ type: "integer", nullable: false })
  quantity!: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
  price!: number;
}
