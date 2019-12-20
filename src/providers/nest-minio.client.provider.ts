import { NestMinioClientToken, NestMinioConfigurationNamespace } from '../constants';
import { ConfigService } from '@nestjs/config';
import { NestMinioClient, NestMinioModuleConfiguration } from '../interfaces';
import { Client } from 'minio';

export const NestMinioClientProvider = {
    provide: NestMinioClientToken,
    inject: [
        ConfigService
    ],
    useFactory: (configService: ConfigService): NestMinioClient => {
        const options = configService.get<NestMinioModuleConfiguration>(NestMinioConfigurationNamespace);
        if (!options)
            throw new Error(`Missing configuration from @nestjs/config. Please register Nest-Minio configuration under the ${NestMinioConfigurationNamespace} namespace`);

        return new Client(options);
    }
};
