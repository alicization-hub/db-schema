import * as accounts from './schema/accounts.schema'
import * as roles from './schema/roles.schema'
import * as spaces from './schema/spaces.schema'

export const schema = {
  ...accounts,
  ...roles,
  ...spaces
}
