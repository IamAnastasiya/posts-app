function SelectNumber ({filterByNumber}) {

    function handleChange(value) {
        filterByNumber(value);
    }

    return <div>
        <select
            className="uk-select uk-width-small uk-margin-left"
            onChange={(e) => handleChange(e.target.value)}
        >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
        </select>
    </div>

}

export default SelectNumber;