import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestMinioClientProvider } from './providers/nest-minio.client.provider';

@Global()
@Module({
    imports: [
        ConfigService,
    ],
    providers: [NestMinioClientProvider],
    exports: [NestMinioClientProvider],
})
export class NestMinioModule {
}
