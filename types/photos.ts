export declare type PhotoUrls = {
    raw: string,
    regular: string,

}
export declare type Photo = {
    id: string,
    name: string,
    urls: PhotoUrls,
    width: number,
    height: number,
}

export declare type DuotonePayload = {
    id: string,
    src: string,
    primaryColor: string,
    secondaryColor: string,
    width: number,
    height: number,
}

export declare type ColorType = {
    primaryColor: string,
    secondaryColor: string,
}
