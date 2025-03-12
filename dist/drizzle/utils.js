"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedTimestampConumns = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.sharedTimestampConumns = {
    createdAt: (0, pg_core_1.timestamp)('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { precision: 6, withTimezone: true }).$onUpdate(() => new Date())
};
