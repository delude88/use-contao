export interface ContentElementModel {
    readonly id: number;
    readonly pid: number;
    readonly type: string;
    readonly sorting: number;
    readonly compiledHTML: string;
    readonly start: string;
    readonly stop: string;
    readonly classes: string[];

    readonly content: ContentElementModel[];

    readonly wrapper?: "start" | "stop" | "single" | "separator" | null;

    readonly [key: string]: any
}

export const ContentElementModelFromJson = (json: any): ContentElementModel => {
    let additionalValues = {};
    if (json.rsce_data) {
        additionalValues = JSON.parse(json.rsce_data);
    }

    return {
        ...json,
        content: []
    } as ContentElementModel;
};
