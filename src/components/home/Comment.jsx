import { UserIcon } from "@heroicons/react/20/solid";
import {
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Rating } from "@mui/material";
const Comment = ({ comment, reply }) => {
  return (
    <li className={reply ? "pl-4" : ""}>
      <div className="bg-green-100 rounded p-4">
        <div className="flex gap-2 items-start">
          <div className="p-1 h-max w-max bg-green-200 text-green-500 rounded-full aspect-square">
            {/* <UserIcon className="h-5" /> */}
            <Avatar style={{ width: "30px", height: "30px" }}>
              {comment?.name.split(" ")[0].split("")[0]}
            </Avatar>
          </div>{" "}
          <h6 className="text-lg">{comment?.name}</h6>{" "}
          <small className="text-xs text-zinc-500 mb-1">
            <Rating
              name="read-only"
              value={Number(comment?.rating).toFixed(2)}
              size="small"
              readOnly
              sx={{ marginTop: "3px" }}
            />
          </small>
        </div>
        <p className="font-medium mt-2">{comment?.comment}</p>
      </div>
      <div className="flex gap-4 px-4 py-2 text-zinc-500">
        <button className="flex items-center gap-1 w-max">
          <HandThumbUpIcon className="h-4" /> Like
        </button>
        <button className="flex items-center gap-1 w-max">
          <ChatBubbleLeftIcon className="h-4" /> Reply
        </button>
        <button className="flex items-center gap-1 w-max ml-auto">
          {comment?.replies?.length ?? 0} replies
        </button>
      </div>
    </li>
  );
};

export default Comment;
