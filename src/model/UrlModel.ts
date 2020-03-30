export default interface UrlModel {
    scheme: string;
    host: string;
    port: number;
    path: string;
}

//TODO: Maybe a simple json transform will do the trick ... why the clean initialization here?!?
export const UrlModelFromJson = (json: any): UrlModel[] => {
    const array: UrlModel[] = [];
    for (const [key, value] of Object.entries(json) as [string, any]) {
        array[key] = {
            scheme: value.scheme,
            host: value.host,
            port: parseInt(value.port),
            path: value.path
        };
    }
    return array;
};

