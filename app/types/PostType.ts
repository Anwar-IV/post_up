export type PostType = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
  comments: {
    createdAt: string;
    id: string;
    text: string;
    postId: string;
    userId: string;
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    };
  }[];
};
