export declare type photoUrls = {
    raw: string,
    regular: string,
    
}
export declare type Photo = {
    id: string,
    name: string,
    urls: photoUrls ,
    width: number,
    height: number,
}

export declare type duotonePayload = {
    id: string,
    src: string,
    primaryColor: string,
    secondaryColor: string,
    width: number,
    height: number,
}

