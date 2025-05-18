import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('models')
export class Model {
  @PrimaryGeneratedColumn()
  modelId: number;

  @Column({ type: "varchar", length: 255})
  modelName: string;

  @Column({ type: "boolean", default: false })
  modelState: boolean;
}