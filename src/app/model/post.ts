export interface Post {
    id: number,
    timestamp: string,
    username: string,
    title: string,
    subtitle: string,
    content: string,
    respondsTo: {
        id: number
    }
    author: {
        id: number,
        username: string,
    }
    comments: [
        {
            content: string;
        }
    ]
}
