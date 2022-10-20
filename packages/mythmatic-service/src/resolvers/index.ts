import { linkResolvers } from "./Link";
import { userResolvers } from "./User";
import { authResolvers } from "./Auth";
import { voteResolvers } from "./Vote";
import { renderTaskResolvers } from "./RenderTask";

const Resolvers = [
  linkResolvers,
  userResolvers,
  authResolvers,
  voteResolvers,
  renderTaskResolvers,
];

export default Resolvers;
