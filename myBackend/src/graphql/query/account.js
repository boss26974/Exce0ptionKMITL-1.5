// import { UserInputError } from 'apollo-server-core'
import { schemaComposer } from 'graphql-compose'
import { AccountTC } from '../../models/account'

export const Accounts = AccountTC.mongooseResolvers.findMany()
export const AccountId = AccountTC.mongooseResolvers.findById()

//custom resolver