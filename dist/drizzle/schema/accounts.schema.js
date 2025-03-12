"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountWithRoleRelations = exports.profilesRelations = exports.accountsRelations = exports.accountWithRole = exports.profiles = exports.accounts = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const utils_1 = require("../utils");
const roles_schema_1 = require("./roles.schema");
const spaces_schema_1 = require("./spaces.schema");
exports.accounts = (0, pg_core_1.pgTable)('accounts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    uid: (0, pg_core_1.text)('uid').unique().notNull(),
    username: (0, pg_core_1.text)('username').unique().notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
    isVerified: (0, pg_core_1.boolean)('is_verified').notNull().default(false),
    isSuspended: (0, pg_core_1.boolean)('is_suspended').notNull().default(false),
    suspendedAt: (0, pg_core_1.timestamp)('suspended_at', { precision: 6, withTimezone: true }),
    ...utils_1.sharedTimestampConumns
}, (self) => [(0, pg_core_1.uniqueIndex)().on(self.uid), (0, pg_core_1.uniqueIndex)().on(self.username)]).enableRLS();
exports.profiles = (0, pg_core_1.pgTable)('profiles', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    accountId: (0, pg_core_1.integer)('account_id')
        .notNull()
        .references(() => exports.accounts.id, { onDelete: 'cascade' }),
    email: (0, pg_core_1.text)('email').notNull(),
    phoneNo: (0, pg_core_1.text)('phone_no').notNull(),
    displayNeme: (0, pg_core_1.text)('display_name').notNull().default('display name'),
    avatar: (0, pg_core_1.text)('avatar').notNull().default('default-avatar.webp'),
    bio: (0, pg_core_1.text)('bio'),
    ...utils_1.sharedTimestampConumns
}).enableRLS();
exports.accountWithRole = (0, pg_core_1.pgTable)('accounts_with_roles', {
    id: (0, pg_core_1.serial)().primaryKey(),
    accountId: (0, pg_core_1.integer)()
        .notNull()
        .references(() => exports.accounts.id),
    roleId: (0, pg_core_1.integer)()
        .notNull()
        .references(() => roles_schema_1.roles.id),
    ...utils_1.sharedTimestampConumns
}).enableRLS();
// ********************** Relations ********************** \\
exports.accountsRelations = (0, drizzle_orm_1.relations)(exports.accounts, ({ one, many }) => ({
    profile: one(exports.profiles, {
        fields: [exports.accounts.id],
        references: [exports.profiles.accountId]
    }),
    watchHistory: many(spaces_schema_1.watch)
}));
exports.profilesRelations = (0, drizzle_orm_1.relations)(exports.profiles, ({ one }) => ({
    account: one(exports.accounts, {
        fields: [exports.profiles.accountId],
        references: [exports.accounts.id]
    })
}));
exports.accountWithRoleRelations = (0, drizzle_orm_1.relations)(exports.accountWithRole, ({ one }) => ({
    account: one(exports.accounts, {
        fields: [exports.accountWithRole.accountId],
        references: [exports.accounts.id]
    }),
    role: one(roles_schema_1.roles, {
        fields: [exports.accountWithRole.roleId],
        references: [roles_schema_1.roles.id]
    })
}));
