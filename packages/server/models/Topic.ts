/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Comment } from '../models/Comment';

@Table({
  timestamps: true,
  tableName: 'topics',
  modelName: 'Topic',
})
export class Topic extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare topicName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @HasMany(() => Comment)
  declare comments: Comment[];
}
