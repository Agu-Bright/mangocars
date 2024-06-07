import PageLayout from "../components/App/PageLayout";
import Comment from "../components/home/Comment";
import { comments } from "../data";

const Comments = ({ f7router }) => {
	return (
		<PageLayout title={"Comments for John Doe's Motors"} f7router={f7router}>
			<ul className="p-4">
				{comments.map((comment, i) => (
					<>
						<Comment comment={comment} key={i} />
						{comment?.replies?.map((reply, i) => (
							<Comment comment={reply} reply={true} key={i} />
						))}
					</>
				))}
			</ul>
		</PageLayout>
	);
};

export default Comments;
