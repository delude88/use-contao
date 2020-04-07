import {ArticleModel, ArticleModelFromJson} from "./ArticleModel";

export interface ColumnModel {
    column: string;
    articles: ArticleModel[]
}

export interface PageModel {
    readonly url: string;
    readonly id: number;
    readonly alias: string;
    readonly isPublic: boolean;
    readonly description: string;
    readonly pageTitle: string;
    readonly rootId: number;
    readonly rootSorting: number;
    readonly sorting: number;
    readonly start: string;
    readonly stop: string;
    readonly title: string;
    readonly tstamp: number;
    readonly subPages: PageModel[];
    readonly columns: ColumnModel[];
}

export const PageModelFromJson = (json: any): PageModel => {
    return {
        url: json.url,
        id: parseInt(json.id),
        alias: json.alias,
        isPublic: json.isPublic,
        description: json.description,
        pageTitle: json.pageTitle,
        rootId: parseInt(json.rootId),
        rootSorting: parseInt(json.rootSorting),
        sorting: json.sorting,
        start: json.start,
        stop: json.stop,
        title: json.title,
        tstamp: parseInt(json.tstamp),
        subPages: json.subPages ? json.subPages.map((j: any) => PageModelFromJson(j)) : [],
        columns: json.articles ? Object.entries(json.articles).map((entry: [string, any]) => ColumnFromJson(entry[0], entry[1])) : []
    }
};

const ColumnFromJson = (column: string, json: any): ColumnModel => {
    return {
        column: column,
        articles: json.map((j: any) => ArticleModelFromJson(j))
    };
};
