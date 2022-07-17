import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { pickBy } from 'lodash';

type QueryOptions = {
  query: ParsedUrlQuery;
};

type RouterOptions = {
  router: NextRouter;
};

class UrlQueryService {
  getOne(name: string, { query }: QueryOptions): string | undefined {
    const routerQuery = query[name];

    return Array.isArray(routerQuery) ? routerQuery[0] : routerQuery;
  }

  getOneAsNumber(
    queryName: string,
    queryOption: QueryOptions,
  ): number | undefined {
    const resultAsString = this.getOne(queryName, queryOption);

    return resultAsString ? +resultAsString : undefined;
  }

  getOneAsBoolean(
    name: string,
    queryOptions: QueryOptions,
  ): boolean | undefined {
    const resultAsString = this.getOne(name, queryOptions);

    return resultAsString
      ? resultAsString === 'true'
        ? true
        : false
      : undefined;
  }

  getOneOrManyAsNumber(name: string, queryOptions: QueryOptions) {
    const routerQuery = queryOptions.query[name];

    if (!routerQuery) {
      return undefined;
    }

    return Array.isArray(routerQuery)
      ? routerQuery.map(item => +item)
      : +routerQuery;
  }

  getPaginated(queryOptions: QueryOptions) {
    const pageSizeAsString = this.getOne('pageSize', queryOptions);

    const pageSize = pageSizeAsString ? +pageSizeAsString : 50;

    const currentPageAsString = this.getOne('currentPage', queryOptions);

    const currentPage = currentPageAsString ? +currentPageAsString : 1;

    return { pageSize, currentPage };
  }

  setUrlQuery(queryValues: { [k: string]: any }, { router }: RouterOptions) {
    router.push(
      {
        query: pickBy(
          {
            ...router.query,
            ...queryValues,
          },
          value => value !== undefined && value !== '',
        ),
      },
      undefined,
      { shallow: true },
    );
  }

  replaceUrlQuery(
    queryValues: { [k: string]: any },
    { router }: RouterOptions,
  ) {
    router.replace(
      {
        query: pickBy(
          {
            ...router.query,
            ...queryValues,
          },
          value => value !== undefined && value !== '',
        ),
      },
      undefined,
      { shallow: true },
    );
  }
}

export const urlQueryService = new UrlQueryService();
