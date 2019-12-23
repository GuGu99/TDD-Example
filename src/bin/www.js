import app from '../index';
import syncDb from './sync-db';

syncDb().then(_ => {
  console.log('Sync database!');
  app.listen(3000, () => {
    console.log(`Server is Running!`);
  });
});
