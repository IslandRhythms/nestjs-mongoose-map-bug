import { connect, connection } from 'mongoose';
import { OAuth2Model, ConnectorModel } from './models';

const run = async () => {
  await connect('mongodb://localhost:27017');
  await connection.dropDatabase();

  const authDoc = await OAuth2Model.create({
    url: 'Test',
    clientSecret: 'This is the populated doc result',
    clientId: 'This the client ID'
  });

  const connectorDoc = new ConnectorModel({
    tenantId: 'abcde',
    serviceAccount: authDoc._id,
    endpoints: new Map([
      ['testA', { baseUrl: 'test', OAuth: authDoc._id }],
      ['testB', { baseUrl: 'testB', OAuth: authDoc._id }]
    ])
  });
  await connectorDoc.save();

  const res = await ConnectorModel.find().populate(['serviceAccount', 'endpoints.$*.OAuth']);
  console.log('what is res', res[0], res[0].endpoints!.get('testA'), res[0].endpoints!.get('testB'));
}

run();
