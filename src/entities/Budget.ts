import {
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn
} from 'typeorm'

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  clientName!: string

  @Column()
  description!: string

  @Column('float')
  value!: number

  @CreateDateColumn()
  createdAt!: Date
}
