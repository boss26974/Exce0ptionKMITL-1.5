import { UserTC } from "../../models/user"

export const Users = UserTC.mongooseResolvers.findMany()
export const UserId = UserTC.mongooseResolvers.findById()