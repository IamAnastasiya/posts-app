import React, {useState, useEffect, useCallback} from 'react';
import {Route, Switch} from 'react-router-dom'
import "./index.css"

import AlbumsPage from "./pages/AlbumsPage";
import AllPostsPage from "./pages/AllPostsPage";
import Navigation from "./components/Navigation";
import PostContent from "./components/PostContent";
import {useHistory} from "react-router-dom";
import { FavoritesContextProvider } from "./store/favorites-context";

function App() {
    const history = useHistory();
    const [posts, setPosts] = useState([])
    const [albums, setAlbums] = useState([])
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filterLimit, setFilterLimit] = useState (6);
    const [orderValue, setOrderValue] = useState ("asc")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPostsCount, setTotalPostsCount] = useState (0);
    const [totalAlbumsCount, setTotalAlbumsCount] = useState (0);
    const [searchInput, setSearchInput] = useState ("");
    const [postData, setPostData] = useState ("");
    const [currentPostId, setCurrentPostId] = useState ("");

    const initialRoute = `posts?_page=${currentPage}&start=0&_limit=${filterLimit}&_sort=id&_order=${orderValue}`
    const [route, setRoute] = (useState(initialRoute));


    const fetchPosts = useCallback(async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${route}`, {
            mode: "cors"
        });
        const data = await response.json();
        const totalCount = response.headers.get('X-Total-Count')
        setTotalPostsCount(totalCount)
        setPosts(data);
    }, [route]);

    const fetchAlbums = useCallback(async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/albums?_page=${currentPage}&start=0&_limit=${filterLimit}`,
            {mode: "cors"});
        const data = await response.json();
        const totalCount = response.headers.get('X-Total-Count')
        setTotalAlbumsCount(totalCount)
        setAlbums(data);
    }, [currentPage, filterLimit]);

    useEffect(() => {
        fetchPosts().then(() => {
                setIsLoaded(true)
            },
            (error) => {setIsLoaded(true);
                setError(error);
        })}, [fetchPosts]);

    useEffect(() => {
        fetchAlbums().then(() => {
                setIsLoaded(true)
            },
            (error) => {setIsLoaded(true);
                setError(error);
            })}, [fetchAlbums]);


    function filterByNumber (filterNumberValue)  {
        setFilterLimit(filterNumberValue)
    }

    const sortOrder = (sortOrderValue) => {
        setOrderValue (sortOrderValue);
    }

    const setPage = (pageNumber) => {
        setCurrentPage (pageNumber);
    }

    useEffect(() => {
        setRoute(`posts?_page=${currentPage}&start=0&_limit=${filterLimit}&_sort=id&_order=${orderValue}`)
        }, [filterLimit, orderValue, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [filterLimit, orderValue])


    const loadMoreData =() => {
        setFilterLimit(filterLimit * 2)
    }

    const searchTerm =  (searchValue) => {
        setSearchInput(searchValue);
    }

    useEffect(() => {
        searchInput !== "" ?
            setRoute (`posts?q=${searchInput}`) :
            setRoute(`posts?_page=${currentPage}&start=0&_limit=${filterLimit}&_sort=id&_order=${orderValue}`)
    }, [currentPage, filterLimit, orderValue, searchInput])

    const updatePostRoute = useCallback(() => {
        setFilterLimit(6)
        setOrderValue("asc")
        setRoute(initialRoute)
        setCurrentPage(1)
        history.replace("/");
    }, [initialRoute, history ])

    useEffect(() => {
        setSearchInput ("")
    }, [updatePostRoute])

    const updateAlbumsRoute = () => {
        setCurrentPage(1)
        setFilterLimit(6)
    }

    const getPostData = (value, id) => {
        setPostData(value)
        setCurrentPostId (id)
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <FavoritesContextProvider>
                <div className="App">
                    <Navigation
                        updatePostRoute={updatePostRoute}
                        updateAlbumsRoute={updateAlbumsRoute}
                        allPosts={posts}
                    />
                    <Switch>
                        <Route path="/" exact>
                            <AllPostsPage
                                allPosts={posts}
                                sortOrder={sortOrder}
                                filterByNumber={filterByNumber}
                                totalPostsNumber={totalPostsCount}
                                setPage={setPage}
                                currentPage={currentPage}
                                filterLimit={filterLimit}
                                loadMorePosts={loadMoreData}
                                searchTerm={searchTerm}
                                isLoaded={isLoaded}
                                getPostData={getPostData}
                            />
                        </Route>
                        <Route path={`/post/${currentPostId}`}>
                            <PostContent title={postData} id={currentPostId}/>
                        </Route>
                        <Route path="/albums">
                            <AlbumsPage
                            albums={albums}
                            totalAlbumsCount={totalAlbumsCount}
                            filterLimit={filterLimit}
                            setPage={setPage}
                            currentPage={currentPage}
                            loadMoreAlbums={loadMoreData}
                            />
                        </Route>
                    </Switch>
                </div>
            </FavoritesContextProvider>
        );
    }
}

export default App;
