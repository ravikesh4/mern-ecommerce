import React, {useState, Fragment} from 'react'


const Radiobox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return prices.map((p, i) => (
        <div key={i}>
            <label className="form-check-label">
            <input onChange={handleChange} name={p} value={`${p._id}`} type="radio" className="mr-2 ml-4" />
            {p.name}</label>
        </div>
    ))
}

export default Radiobox;