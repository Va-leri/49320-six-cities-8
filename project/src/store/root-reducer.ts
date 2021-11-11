import { combineReducers } from 'redux';
import { serviceData } from './service-data/service-data';
import { serviceProcess } from './service-process/service-process';
import { userData } from './user-data/user-data';

export enum NameSpace {
  user = 'USER',
  data = 'DATA',
  service = 'SERVICE',
}

export const rootReducer = combineReducers({
  [NameSpace.user]: userData,
  [NameSpace.data]: serviceData,
  [NameSpace.service]: serviceProcess,
});

export type RootState = ReturnType<typeof rootReducer>;

