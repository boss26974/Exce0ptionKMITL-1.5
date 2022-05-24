import { ForumTC } from "../../models/forum";

export const Forums = ForumTC.mongooseResolvers.findMany()