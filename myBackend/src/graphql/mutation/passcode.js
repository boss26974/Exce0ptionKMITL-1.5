import { schemaComposer } from "graphql-compose";
import { sendResetEmail } from "../../lib/resetPassword";
import { PasscodeModel } from "../../models/passcode"
import { UserModel } from "../../models/user";


const ResetPasswordPayloadOTC = schemaComposer.createObjectTC({
    name: 'ResetPasswordPayload',
    fields: {
        status: 'String!',
        message: 'String!',
    },
})

export const resetPassword = schemaComposer.createResolver({
    name: 'resetPassword',
    kind: 'mutation',
    type: ResetPasswordPayloadOTC,
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
                return { status: "Success", message: result[2] }
            }
            console.log(result)
            return { status: "Failed", message: "Send mail ERROR !" }
        } else {
            return { status: "Failed", message: "Email not found" }
        }

    }
})


const CheckPasscodePayloadOTC = schemaComposer.createObjectTC({
    name: 'CheckPasscodePayload',
    fields: {
        status: 'String!',
        message: 'String!',
    },
})

export const checkPasscode = schemaComposer.createResolver({
    name: "checkPasscode",
    kind: "mutation",
    type: CheckPasscodePayloadOTC,
    args: {
        email: 'String!',
        passcode: 'String!'
    },
    resolve: async ({ args }) => {
        const { email, passcode } = args
        const ForgotUser = await UserModel.findOne({email: email})
        const UserPasscode = await PasscodeModel.findById(ForgotUser._id)
        if (UserPasscode) {
            const validPassword = await UserPasscode.verifyPasscode(passcode) //bcrypt decrypt
            if (!validPassword) {
                return { status: "Failed", message: "Confirmation Code Incorrect" }
            }
            return { status: "Success", message: "Passcode Verified !" }

        } else if (ForgotUser) { //หาใน user เจอ แต่หาใน passcode ไม่เจอ
            return { status: "Failed", message: "Passcode Expired"}
        } else { //ไม่เจอใน user
            return { status: "Failed", message: "Email not found"}
        }
    }
})