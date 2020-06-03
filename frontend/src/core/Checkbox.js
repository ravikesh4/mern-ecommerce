import React, {useState} from 'react'

const Checkbox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(c) 
        const newCheckCategoryId = [...checked]

        // if currently check was not alreasy in check state > push 
        // else pull/take of 
        if(currentCategoryId === -1) {
            newCheckCategoryId.push(c)
        } else {
            newCheckCategoryId.splice(currentCategoryId, 1)
        }
        // console.log(newCheckCategoryId);
        setChecked(newCheckCategoryId)
        handleFilters(newCheckCategoryId)
    }


    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <label className="form-check-label">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(categories._id === -1)} type="checkbox" className="form-check-input" />
            {c.name}</label>
        </li>
    ))
}

export default Checkbox;