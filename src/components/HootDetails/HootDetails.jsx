import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";

const HootDetails = () => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);
  // console.log('hoot param id', hootId)
  const { user } = useContext(UserContext) // get back logged in user

  useEffect(() => {
    const fetchHoot = async () => {
      const fetchedHoot = await hootService.show(hootId);
      setHoot(fetchedHoot);
    };

    fetchHoot();
  }, [hootId]); // run on page load and anytime the hootId changes

  // console.log(hoot)

  const handleAddComment = async (commentFormData) => {
    console.log('commentFormData', commentFormData)
    const newComment = await hootService.createComment(hootId, commentFormData)
    setHoot({...hoot, comments: [...hoot.comments, newComment]})
  }

  if (!hoot) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author.username} posted on ${new Date(
              hoot.createdAt
            ).toLocaleDateString()}`}
          </p>
          {hoot.author._id === user._id && (
            <>
                <button>Delete</button>
                <button>Update</button>
            </>
          )}
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>

        <CommentForm handleAddComment={handleAddComment} />

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map(comment => (
            <article key={comment._id}>
                <header>
                    <p>
                        {`${comment.author.username} posted on ${new Date(comment.createdAt).toLocaleDateString()}`}
                    </p>
                </header>
                <p>{comment.text}</p>
            </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
