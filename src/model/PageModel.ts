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
}

export const PageModelFromJson = (json: any): PageModel => ({
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
    subPages: json.subPages.map((j: any) => PageModelFromJson(j))
});
