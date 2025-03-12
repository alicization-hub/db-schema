import * as accounts from './schema/accounts.schema'
import * as roles from './schema/roles.schema'
import * as spaces from './schema/spaces.schema'

export const schema = Object.freeze({
  ...accounts,
  ...roles,
  ...spaces
})

export { withPagination } from './utils'
