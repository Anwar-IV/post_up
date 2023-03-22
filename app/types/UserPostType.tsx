export type UserPost = {
  id: string;
  name: string;
  email: string;
  image: string;
  posts: {
    id: string;
    createdAt: string;
    title: string;
    userId: string;
    likes: {
      postId: string;
      userId: string;
    }[];
    comments?: {
      id: string;
      text: string;
      postId: string;
      userId: string;
      createdAt: string;
    }[];
  }[];
};
