import {createContext, useState} from "react";

const FavoritesContext = createContext ({
    favorites: {
        posts: [],
        albums: []
    },
    totalFavorites: 0,
    addToFavorite: (favoriteItem) => {},
    removeFromFavorites: (itemId) => {},
    isFavorite: (itemId) => {}
});


export function FavoritesContextProvider (props) {

    function addFavoriteHandler(favoriteItem, isPost) {
        if (isPost) {
            setUserFavoritesPosts((prevUserFavorites) => {
                return prevUserFavorites.concat(favoriteItem)
            });
        } else {
            setUserFavoritesAlbums((prevUserFavorites) => {
                return prevUserFavorites.concat(favoriteItem)
            });
        }
    }

    function removeFavoriteHandler(id, isPost) {
        if (isPost) {
            setUserFavoritesPosts((prevUserFavorites) => {
                return prevUserFavorites.filter(item => item.id !== id)
            });
        } else {
            setUserFavoritesAlbums((prevUserFavorites) => {
                return prevUserFavorites.filter(item => item.id !== id)
            });
        }
    }

    function isFavoriteItem(ItemId, isPost) {
        if (isPost) {
            return userFavoritesPosts.some(item => item.id === ItemId);
        } else {
            return userFavoritesAlbums.some(item => item.id === ItemId);
        }
     }

    const [userFavoritesPosts, setUserFavoritesPosts] = useState([]);
    const [userFavoritesAlbums, setUserFavoritesAlbums] = useState([]);

    const context = {
        favorites: {
            posts: userFavoritesPosts,
            albums: userFavoritesAlbums
        },
        totalFavorites: userFavoritesPosts.length,
        addToFavorite: addFavoriteHandler,
        removeFromFavorites: removeFavoriteHandler,
        isFavorite: isFavoriteItem
    }

    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext;