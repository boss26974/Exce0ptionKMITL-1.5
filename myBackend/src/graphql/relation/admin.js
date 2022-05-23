import { AccountTC } from "../../models/account";
import { AdminTC } from "../../models/admin";

AdminTC.addRelation(
    'account',
    {
        resolver: AccountTC.mongooseResolvers.findById(),
        projection: { _id: 1},
        prepareArgs: {
            _id: (admin) => admin.acc_id
        }
    }
)