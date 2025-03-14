import { type PgSelect } from 'drizzle-orm/pg-core';
export declare const sharedTimestampConumns: {
    createdAt: import("drizzle-orm", { with: { "resolution-mode": "import" } }).HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"created_at">>>;
    updatedAt: import("drizzle-orm").HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"updated_at">>;
};
/**
 * The function `withPagination` adds pagination functionality to a query builder in TypeScript.
 *
 * @param {T} qb - The `qb` parameter is a query builder object that is used to construct SQL queries for selecting data from a database table.
 * It is typically an instance of a query builder class that provides methods for building and executing SQL queries. In this case, the `qb` parameter is expected to be of type
 * @param {number} [page=1] - The `page` parameter represents the page number of the paginated results.
 * It defaults to 1 if not provided.
 * @param {number} [pageSize=10] - The `pageSize` parameter specifies the number of items to be displayed on each page of the paginated results.
 * In this case, the default value is set to 10, meaning that by default, each page will display 10 items.
 *
 * @returns The `withPagination` function is being returned. This function takes a query builder `qb`, a page number, and a page size as parameters.
 * It then applies pagination logic to the query builder by limiting the number of results to the specified page size and offsetting the results based on the current page number.
 */
export declare function withPagination<T extends PgSelect>(qb: T, page?: number, pageSize?: number): T;
