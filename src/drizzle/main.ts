import { type PgSelect } from 'drizzle-orm/pg-core'

import * as accounts from './schema/accounts.schema'
import * as roles from './schema/roles.schema'
import * as spaces from './schema/spaces.schema'

export const schema = Object.freeze({
  ...accounts,
  ...roles,
  ...spaces
})

export function withPagination<T extends PgSelect>(qb: T, page: number = 1, pageSize: number = 10) {
  return qb.limit(pageSize).offset((page - 1) * pageSize)
}
