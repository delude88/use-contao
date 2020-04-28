import * as React from "react";
import {Context, useContext, useEffect, useState} from "react";
import {getContao} from "./util";
import {ContaoCache, ContaoDataRequest, ContaoInitialRequest, ContaoRequest} from "./model/ContaoModel";
import {PageModel} from "./model/PageModel";
import NewsReaderModel from "./model/NewsReaderModel";
import UrlModel from "./model/UrlModel";
import ModuleModel from "./model/ModuleModel";
import UserModel from "./model/UserModel";

function arrayUnique(array: any[]) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

export type {
    ContaoRequest,
    ContaoCache,
    ContaoDataRequest,
    ContaoInitialRequest,
    PageModel,
    ModuleModel,
    NewsReaderModel,
    UrlModel,
    UserModel
}

export {getContao}

export interface ContaoContext extends ContaoCache {
    fetch: (request: ContaoDataRequest) => void
}

const contaoContext: Context<ContaoContext | null> = React.createContext<ContaoContext | null>(null);

export const withContao = (Component: any) => {
    return () => (
        <contaoContext.Consumer>
            {(contao: ContaoContext | null) => (<Component contao={contao}/>)}
        </contaoContext.Consumer>
    );
};

export const ContaoConsumer = contaoContext.Consumer;

export const ContaoProvider = (props: {
    children: React.ReactNode;
    host: string;
    lang?: string;
}) => {
    const [state, setState] = useState<ContaoCache>({
        server: {
            host: props.host,
            lang: props.lang ? props.lang : null
        },
        sitemap: null,
        flatSitemap: null,
        user: null,
        urls: null,
        pages: [],
        newsreaders: [],
        modules: []
    });

    const fetch = (request: ContaoDataRequest) => {
        getContao(props.host, props.lang ? props.lang : null, request)
            .then(
                (result: ContaoCache) => {
                    // Merge
                    setState(
                        (prevState: ContaoCache) => ({
                            server: prevState.server,
                            user: prevState.user ? prevState.user : result.user,
                            sitemap: prevState.sitemap ? prevState.sitemap : result.sitemap,
                            flatSitemap: prevState.flatSitemap ? prevState.flatSitemap : result.flatSitemap,
                            urls: prevState.urls ? prevState.urls : result.urls,
                            pages: arrayUnique(prevState.pages.concat(result.pages)),
                            modules: arrayUnique(prevState.modules.concat(result.modules)),
                            newsreaders: arrayUnique(prevState.newsreaders.concat(result.newsreaders))
                        })
                    )
                }
            );
    };

    return (
        <contaoContext.Provider value={{fetch, ...state}}>
            {props.children}
        </contaoContext.Provider>
    )
};

export const useContao = (request: ContaoRequest) => {
    const context: ContaoContext | null = useContext<ContaoContext | null>(contaoContext);
    const [state, setState] = useState<ContaoCache>(() => context ? context : {
        server: {
            host: request.server ? request.server.host : "INVALID",
            lang: request.server && request.server.lang ? request.server.lang : null
        },
        sitemap: null,
        flatSitemap: null,
        user: null,
        urls: null,
        pages: [],
        newsreaders: [],
        modules: []
    });
    const [loading, setLoading] = useState<boolean>((): boolean => {
        // Is everything requested already in context available?
        if (!context)
            return true;

        return (request.module != undefined && !context.modules.some((m) => m.id === request.module)) ||
            (request.modules != undefined && (!request.modules.every(rq => context.modules.some(m => m.id === rq)))) ||
            (request.page != undefined && (!context.pages.some(p => p.url === request.page))) ||
            (request.pages != undefined && (!request.pages.every(rp => context.pages.some(p => p.url === rp)))) ||
            (request.newsreader != undefined && (!context.newsreaders.some(nr => nr.url === request.newsreader))) ||
            (request.newsreaders != undefined && (!request.newsreaders.every(rnr => context.newsreaders.some(nr => nr.url === rnr)))) ||
            (request.user != undefined && request.user && context.user === null) ||
            (request.sitemap != undefined && request.sitemap && context.sitemap === null) ||
            (request.flatSitemap != undefined && request.flatSitemap && context.flatSitemap === null) ||
            (request.urls != undefined && request.urls && context.urls === null);
    });

    useEffect(() => {
        if (loading) {
            if (!context || context && request.server && request.server !== context.server) {
                // No context or different server given, so fetch and return without using Context API
                if (!request.server)
                    return console.error("No host specified or missing Contao Provider");
                getContao(
                    request.server.host,
                    request.server.lang ? request.server.lang : null,
                    {
                        ...request
                    }
                ).then(
                    (result: ContaoCache) => {
                        setState(result);
                        setLoading(false);
                    }
                )
            } else {
                // Use Context API to fetch and return
                context.fetch(
                    request
                );
            }
        }
    }, []);

    useEffect(() => {
        if (context && state.server === context.server) {
            setState(context);
            setLoading(false);
        }
    }, [context]);

    return {
        loading,
        ...state
    };
};
