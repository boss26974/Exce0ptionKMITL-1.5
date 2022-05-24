import { ReportTC } from "../../models/report"
import { UserTC } from "../../models/user"

export const Users = UserTC.mongooseResolvers.findMany()
export const UserId = UserTC.mongooseResolvers.findById()

//query report of user by account_id
UserTC.addRelation(
    'reports',
    {
      resolver: ReportTC.mongooseResolvers.findMany(),
      projection: { _id: 1 },
      prepareArgs: {
        filter: (user) => ({
          acc_id: user._id,
        }),
      },
})