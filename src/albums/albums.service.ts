import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Album } from './entity/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async createOrUpdate(album: Album): Promise<Album> {
    return await this.albumRepository.save(album);
  }

  async findOne(id: number): Promise<Album> {
    return await this.albumRepository.findOne({ id: id });
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.albumRepository.delete({ id: id });
  }
}
