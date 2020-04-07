export interface ContentElementModel {
    readonly id: number;
    readonly pid: number;
    readonly type: string;
    readonly sorting: number;
    readonly compiledHTML: string;
    readonly start: string;
    readonly stop: string;
    readonly classes: string[];

    readonly [key: string]: any
}

export const ContentElementModelFromJson = (json: any): ContentElementModel => json as ContentElementModel;
