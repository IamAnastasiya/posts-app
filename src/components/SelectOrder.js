function SelectOrder ({sortOrder}) {

    function handleChange(value) {
        sortOrder(value);
    }

    return <div>
        <select
            className="uk-select uk-width-small uk-margin-auto-left"
            onChange={(e) => handleChange(e.target.value)}
        >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
        </select>
    </div>



}

export default SelectOrder;