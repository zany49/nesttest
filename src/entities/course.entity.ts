import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('course')
export class Course extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({default: 'null'})
    course_title : string;

    @Column({default: 'null'})
    course_discription : string;

    @Column({default: 'null'})
    course_price: string;
}