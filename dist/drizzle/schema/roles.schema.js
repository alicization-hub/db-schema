"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsRelations = exports.rolesRelations = exports.permissions = exports.roles = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const utils_1 = require("../utils");
const accounts_schema_1 = require("./accounts.schema");
exports.roles = (0, pg_core_1.pgTable)('roles', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    tier: (0, pg_core_1.text)('tier').notNull().$type().default('user'),
    name: (0, pg_core_1.text)('name').unique().notNull().default('user'),
    description: (0, pg_core_1.text)('description'),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
    ...utils_1.sharedTimestampConumns
}, (self) => [(0, pg_core_1.index)().on(self.tier), (0, pg_core_1.uniqueIndex)().on(self.name)]).enableRLS();
exports.permissions = (0, pg_core_1.pgTable)('permissions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    roleId: (0, pg_core_1.integer)('role_id')
        .notNull()
        .references(() => exports.roles.id, { onDelete: 'cascade' }),
    action: (0, pg_core_1.text)('action').notNull().$type(),
    resource: (0, pg_core_1.text)('resource').notNull().$type(),
    conditions: (0, pg_core_1.json)('conditions').$type(),
    description: (0, pg_core_1.text)('description'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    ...utils_1.sharedTimestampConumns
}, (self) => [(0, pg_core_1.index)().on(self.action), (0, pg_core_1.index)().on(self.resource)]).enableRLS();
// ********************** Relations ********************** \\
exports.rolesRelations = (0, drizzle_orm_1.relations)(exports.roles, ({ many }) => ({
    accounts: many(accounts_schema_1.accountWithRole),
    permissions: many(exports.permissions)
}));
exports.permissionsRelations = (0, drizzle_orm_1.relations)(exports.permissions, ({ one }) => ({
    role: one(exports.roles, {
        fields: [exports.permissions.roleId],
        references: [exports.roles.id]
    })
}));
