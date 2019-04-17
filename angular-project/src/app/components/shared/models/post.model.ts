export interface Post {
    _id: string;
    title: string;
    author: string;
    image: string;
    content: string;
    _acl: { creator: string };
}