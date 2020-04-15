import fetch from 'isomorphic-unfetch';
import {PageModel, PageModelFromJson} from "./model/PageModel";
import {ContaoCache, ContaoDataRequest} from "./model/ContaoModel";
import ModuleModel, {ModuleModelFromJson} from "./model/ModuleModel";
import UserModel, {UserModelFromJson} from "./model/UserModel";
import NewsReaderModel, {NewsReaderModelFromJson} from "./model/NewsReaderModel";
import UrlModel, {UrlModelFromJson} from "./model/UrlModel";
import {FlatSitemapModel, FlatSitemapModelFromJson} from "./model/FlatSitemapModel";
import {SitemapModel, SitemapModelFromJson} from "./model/SitemapModel";

const Routes = {
    sitemap: "/api/sitemap",
    flatSitemap: "/api/sitemap/flat",
    page: "/api/page",
    file: "/api/file",
    module: "/api/module",
    user: "/api/user",
    newsreader: "/api/newsreader",
    urls: "/api/urls"
};

const resolveLanguage = (lang?: string, extend?: boolean): string => {
    if (!lang)
        return "";
    if (extend)
        return "&lang=" + lang;
    return "?lang=" + lang;
};

const getSitemap = (server: string, lang?: string): Promise<SitemapModel | null> => {
    return fetch(server + Routes.sitemap + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => a.length > 0 ? SitemapModelFromJson(a[0]) : null)
};
const getFlatSitemap = (server: string, lang?: string): Promise<FlatSitemapModel | null> => {
    return fetch(server + Routes.flatSitemap + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => FlatSitemapModelFromJson(a));
};
const getUrls = (server: string, lang?: string): Promise<UrlModel[]> => {
    return fetch(server + Routes.urls + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => UrlModelFromJson(a[0]));
};
const getPage = (server: string, url: string, lang?: string): Promise<PageModel | undefined> => {
    return fetch(server + Routes.page + "?url=" + url + resolveLanguage(lang, true))
        .then((r: Response) => r.ok ? r.json() : null)
        .then((a: any | null) => a ? Array.isArray(a) ? PageModelFromJson(a[0]) : PageModelFromJson(a) : undefined);
};
const getModule = (server: string, id: number, lang?: string): Promise<ModuleModel | undefined> => {
    return fetch(server + Routes.module + "?id=" + id + resolveLanguage(lang, true))
        .then((r: Response) => r.json())
        .then((a: any) => a ? ModuleModelFromJson(a) : undefined);
};
const getUser = (server: string, lang?: string): Promise<UserModel | null> => {
    return fetch(server + Routes.user + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => a ? UserModelFromJson(a) : null);
};
const getNewsReader = (server: string, url: string, lang?: string): Promise<NewsReaderModel | undefined> => {
    return fetch(server + Routes.newsreader + "?url=" + url + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => a ? NewsReaderModelFromJson(a) : undefined);
};

export const getContao = async (host: string, lang: string | null, request: ContaoDataRequest) => {
    const result: ContaoCache = {
        server: {
            host: host,
            lang: lang
        },
        pages: [],
        modules: [],
        newsreaders: [],
        sitemap: null,
        flatSitemap: null,
        user: null,
        urls: null
    };

    if (request.module) {
        const module: ModuleModel | undefined = await getModule(host, request.module, lang ? lang : undefined);
        if (module)
            result.modules.push(
                module
            );
    }
    if (request.modules) {
        for (const id of request.modules) {
            const module: ModuleModel | undefined = await getModule(host, id, lang ? lang : undefined);
            if (module)
                result.modules.push(module);
        }
    }
    if (request.newsreader) {
        const newsreader: NewsReaderModel | undefined = await getNewsReader(host, request.newsreader, lang ? lang : undefined);
        if (newsreader)
            result.newsreaders.push(
                newsreader
            );
    }
    if (request.newsreaders)
        for (const url of request.newsreaders) {
            const newsreader: NewsReaderModel | undefined = await getNewsReader(host, url, lang ? lang : undefined);
            if (newsreader)
                result.newsreaders.push(newsreader);
        }
    if (request.page) {
        const page: PageModel | undefined = await getPage(host, request.page, lang ? lang : undefined);
        if (page)
            result.pages.push(
                page
            );
    }
    if (request.pages)
        for (const url of request.pages) {
            const page: PageModel | undefined = await getPage(host, url, lang ? lang : undefined);
            if (page)
                result.pages.push(page);
        }
    if (request.sitemap)
        result.sitemap = await getSitemap(host, lang ? lang : undefined);
    if (request.flatSitemap)
        result.flatSitemap = await getFlatSitemap(host, lang ? lang : undefined);
    if (request.user)
        result.user = await getUser(host, lang ? lang : undefined);
    if (request.urls)
        result.urls = await getUrls(host, lang ? lang : undefined);

    return result;
};
