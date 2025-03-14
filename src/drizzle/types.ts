import { accounts, profiles } from './schema/accounts.schema'
import { permissions, roles } from './schema/roles.schema'
import { genres, titles, tracks, watch } from './schema/spaces.schema'

export type Account = typeof accounts.$inferSelect
export type Profile = typeof profiles.$inferSelect
export type Role = typeof roles.$inferSelect
export type Permission = typeof permissions.$inferSelect

export type Title = typeof titles.$inferSelect
export type Track = typeof tracks.$inferSelect
export type Genre = typeof genres.$inferSelect
export type Watch = typeof watch.$inferSelect

export type RoleAndPermission = Role & {
  permissions: Omit<Permission, 'roleId'>[]
}
export type AccountWithRoleAndPermission = Account & {
  role: RoleAndPermission
}
export type AccountProfile = Omit<Account, 'password'> & {
  profile: Omit<Profile, 'accountId'>
}
export type AccountProfileAndRole = AccountProfile & {
  role: Role
}
export type AccountRBAC = Omit<Account, 'password'> & {
  role: Role
}

export type TitleInfo = Title & {
  genres: Genre[]
  tracks: Omit<Track, 'titleId'>[]
}
export type TrackInfo = Track & {
  title: Omit<TitleInfo, 'tracks'>
}

export type WatchHistory = Omit<Watch, 'accountId' | 'trackId'> & {
  account: AccountProfile
  track: TrackInfo
}

export type AccountValues = Partial<Omit<Account, 'id'>>
export type ProfileValues = Partial<Omit<Profile, 'id'>>
export type RoleValues = Partial<Omit<Role, 'id'>>
export type PermissionValues = Partial<Omit<Permission, 'id'>>

export type TitleValues = Partial<Omit<Title, 'id'>>
export type TrackValues = Partial<Omit<Track, 'id'>>
export type WatchValues = Partial<Omit<Watch, 'id'>>
export type GenreValues = Partial<Omit<Genre, 'id'>>
