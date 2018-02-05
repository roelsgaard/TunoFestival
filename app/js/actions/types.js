export type Action =
    { type: "GET_EVENTS", events: array } |
    { type: "GET_EVENT", event: array } |
    { type: "GET_NEWS", news: array } |
    { type: "GET_ALBUMS", albums: array } |
    { type: "GET_ALBUM_IMAGES", images: array } |
    { type: "GET_IMAGE", image: {} } |
    { type: "GET_INFORMATIONS", informations: {} }

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
