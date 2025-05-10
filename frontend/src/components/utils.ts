interface ITags {
    title: string
}

interface User {
    _id: string;
    username: string;
}

export interface ICard {
    _id: string,
    type: "Tweet" | "Document" | "Video" | "Link";
    tags: ITags[],
    link: string,
    title: string,
    userId: User,
    createdAt: string,
    updatedAt: string
}