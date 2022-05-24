import { ReportTC } from "../../models/report"

export const createReport = ReportTC.mongooseResolvers.createOne()
export const updateReport = ReportTC.mongooseResolvers.updateById()
export const removeReport = ReportTC.mongooseResolvers.removeById()