import { AdminTC } from "../../models/admin"

export const Admins = AdminTC.mongooseResolvers.findMany()
export const AdminId = AdminTC.mongooseResolvers.findById()