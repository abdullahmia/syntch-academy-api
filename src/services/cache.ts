// @ts-nocheck
import { Redis } from 'ioredis';

export const cacheClient = new Redis();

export const getCachedData = async (key: string) => {
  const data = await cacheClient.get(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const setCachedData = async (key: string, data: any) => {
  await cacheClient.set(key, JSON.stringify(data));
};

export const deleteCachedData = async (key: string) => {
  await cacheClient.del(key);
};

export const updateCachedData = async (key: string, data: any) => {
  await cacheClient.set(key, JSON.stringify(data));
};
