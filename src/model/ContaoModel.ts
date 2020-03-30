import {PageModel} from "./PageModel";
import ModuleModel from "./ModuleModel";
import UserModel from "./UserModel";
import NewsReaderModel from "./NewsReaderModel";
import UrlModel from "./UrlModel";

/*
export interface ContaoRequestOptions {
    sitemap?: boolean;
    urls?: boolean;
    pages?: string[];
    modules?: number[];
    user?: boolean;
    newsreader?: string[];
    lang?: string;
}

export interface ContaoSettings extends ContaoRequestOptions {
    server?: {
        url: string;
        lang?: string;
    }
}
export interface ContaoCache {
    server: {
        url: string;
        lang: string | null;
    } | null;
    sitemap: PageModel | null;
    urls: UrlModel[] | null;
    pages: PageModel[];
    modules: ModuleModel[];
    user: UserModel | null;
    newsreader: NewsReaderModel[];
}

export interface ContaoFunctions {
    getSitemap: (lang?: string) => Promise<PageModel | null>;
    getUrls: (lang?: string) => Promise<UrlModel[] | null>;
    getPage: (url?: string, lang?: string) => Promise<PageModel | undefined>;
    getModule: (id: number, lang?: string) => Promise<ModuleModel | undefined>;
    getUser: (lang?: string) => Promise<UserModel | null>;
    getNewsreader: (url?: string, lang?: string) => Promise<NewsReaderModel | undefined>;
}

export interface ContaoAPI extends ContaoCache, ContaoFunctions {
}*/

/** NEW **/

export interface ContaoCache {
    server: {
        host: string;
        lang: string | null;
    };
    sitemap: PageModel | null;
    urls: UrlModel[] | null;
    pages: PageModel[];
    modules: ModuleModel[];
    user: UserModel | null;
    newsreaders: NewsReaderModel[];
}

export interface ContaoDataRequest {
    page?: string;
    pages?: string[];
    module?: number;
    modules?: number[];
    newsreader?: string;
    newsreaders?: string[];
    sitemap?: boolean;
    user?: boolean;
    urls?: boolean;
}
export interface ContaoInitialRequest extends ContaoDataRequest {
    server: {
        host: string;
        lang?: string;
    };
}

export interface ContaoRequest extends ContaoDataRequest {
    server?: { // Don't specify to use Provider (if available)
        host: string;
        lang?: string;
    };
}
