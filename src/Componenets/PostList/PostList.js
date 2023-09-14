import classes from './PostList.module.css'
import SinglePost from '../SinglePost/SinglePost'

export default function PostList({ posts }) {
    return (
        <div className={classes.postList}>
            <h4>Active posts</h4>
            {
                posts.map(post => {
                    return (
                        <div key={post.id}>
                            <SinglePost post={post} />
                        </div>
                    )
                })
            }
        </div>
    )
}