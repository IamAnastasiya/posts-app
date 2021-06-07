import {NavLink} from 'react-router-dom'
import FavoritesContext from "../store/favorites-context";
import { useContext, useState} from "react"

function Navigation ({updatePostRoute, updateAlbumsRoute}) {

    const favoritesCtx = useContext(FavoritesContext);
    const [isActiveLink, setActiveLink] = useState(true)

    const removeHandler = (title) => {
        favoritesCtx.favorites.posts.forEach((post) => {
            if (post.title === title) {
                favoritesCtx.removeFromFavorites(post.id, true)
            }
        })
        favoritesCtx.favorites.albums.forEach ((album) => {
            if (album.title === title) {
                favoritesCtx.removeFromFavorites(album.id, false)
            }
        })
    }

    const allFavorites = [].concat(favoritesCtx.favorites.posts, favoritesCtx.favorites.albums);


    return <header>
        <nav className="uk-navbar uk-navbar-container" data-uk-navbar>
            <div className="uk-navbar-left">

                <ul className="uk-navbar-nav">
                    <li
                        className={isActiveLink ? "uk-active" : ""}
                        onClick={()=>setActiveLink(true)}
                    >
                        <NavLink exact to="/" onClick = {updatePostRoute}>Posts</NavLink>
                    </li>
                    <li
                        className={isActiveLink ? "" : "uk-active"}
                        onClick={()=>setActiveLink(false)}
                    >
                        <NavLink to="/albums" onClick = {updateAlbumsRoute}>Albums</NavLink>
                    </li>
                </ul>

            </div>
            <div className="uk-navbar-right">
                <div className="uk-navbar-item">
                    <button className="uk-button" type="button" data-uk-icon="icon: heart; ratio: 2"> </button>
                    <div className="uk-width-large" data-uk-dropdown="mode: click">
                        <div className="uk-dropdown-grid uk-child-width-1-1@m" data-uk-grid>
                            <div>
                                <table className="uk-table uk-table-divider uk-table-justify">
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th className="uk-text-right">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {allFavorites.map((favorite, index) => <tr key={index}>
                                        <td >{favorite.title}</td>
                                        <td className="uk-text-right">
                                        <button
                                         className="uk-button"
                                         type="button"
                                         data-uk-icon="icon: close;"
                                         onClick={()=>removeHandler(favorite.title)}
                                         >
                                        </button>
                                        </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
}

export default Navigation;