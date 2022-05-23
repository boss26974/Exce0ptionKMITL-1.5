import { AccountTC } from "../../models/account";

export const createAccount = AccountTC.mongooseResolvers.createOne()