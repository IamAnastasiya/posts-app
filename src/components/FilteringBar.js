import SelectNumber from "./SelectNumber";
import SelectOrder from "./SelectOrder";
import useDebounce from "./useDebounce";
import { useState, useEffect } from "react"


function FilteringBar ({sortOrder, filterByNumber, searchTerm, setDisplayList}) {
    const [term, setTerm] = useState("")
    const [isListBtnActive, setListBtnActive] = useState(false)

    const handleGridClick = () => {
        setListBtnActive(false)
        setDisplayList(false)
    }

    const handleListClick = () => {
        setListBtnActive(true)
        setDisplayList(true)
    }

    const debouncedSearchTerm = useDebounce(term, 2000);

    useEffect(() => {
        searchTerm(debouncedSearchTerm)
    }, [searchTerm, debouncedSearchTerm])

    return <div className="uk-container">
    <div className="uk-margin-medium-bottom uk-flex uk-flex-between">

        <form className="uk-search uk-search-default uk-width-large ">
            <div className="uk-inline">
                <button className="uk-form-icon" data-uk-icon="icon: search" />
                <input
                    className="uk-input"
                    type="search"
                    placeholder="Search..."
                    onChange={(e) => setTerm (e.currentTarget.value)}
                />
            </div>
        </form>

        <div className="uk-flex">
            <SelectOrder sortOrder={sortOrder}/>
            <SelectNumber filterByNumber={filterByNumber}/>


            <div className="uk-button-group uk-margin-left">
                <button
                    className={!isListBtnActive ?
                        "uk-button uk-button-default uk-active" :
                        "uk-button uk-button-default"}
                    onClick={handleGridClick}
                >
                    <span data-uk-icon="icon:  grid"> </span>
                </button>
                <button
                    className={isListBtnActive ?
                        "uk-button uk-button-default uk-active" :
                        "uk-button uk-button-default"}
                    onClick={handleListClick}
                >
                    <span data-uk-icon="icon:  list"> </span>
                </button>
            </div>
        </div>


        </div>
    </div>

}

export default FilteringBar;