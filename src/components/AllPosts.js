import PostItemGrid from "./PostItemGrid";
import PostItemList from "./PostItemList";

function AllPosts ({allPosts, listClicked, getPostData}) {

    if (allPosts.length === 0) {
        return <div className="search-message">We found no results that closely match your search.</div>
    } else {
        return (<div className="uk-container">
            <div className={listClicked ?
                "uk-grid uk-child-width-1-2@s uk-child-width-1-2@m"
                : "uk-grid uk-child-width-1-2@s uk-child-width-1-3@m"}
            >
                {allPosts.map((post) =>
                    listClicked ? <PostItemList
                            key={post.id}
                            post={post}
                            allPosts={allPosts}
                            getPostData={getPostData}
                        /> :
                        <PostItemGrid
                            key={post.id}
                            post={post}
                            allPosts={allPosts}
                            getPostData={getPostData}
                        />
                )}
            </div>
        </div>)
    }
}

export default AllPosts;