import { model } from 'mongoose';
import { OAuth2Schema, ConnectorSchema } from './schema';

export const OAuth2Model = model('OAuth2', OAuth2Schema);
export const ConnectorModel = model('Connector', ConnectorSchema);