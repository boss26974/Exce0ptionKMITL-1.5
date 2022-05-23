import { AccountTC } from "../../models/account";
import { UserTC } from "../../models/user";

UserTC.addRelation(
    'account',
    {
        resolver: AccountTC.mongooseResolvers.findById(),
        projection: { _id: 1},
        prepareArgs: {
            _id: (user) => user.acc_id
        }
    }
)