
const PostComments = (comment) => {
    const {id, name, email, body} = comment.data;

    return (
        <>
            <li key={id}>
                <span><strong>Name:</strong> {name}</span>
                <div><strong>Email:</strong> {email}</div>
                <div><strong>Comment:</strong> {body}</div>
                <hr />
            </li>
        </>
    )
}

export default PostComments;