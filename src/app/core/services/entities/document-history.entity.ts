import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DocumentHistory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  filepath: string;

  @Column('text')
  filename: string;

  @Column('datetime')
  lastopen: Date;


}