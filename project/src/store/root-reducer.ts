import { combineReducers } from 'redux';
import { serviceData } from './service-data/service-data';
import { serviceProcess } from './service-process/service-process';
import { userData } from './user-data/user-data';

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  Service = 'SERVICE',
}

export const rootReducer = combineReducers({
  [NameSpace.User]: userData,
  [NameSpace.Data]: serviceData,
  [NameSpace.Service]: serviceProcess,
});

export type RootState = ReturnType<typeof rootReducer>;

