import {ContentElementModel, ContentElementModelFromJson} from "./ContentModel";

export interface ArticleModel {
    readonly url: string;
    readonly id: number;
    readonly pid: number;
    readonly alias: string;
    readonly inColumn: string;
    readonly published: boolean;
    readonly sorting: number;
    readonly start: string;
    readonly stop: string;
    readonly content: ContentElementModel[];
    readonly compiledHTML: string;
}

export const ArticleModelFromJson = (json: any): ArticleModel => {
    const content: any[] = json.content;

    const array: ContentElementModel[] = [];
    if (content) {
        const helperArray = [];

        for (let i = 0; i < content.length; i++) {
            const currentElement: ContentElementModel = ContentElementModelFromJson(content[i]);

            switch (currentElement.wrapper) {
                case 'start':
                    helperArray.push(currentElement);
                    break;
                case 'stop':
                    const container: ContentElementModel = helperArray.pop();
                    if (helperArray.length > 0) {
                        const parentContainer: ContentElementModel = helperArray[helperArray.length - 1];
                        parentContainer.content.push(container);
                        parentContainer.content.push(currentElement);
                    } else {
                        array.push(container);
                        array.push(currentElement);
                    }
                    break;
                default:
                    if (helperArray.length > 0) {
                        const container = helperArray[helperArray.length - 1];
                        container.content.push(currentElement);
                    } else {
                        array.push(currentElement);
                    }
                    break;
            }
        }

    }

    return {
        ...json,
        id: parseInt(json.id),
        pid: parseInt(json.pid),
        content: array
    }
};
