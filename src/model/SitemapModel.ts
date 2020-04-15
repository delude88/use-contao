import {PageModel, PageModelFromJson} from "./PageModel";

export type SitemapModel = PageModel;

export const SitemapModelFromJson = (json: any): SitemapModel => PageModelFromJson(json);
