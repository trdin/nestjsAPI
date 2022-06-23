import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Photo } from './photos.model';

@Injectable()
export class PhotosService {
    constructor(
        @InjectModel('Photo') private readonly PhotoModel: Model<Photo>,
    ) { }

    async list() {
        const photos = this.PhotoModel.find()
            .populate('postedBy').sort({ timeCreated: -1 })
            .exec();
        return photos;
    }

    async show(id: string) {
        const photo = await this.PhotoModel.findOne({ _id: id }).populate('postedBy').exec();
        if (!photo) {
            throw new NotFoundException('photo not found');
        }
        return photo;
    }

    async create(req, name: string, path: string, tags: string) {
        console.log(req.session)
        var photo = new this.PhotoModel({
            name: name,
            path: path,
            postedBy: req.session.passport.user.userId,
            views: 0,
            likes: [],
            comments: [],
            timeCreated: Date.now(),
            tags: tags.split(/,/),
            reports: [],
        });

        const result = await photo.save();
        return result;
    }



}
