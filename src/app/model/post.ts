export interface Post {
    id: number,
    timestamp: string,
    username: string,
    title: string,
    subtitle: string,
    content: string,
    author: {
        username: string,
    }
}
