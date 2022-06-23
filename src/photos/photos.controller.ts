import {
    Controller, Body, Get, Post, UseGuards, Request, Param,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
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

    @UseGuards(AuthenticatedGuard)
    @Post()
    @UseInterceptors(FileInterceptor(
        'image', {
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

        console.log(file)
        const result = await this.PhotosService.create(req, name, file.path, tags)
        return result


    }

    @Get()
    async getPhotos() {
        return await this.PhotosService.list();
    }


    @Get(':id')
    async getPhoto(@Param('id') id: string) {
        return this.PhotosService.show(id);
    }



}
