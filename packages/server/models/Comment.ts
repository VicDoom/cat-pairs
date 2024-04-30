/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Topic } from '../models/Topic';
import { Reply } from './Reply';

@Table({
  timestamps: true,
  tableName: 'comments',
  modelName: 'Comment',
})
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => Topic)
  @Column
  declare topicId: number;
  @BelongsTo(() => Topic)
  topic!: Topic;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare text: string;

  @HasMany(() => Reply)
  declare replys: Reply[];
}
