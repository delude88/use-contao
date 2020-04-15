import {PageModel} from "./PageModel";
import ModuleModel from "./ModuleModel";
import UserModel from "./UserModel";
import NewsReaderModel from "./NewsReaderModel";
import UrlModel from "./UrlModel";
import {FlatSitemapModel} from "./FlatSitemapModel";
import {SitemapModel} from "./SitemapModel";

export interface ContaoCache {
    server: {
        host: string;
        lang: string | null;
    };
    sitemap: SitemapModel | null;
    flatSitemap: FlatSitemapModel | null;
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
    flatSitemap?: boolean;
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
