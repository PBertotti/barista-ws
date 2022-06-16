import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MachineDocument = Document & Machine;

@Schema()
export class MachineStatus {
  @Prop({ default: -1 })
  waterLevel: number;

  @Prop({ default: -1 })
  powderLevel: number;

  @Prop({ default: null })
  hasRecipient: boolean;

  @Prop({ default: null })
  hasFilter: boolean;
}

@Schema()
export class Machine {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  serialNum: string;

  @Prop()
  model: string;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop({ default: {} })
  status: MachineStatus;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);

export const MachineSchemaDefinition = MongooseModule.forFeature([
  { name: Machine.name, schema: MachineSchema },
]);
