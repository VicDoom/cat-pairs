/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Comment } from '../models/Comment';

@Table({
  timestamps: true,
  tableName: 'reply',
  modelName: 'Replys',
})
export class Reply extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => Comment)
  @Column
  declare commentId: number;
  @BelongsTo(() => Comment)
  comments!: Comment;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare text: string;
}
