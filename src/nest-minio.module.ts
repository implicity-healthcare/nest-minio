import { DynamicModule, Global, Module } from '@nestjs/common';
import { NestMinioClientProviderToken } from './constants';
import { NestMinioClient, NestMinioModuleConfiguration } from './interfaces';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigService,
    ]
})
export class NestMinioModule {

    static init(configuration?: NestMinioModuleConfiguration): DynamicModule {
        const minioClientProvider = {
            provide: NestMinioClientProviderToken,
            inject: [ConfigService],
            useFactory: (configService: ConfigService): NestMinioClient => {
                const options = configService.get<NestMinioModuleConfiguration>('NMinio', configuration);
                return new Client(options);
            }
        };

        return {
            module: NestMinioModule,
            imports: [
                ConfigService,
            ],
            providers: [minioClientProvider],
            exports: [minioClientProvider],
        };
    }
}
