import { useState } from "react";
import { useDispatch } from "react-redux";

import { thunkEditMap } from "../../../store/maps";

const EditMapForm = ({ map, setEditName }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(map.name);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];

        if (name.length === 0) {
            errors.push('Name for a template cannot be left blank');
        }
        if (errors.length > 0) {
            console.log(errors);
        } else {
            await dispatch(thunkEditMap(map.id, name));
            setEditName(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            >
            </input>
        </form>
    );
}

export default EditMapForm;
