export type Topic = {
    id?: string;
    name: string;
    type: string;
    rosNodeID: string;
    content?: any;
}
  
export type ROSNode = {
    id?: string;
    name: string;
    ip: string;
};