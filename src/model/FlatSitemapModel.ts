import {PageModel} from "./PageModel";

export interface FlatSitemapModel {
    readonly [path: string]: PageModel
}

export const FlatSitemapModelFromJson = (json: any): FlatSitemapModel => json as FlatSitemapModel;
