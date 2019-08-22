import { DynamicModule, Global, Module } from '@nestjs/common';
import { NestMinioClientProviderToken } from './constants';
import * as Minio from 'minio';
import { IMinioModuleConfiguration } from './interfaces';

@Global()
@Module({})
export class NestMinioModule {

    static init(configuration: IMinioModuleConfiguration): DynamicModule {

        /**
         * Configure minio client by connecting to the
         */
        const minoClientProvider = {
            provide: NestMinioClientProviderToken,
            useFactory: (): Minio.Client => new Minio.Client(configuration)
        };

        return {
            module: NestMinioModule,
            providers: [minoClientProvider],
            exports: [minoClientProvider],
        };
    }
}
