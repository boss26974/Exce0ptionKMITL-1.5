import { schemaComposer } from "graphql-compose";
import { sendResetEmail } from "../../lib/resetPassword";
import { PasscodeModel } from "../../models/passcode"
import { UserModel } from "../../models/user";

export const resetPassword = schemaComposer.createResolver({
    name: 'resetPassword',
    kind: 'mutation',
    type: 'String',
    args: {
        email: 'String!'
    },
    resolve: async ({ args }) => {
        const {email} = args
        const user = await UserModel.findOne({email: email})
        if (user) {
            const result = await sendResetEmail(email)
            if (result[0] === "Complete") {
                await PasscodeModel.findOneAndUpdate(
                    {_id: user._id}, //filter
                    {passcode: result[1]}, //update
                    {upsert: true} //if exist: update, if not exist: create
                    )
                return result[2]
            }
            return result
        } else {
            return "Email not found"
        }

    }
})


export const checkPasscode = schemaComposer.createResolver({
    name: "checkPasscode",
    kind: "mutation",
    type: "String",
    args: {
        userId: 'String!',
        passcode: 'String!'
    },
    resolve: async ({ args }) => {
        const { userId, passcode } = args
        const ForgotUser = await PasscodeModel.findById(userId)
        if (ForgotUser) {
            const validPassword = await ForgotUser.verifyPasscode(passcode) //bcrypt decrypt
            if (!validPassword) {
                return "Confirmation Code Incorrect"
            }
            return "Verified"
        }
    }
})