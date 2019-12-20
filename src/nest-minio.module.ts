import { DynamicModule, Global, Module } from '@nestjs/common';
import { NestMinioClientProviderToken, NestMinioConfigurationProviderToken } from './constants';
import { NestMinioClient, NestMinioModuleConfiguration } from './interfaces';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class NestMinioModule {

    static init(configuration?: NestMinioModuleConfiguration): DynamicModule {

        const minioConfigurationProvider = {
            provide: NestMinioConfigurationProviderToken,
            useValue: (configService: ConfigService): NestMinioModuleConfiguration => configService.get<NestMinioModuleConfiguration>('NMinio', configuration),
            inject: [ConfigService]
        };

        const minoClientProvider = {
            provide: NestMinioClientProviderToken,
            useFactory: (configuration: NestMinioModuleConfiguration): NestMinioClient => new Client(configuration),
            inject: [NestMinioConfigurationProviderToken]
        };

        return {
            module: NestMinioModule,
            providers: [minoClientProvider],
            exports: [minoClientProvider],
        };
    }
}
