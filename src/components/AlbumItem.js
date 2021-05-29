import {useContext} from "react"
import FavoritesContext from "../store/favorites-context";

function AlbumItem ({title, id}) {

    const favoritesCtx = useContext(FavoritesContext);
    const itemIsFavorite = favoritesCtx.isFavorite(id, false);

    function toggleFavoritesHandler () {
        if (itemIsFavorite) {
            favoritesCtx.removeFromFavorites(id, false)
        } else {
            favoritesCtx.addToFavorite({
                id: id,
                title: title
            }, false)
        }
    }

    return <div>
    <div className="uk-card uk-card-default uk-margin-medium-bottom uk-light">
        <img src="https://picsum.photos/600/400" className="uk-overlay-primary uk-position-cover" alt="img"/>
        <canvas width="600" height="400"> </canvas>
        <div className="uk-overlay-primary uk-position-cover"> </div>
        <div className="uk-overlay uk-overlay-primary uk-position-bottom">
            <p>
                {title}
            </p>
        </div>

        <div className="uk-position-top-right uk-overlay">
            <button
                data-uk-icon="icon: heart; ratio: 2"
                style={itemIsFavorite ? {color: "white"} : {color: "grey"} }
                onClick={toggleFavoritesHandler}
            >
            </button>
        </div>
    </div>
    </div>
}

export default AlbumItem;