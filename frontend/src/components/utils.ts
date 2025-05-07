interface ITags {
    title: string
}

export interface ICard {
    _id: string,
    type: "Tweet" | "Document" | "Video" | "Link";
    tags: ITags[],
    link: string,
    title: string,
    userId: string,
    createdAt: string,
    updatedAt: string
}