import { Inject } from '@nestjs/common';
import { NestMinioClientToken } from '../constants';

export const Minio = () => Inject(NestMinioClientToken);
