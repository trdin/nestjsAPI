import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PhotosService } from './photos/photos.service';
import { PhotosController } from './photos/photos.controller';
import { PhotosModule } from './photos/photos.module';


@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot(
    //database url string
    "mongodb://localhost:27017/nestTest"
  ), PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }