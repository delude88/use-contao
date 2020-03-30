import {PageModel} from "./PageModel";
import ModuleModel from "./ModuleModel";
import UserModel from "./UserModel";
import NewsReaderModel from "./NewsReaderModel";
import UrlModel from "./UrlModel";

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
