import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

const url = `mongodb+srv://MemoriesUser42:RYplRI3sbvyjHTNi@memoriescluster.tyrwq3x.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
