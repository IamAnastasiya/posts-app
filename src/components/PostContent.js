import {useState, useCallback} from "react";
import CommentItem from "./CommentItem";
import {useHistory} from "react-router-dom";

function PostContent({title}) {

    const [submitted, setSubmitted] = useState(false)
    const [newComment, setNewComment] = useState({name: "", email: "", comment: ""});
    const [comments, setComments] = useState ([]);
    const history = useHistory();

    const handleGoBack = () => {
           history.goBack();
    }

    const handleSubmit = useCallback (async (e) => {
        e.preventDefault();
        const form = e.target;
        form.reset();

        const response = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: Math.random(),
                name: newComment.name,
                email: newComment.email,
                comment: newComment.comment
            })
        })
        const data = await response.json();
        const updatedComments=[...comments]
        updatedComments.push(data);
        setComments(updatedComments)
        setSubmitted(true)
    },[comments, newComment])

    return (
        <div className="uk-section">
            <div className="uk-container">
                <h1 className="uk-heading-bullet uk-margin-medium-bottom">
                    <button
                        data-uk-icon="icon:  arrow-left; ratio: 2"
                        className=".uk-button-link"
                        onClick = {handleGoBack}
                    >
                    </button>
                    <span className="uk-margin-right">{title}</span>
                    <a className="uk-text-small" href="#">Author</a>
                </h1>
                <div className="uk-article uk-dropcap uk-margin-large-bottom">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis fuga adipisci facere natus
                        quas, corporis assumenda provident perferendis commodi odio ea vel saepe, numquam reiciendis
                        tenetur rerum. Assumenda, quae, eius!
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis fuga adipisci facere natus
                        quas, corporis assumenda provident perferendis commodi odio ea vel saepe, numquam reiciendis
                        tenetur rerum. Assumenda, quae, eius!
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis fuga adipisci facere natus
                        quas, corporis assumenda provident perferendis commodi odio ea vel saepe, numquam reiciendis
                        tenetur rerum. Assumenda, quae, eius!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis fuga adipisci facere natus
                        quas, corporis assumenda provident perferendis commodi odio ea vel saepe, numquam reiciendis
                        tenetur rerum. Assumenda, quae, eius!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis fuga adipisci facere natus
                        quas, corporis assumenda provident perferendis commodi odio ea vel saepe, numquam reiciendis
                        tenetur rerum. Assumenda, quae, eius!</p>
                </div>
                <hr></hr>
                    <h3 className="uk-margin-remove-top">Comments:</h3>
                <div className="uk-comments">
                    {submitted === true && comments.map((comment) =>
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                            />
                    )}
                </div>

                    <form
                        className="uk-comment-form uk-margin-medium-top"
                        onSubmit={ (e) => handleSubmit(e)}
                    >
                        <fieldset className="uk-fieldset">
                            <legend className="uk-legend">Add Comment</legend>
                            <div className="uk-margin">
                                <input
                                    className="uk-input"
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    onChange={(e) => setNewComment(
                                        {...newComment, name: e.target.value})}
                                />
                            </div>
                            <div className="uk-margin">
                                <input
                                    className="uk-input"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    onChange={(e)=> setNewComment(
                                        {...newComment, email: e.target.value})}
                                />
                            </div>
                            <div className="uk-margin">
                                <textarea
                                    className="uk-textarea"
                                    rows="5"
                                    placeholder="Comment"
                                    required
                                    name="textarea"
                                    onChange={(e)=> setNewComment(
                                        {...newComment, comment: e.target.value})}
                                >
                                </textarea>
                            </div>
                            <div className="uk-margin">
                                <button
                                    className="uk-button uk-button-primary"
                                    type="submit"
                                >
                                    Post Comment
                                </button>
                            </div>
                        </fieldset>
                    </form>
            </div>
        </div>
        )
}

export default PostContent;
