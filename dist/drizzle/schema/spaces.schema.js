"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genresRelations = exports.watchRelations = exports.tracksRelations = exports.titlesRelations = exports.watch = exports.genresWithTitles = exports.genres = exports.tracks = exports.titles = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const utils_1 = require("../utils");
const accounts_schema_1 = require("./accounts.schema");
exports.titles = (0, pg_core_1.pgTable)('titles', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    groupId: (0, pg_core_1.uuid)('group_id').defaultRandom(),
    name: (0, pg_core_1.text)('name').notNull(),
    subName: (0, pg_core_1.text)('sub_name'),
    description: (0, pg_core_1.text)('description'),
    keywords: (0, pg_core_1.text)('keywords'),
    poster: (0, pg_core_1.text)('poster').notNull(),
    category: (0, pg_core_1.text)('category').notNull().$type().default('anime'),
    dubbed: (0, pg_core_1.text)('dubbed').notNull().$type().default('japan'),
    status: (0, pg_core_1.text)('status').notNull().$type().default('airing'),
    studio: (0, pg_core_1.text)('studio'),
    source: (0, pg_core_1.text)('source').$type().default('etc'),
    seasonNo: (0, pg_core_1.integer)('season_no').notNull().default(1),
    link: (0, pg_core_1.text)('link'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    releasedAt: (0, pg_core_1.timestamp)('released_at', { precision: 6, withTimezone: true }),
    ...utils_1.sharedTimestampConumns
}, (self) => [
    (0, pg_core_1.index)().on(self.name),
    (0, pg_core_1.index)().on(self.category),
    (0, pg_core_1.index)().on(self.dubbed),
    (0, pg_core_1.index)().on(self.status)
]).enableRLS();
exports.tracks = (0, pg_core_1.pgTable)('tracks', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    titleId: (0, pg_core_1.uuid)('title_id')
        .notNull()
        .references(() => exports.titles.id, { onDelete: 'cascade' }),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    poster: (0, pg_core_1.text)('poster'),
    episodeNo: (0, pg_core_1.integer)('episode_no').notNull().default(1),
    duration: (0, pg_core_1.real)('duration').notNull().default(0),
    skip: (0, pg_core_1.json)('skip').$type(),
    filePath: (0, pg_core_1.text)('file_path').notNull(),
    fileType: (0, pg_core_1.text)('file_type').notNull(),
    fileSize: (0, pg_core_1.real)('file_size').notNull(),
    chunkSize: (0, pg_core_1.real)('chunk_size').notNull().default(0),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
    ...utils_1.sharedTimestampConumns
}, (self) => [(0, pg_core_1.index)().on(self.title), (0, pg_core_1.index)().on(self.episodeNo)]).enableRLS();
exports.genres = (0, pg_core_1.pgTable)('genres', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    type: (0, pg_core_1.text)('type').notNull().$type().default('public'),
    text: (0, pg_core_1.text)('text').notNull().unique(),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
    ...utils_1.sharedTimestampConumns
}).enableRLS();
exports.genresWithTitles = (0, pg_core_1.pgTable)('genres_with_titles', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    titleId: (0, pg_core_1.uuid)('title_id')
        .notNull()
        .references(() => exports.titles.id, { onDelete: 'cascade' }),
    genreId: (0, pg_core_1.integer)('genre_id')
        .notNull()
        .references(() => exports.genres.id, { onDelete: 'cascade' }),
    ...utils_1.sharedTimestampConumns
});
exports.watch = (0, pg_core_1.pgTable)('watch_history', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    accountId: (0, pg_core_1.integer)('account_id')
        .notNull()
        .references(() => accounts_schema_1.accounts.id, { onDelete: 'cascade' }),
    trackId: (0, pg_core_1.uuid)('track_id')
        .notNull()
        .references(() => exports.tracks.id, { onDelete: 'cascade' }),
    progress: (0, pg_core_1.real)('progress').notNull().default(0), // In seconds
    isCompleted: (0, pg_core_1.boolean)('is_completed').notNull().default(false),
    watchedAt: (0, pg_core_1.timestamp)('watched_at', { precision: 6, withTimezone: true }).defaultNow(),
    ...utils_1.sharedTimestampConumns
}).enableRLS();
// ********************** Relations ********************** \\
exports.titlesRelations = (0, drizzle_orm_1.relations)(exports.titles, ({ many }) => ({
    genres: many(exports.genresWithTitles),
    tracks: many(exports.tracks)
}));
exports.tracksRelations = (0, drizzle_orm_1.relations)(exports.tracks, ({ one, many }) => ({
    title: one(exports.titles, {
        fields: [exports.tracks.titleId],
        references: [exports.titles.id]
    }),
    watchHistory: many(exports.watch)
}));
exports.watchRelations = (0, drizzle_orm_1.relations)(exports.watch, ({ one }) => ({
    title: one(exports.titles, {
        fields: [exports.watch.trackId],
        references: [exports.titles.id]
    })
}));
exports.genresRelations = (0, drizzle_orm_1.relations)(exports.genres, ({ many }) => ({
    titles: many(exports.genresWithTitles)
}));
