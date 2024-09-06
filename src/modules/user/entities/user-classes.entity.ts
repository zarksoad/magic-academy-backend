import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserProgressEnum } from "../enums/user-sections.enum";
import { User } from "./user.entity";
import { SectionClass } from "../../section-class/entities/section-class.entity";

@Entity('user_classes')
export class UserClass{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type:'enum', enum:UserProgressEnum})
    status: UserProgressEnum;

    @ManyToOne(() => User, user => user.userClasses)
    @JoinColumn({name: 'users_id'})
    user: User;

    @ManyToOne(() => SectionClass, sectionClass => sectionClass.userClass)
    @JoinColumn({name: 'section_classes_id'})
    sectionClasses: SectionClass[];
}