import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class OAuth2 {
  @Prop()
  url: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  clientSecret: string;

  @Prop()
  scope?: string;
}

export const OAuth2Schema = SchemaFactory.createForClass(OAuth2);

@Schema()
export class Connector {
  @Prop({ required: true, unique: true })
  tenantId: string;

  @Prop({ type: 'ObjectId', ref: 'OAuth2' })
  serviceAccount?: string;

  @Prop({ type: Map, of: 'Mixed' })
  endpoints?: Map<string, any>;
}

export const ConnectorSchema = SchemaFactory.createForClass(Connector);