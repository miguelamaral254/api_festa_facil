import { 
  Column,
  Entity, 
  PrimaryGeneratedColumn,
  ManyToOne, 
  JoinColumn 
} from "typeorm"
import { Budget } from "./Budget"

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  clientName!: string

  @Column()
  documentUrl!: string

  @Column()
  signedAt!: Date

  @ManyToOne(() => Budget, { eager: true })
  @JoinColumn({ name: 'budgetId' })
  budget!: Budget
}
