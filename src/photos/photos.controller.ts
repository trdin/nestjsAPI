import {
    Controller, Body, Get, Post, UseGuards, Request,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { PhotosService } from './photos.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

MulterModule.register({
    dest: './upload',
});

@Controller('photos')
export class PhotosController {
    constructor(private readonly PhotosService: PhotosService) { }

    @Post()
    @UseInterceptors(FileInterceptor(
        'file', {
        storage: diskStorage({
            destination: './upload'
        })
    }
    ))
    async addPhoto(
        @Request() req,
        @Body('name') name: string,
        @UploadedFile() file: Express.Multer.File,
        @Body('tags') tags: string
    ) {

        console.log(file);
        return file
        //return await this.PhotosService.create(req, name, file.path, tags)
    }

    @Get()
    async getPhoto() {
        return "hello";
    }

}
