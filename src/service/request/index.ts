import { getServiceEnvConfig } from '~/.env-config';
import type { ImportMetaEnv } from '#/env';

const { url, proxyPattern } = getServiceEnvConfig(import.meta.env as ImportMetaEnv);

console.log(url, proxyPattern);
