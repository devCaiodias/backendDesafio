import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { Project } from 'src/projects/project.entity';

export enum StatusTarefa {
    PENDENTE = 'PENDENTE',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA',
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descricao: string;

    @Column({
        type: 'enum',
        enum: StatusTarefa,
        default: StatusTarefa.PENDENTE
    })
    status: StatusTarefa;

    @Column({ nullable: true })
    dataVencimento: Date;

    @CreateDateColumn()
    dataCriacao: Date;

    @UpdateDateColumn()
    dataAtualizacao: Date;

    @ManyToOne(() => Project, (project) => project.tasks)
    projeto: Project;
}