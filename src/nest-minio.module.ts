import { DynamicModule, Global, Module } from '@nestjs/common';
import { NestMinioClientProviderToken } from './constants';
import { NestMinioClient, NestMinioModuleConfiguration } from './interfaces';
import { Client } from 'minio';

@Global()
@Module({})
export class NestMinioModule {

    static init(configuration: NestMinioModuleConfiguration): DynamicModule {

        /**
         * Configure minio client by connecting to the
         */
        const minoClientProvider = {
            provide: NestMinioClientProviderToken,
            useFactory: (): NestMinioClient => new Client(configuration)
        };

        return {
            module: NestMinioModule,
            providers: [minoClientProvider],
            exports: [minoClientProvider],
        };
    }
}
