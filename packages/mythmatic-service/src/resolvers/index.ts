import { linkResolvers } from "./Link";
import { userResolvers } from "./User";
import { authResolvers } from "./Auth";
import { voteResolvers } from "./Vote";

const Resolvers = [linkResolvers, userResolvers, authResolvers, voteResolvers];

export default Resolvers;
