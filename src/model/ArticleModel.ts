import {ContentElementModel, ContentElementModelFromJson} from "./ContentModel";

export interface ArticleModel {
    readonly url: string;
    readonly id: number;
    readonly pid: number;
    readonly alias: string;
    readonly inColumn: string;
    readonly published: boolean;
    readonly start: string;
    readonly stop: string;
    readonly content: ContentElementModel[];
    readonly compiledHTML: string;
}

export const ArticleModelFromJson = (json: any): ArticleModel => ({
    url: json.url,
    id: parseInt(json.id),
    pid: parseInt(json.pid),
    alias: json.alias,
    inColumn: json.inColumn,
    published: json.published,
    start: json.start,
    stop: json.stop,
    content: json.content ? json.content.map((j: any) => ContentElementModelFromJson(j)) : [],
    compiledHTML: json.compiledHTML
});
