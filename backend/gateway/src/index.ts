import { createGatewayApp } from './app';
import { env } from './config';

const app = createGatewayApp();

app.listen(env.PORT, () => {
  console.log(`SAFAR gateway listening on port ${env.PORT}`);
});
