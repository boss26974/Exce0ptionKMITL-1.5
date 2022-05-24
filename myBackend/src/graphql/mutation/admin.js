import { AdminTC } from "../../models/admin"

export const createAdmin = AdminTC.mongooseResolvers.createOne()
export const updateAdmin = AdminTC.mongooseResolvers.updateById()
export const removeAdmin = AdminTC.mongooseResolvers.removeById()