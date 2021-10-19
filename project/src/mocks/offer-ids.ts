import { nanoid } from 'nanoid';

const OFFERS_COUNT = 4;

export const Ids = Array(OFFERS_COUNT).fill('').map(() => nanoid());
