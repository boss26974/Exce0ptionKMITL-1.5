import { ForumTC } from "../../models/forum";

export const createForum = ForumTC.mongooseResolvers.createOne()
export const updateForum = ForumTC.mongooseResolvers.updateById()
export const removeForum = ForumTC.mongooseResolvers.removeById()