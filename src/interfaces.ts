import { Client, ClientOptions } from 'minio';

export interface NestMinioModuleConfiguration extends ClientOptions {}
export interface NestMinioClient extends Client {}
