import express, {Request, Response} from 'express';
import {register} from 'prom-client';
import KeyCloakRouter from './routes/keycloakRouter';


const app = express(); 

app.get('/',  async (req : Request, res : Response)  => {
  try {
    res.set('Content-Type', register.contentType);
    res.send("hello world")
    res.end(await register.metrics());
  } catch (ex) {
     res.status(500).end(ex);
  }
});

app.listen(5000, () => console.log('Server Running')); 

app.use(KeyCloakRouter)

export default app;

