"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonsRelations = exports.commons = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const utils_1 = require("../utils");
exports.commons = (0, pg_core_1.pgTable)('commons', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
    ...utils_1.sharedTimestampConumns
}, (self) => []).enableRLS();
// ********************** Relations ********************** \\
exports.commonsRelations = (0, drizzle_orm_1.relations)(exports.commons, ({ one, many }) => ({}));
