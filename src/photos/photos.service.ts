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
        this.PhotoModel.find()
            .populate('postedBy').sort({ timeCreated: -1 })
            .exec(function (err, photos) {
                if (err) {
                    throw new NotFoundException('Could not find product.');
                }
                for (var i = photos.length - 1; i >= 0; i--) {
                    if (photos[i].reports.length > 2) {
                        photos.splice(i, 1)

                    }
                }
                return photos
            });
    }
    async create(req, name: string, path: string, tags: string) {
        var photo = new this.PhotoModel({
            name: name,
            path: path,
            postedBy: req.session.userId,
            views: 0,
            likes: [],
            comments: [],
            timeCreated: Date.now(),
            tags: tags.split(/,/),
            reports: [],
        });

        photo.save(function (err, photo) {
            if (err) {
                throw new BadRequestException('Could not save photo');
            }

            return photo;
            //return res.redirect('/photos');
        });
    }



}
