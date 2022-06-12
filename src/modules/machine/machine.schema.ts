import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MachineDocument = Document & Machine;

@Schema()
export class Machine {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  serialNum: string;

  @Prop()
  name: string;

  @Prop()
  model: string;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);

export const MachineSchemaDefinition = MongooseModule.forFeature([
  { name: Machine.name, schema: MachineSchema },
]);
