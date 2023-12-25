// @ts-nocheck
import { Redis } from 'ioredis';
import config from '../config';

export const cacheClient = new Redis();

export const getCachedData = async (key: string) => {
  const data = await cacheClient.get(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

const cacheAge = config.redis.age || 60 * 60 * 24;

export const setCachedData = async (key: string, data: any) => {
  await cacheClient.set(key, JSON.stringify(data), 'EX', cacheAge);
};

export const deleteCachedData = async (key: string) => {
  await cacheClient.del(key);
};

export const updateCachedData = async (key: string, data: any) => {
  await cacheClient.set(key, JSON.stringify(data), 'EX', cacheAge);
};
