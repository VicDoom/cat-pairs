/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from './Comment';
import { Topic } from './Topic';
import { Reply } from './Reply';
import { UserTheme } from './UserTheme';

import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
})
export class User extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @Column({ type: DataType.STRING })
  declare first_name: string;

  @Column({ type: DataType.STRING })
  declare second_name: string;

  @Column({ type: DataType.STRING })
  declare display_name: string;

  @Unique
  @Column({ type: DataType.STRING })
  declare login: string;

  @Column({ type: DataType.STRING })
  declare avatar: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare phone: string;

  @HasMany(() => Topic)
  declare topics: Topic[];

  @HasMany(() => Comment)
  declare comments: Comment[];

  @HasMany(() => Reply)
  declare replys: Reply[];

  @HasOne(() => UserTheme)
  declare userTheme: UserTheme;

  static findById(id: number): Promise<User | null> {
    return User.findOne({ where: { id } });
  }
}
