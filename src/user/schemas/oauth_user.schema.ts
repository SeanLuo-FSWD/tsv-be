import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@Schema()
export class OauthUser {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  accountType: string;
}

export type OauthUserDocument = OauthUser & Document;

export const OauthUserSchema = SchemaFactory.createForClass(OauthUser);
