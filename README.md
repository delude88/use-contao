# use-contao
This package provide hooks to use Contao data in React. 

### Requirements

A valid contao installation with the  [Contao Content API](https://github.com/DieSchittigs/contao-content-api-bundle) extension installed.
The project is fully written in Typescript.

## Usage

To fetch a single page, use:

    const contao = useContao({server: {host: "https://www.goodwillrun.de"}, page: "/contao/page/slug/1"});
    console.log(contao.pages.filter(p => p.url === "/contao/page/slug/1"));

To fetch more than one pages, use:

    const contao = useContao({server: {host: "https://www.goodwillrun.de"}, pages: ["/contao/page/slug/1", "/contao/page/slug/2"]});
    console.log(contao.pages);

To fetch the whole sitemap, use:

    const contao = useContao({server: {host: "https://www.goodwillrun.de"}, sitemap: true});
    console.log(contao.sitemap);

You can specify the language as set in Contao, too:

    const contao = useContao({server: {host: "https://www.goodwillrun.de", lang: "en"}, sitemap: true});
    console.log(contao.sitemap);
