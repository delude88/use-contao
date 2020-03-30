
export default interface NewsReaderModel {
    id: number;
    url: string;
}


export const NewsReaderModelFromJson = (json: any): NewsReaderModel => ({
    id: parseInt(json.id),
    url: json.url
});
