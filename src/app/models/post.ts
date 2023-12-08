import {User} from './user';

export interface Post {
  id?: string,
  title: string,
  description: string,
  imageUrl: string,
  authorName: string,
  authorId: string,
  author: User
}

