import { Inject } from '@nestjs/common';
import { NestMinioClientProviderToken } from '../constants';

export const Minio = () => Inject(NestMinioClientProviderToken);
