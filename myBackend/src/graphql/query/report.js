import { ReportTC } from "../../models/report"

export const Reports = ReportTC.mongooseResolvers.findMany()
export const ReportId = ReportTC.mongooseResolvers.findById()