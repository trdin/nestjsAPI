import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { PhotosSchema } from './photos.model'
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service'

import { MulterModule } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Photo', schema: PhotosSchema }]),
    ]
    ,
    controllers: [PhotosController],
    providers: [PhotosService],
    exports: [PhotosService]
})
export class PhotosModule { }
