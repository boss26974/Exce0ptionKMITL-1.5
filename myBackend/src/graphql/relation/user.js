import { ReportTC } from "../../models/report";
import { UserTC } from "../../models/user";

//query report of user by complainer_id
UserTC.addRelation(
    'reports',
    {
      resolver: ReportTC.mongooseResolvers.findMany(),
      projection: { _id: 1 },
      prepareArgs: {
        filter: (user) => ({
            complainer_id: user._id,
        }),
      },
})