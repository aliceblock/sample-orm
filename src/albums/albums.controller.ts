import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entity/album.entity';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Post() // POST /albums
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() newAlbum: CreateAlbumDto): Promise<Album> {
    const album = new Album();
    album.title = newAlbum.title;
    album.remark = newAlbum.remark;
    return await this.albumService.createOrUpdate(album);
  }

  @Get() // GET /albums
  async findAlbums(): Promise<Album[]> {
    return await this.albumService.findAll();
  }

  @Get(':id') // GET /albums/123
  async findAlbum(@Param('id') id: number): Promise<Album> {
    return await this.albumService.findOne(id);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') id: number,
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumService.findOne(id);
    album.title = createAlbumDto.title || album.title;
    album.remark = createAlbumDto.remark || album.remark;
    return await this.albumService.createOrUpdate(album);
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: number): Promise<any> {
    await this.albumService.delete(id);
    return { success: true };
  }
}
