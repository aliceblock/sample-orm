import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './albums/entity/album.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app.sqlite',
      entities: [Album],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    AlbumsModule,
  ],
})
export class AppModule {}
