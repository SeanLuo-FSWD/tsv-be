import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop()
  password?: string;

  @Prop({ required: true })
  accountType: string;
}

// export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User).plugin(
  uniqueValidator,
  { message: 'email already used.' },
);


