import { type PgSelect } from 'drizzle-orm/pg-core';
export declare const sharedTimestampConumns: {
    createdAt: import("drizzle-orm", { with: { "resolution-mode": "import" } }).HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"created_at">>>;
    updatedAt: import("drizzle-orm").HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"updated_at">>;
};
export declare function withPagination<T extends PgSelect>(qb: T, page?: number, pageSize?: number): T;
