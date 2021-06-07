import {useContext} from "react"
import {Link} from 'react-router-dom'
import FavoritesContext from "../store/favorites-context";

function PostItemGrid ({post, getPostData}) {

    const favoritesCtx = useContext(FavoritesContext);
    const itemIsFavorite = favoritesCtx.isFavorite(post.id, true);

    function toggleFavoritesHandler () {
        if (itemIsFavorite) {
            favoritesCtx.removeFromFavorites(post.id, true)
        } else {
            favoritesCtx.addToFavorite({
                id: post.id,
                title: post.title,
            }, true)
        }
    }


    return <div>
        <div>
            <div className="uk-card uk-card-default uk-margin-medium-bottom">
                <div className="uk-card-header uk-flex uk-flex-between">
                    <h3 className="uk-text-truncate">{post.title}</h3>
                    <button
                        className="uk-icon-link" data-uk-icon="heart"
                        style={itemIsFavorite ? {color: "red"} : {color: "grey"} }
                        onClick={toggleFavoritesHandler}
                    > </button>
                </div>
                <div className="uk-card-body">
                    <p className="card-text">{post.body}</p>
                </div>
                <div className="uk-card-footer">
                    <Link
                        className="uk-button uk-button-text"
                        to={`/post/${post.id}`}
                        onClick={()=>getPostData(post.title, post.id)}
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    </div>

}

export default PostItemGrid;