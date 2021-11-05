export type User = {
  'avatarUrl': string,
  'id': number,
  'isPro': boolean,
  'name': string,
};

export type UserFromServer = {
  'avatar_url': string,
  'id': number,
  'is_pro': boolean,
  'name': string,
}

export type Users = User[];
export type UsersFromServer = UserFromServer[];
