export interface ServerUser {
    avatar: any,
    collectionId: string,
    collectionName: string,
    created: string,
    email: string,
    emailVisibility: boolean,
    id: string,
    name: string,
    updated: string,
    username: string,
    verified: boolean,
    token: string,
}

export const emptyServerUser: ServerUser = {
    id: "",
    email: "",
    avatar: undefined,
    collectionId: "",
    collectionName: "",
    created: "",
    emailVisibility: false,
    name: "",
    updated: "",
    username: "",
    verified: false,
    token: ""
};