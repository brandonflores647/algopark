import { useState } from "react";
import { useDispatch } from "react-redux";

import { thunkEditMap } from "../../../store/maps";

import classes from './MapTools.module.css';

const EditMapForm = ({ map, setEditName }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(map.name);
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];

        if (name.length === 0) {
            errors.push('Name for a template cannot be left blank');
        }
        if (name.length > 20) {
            errors.push('Name for a template cannot be more than 20 characters');
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
        } else {
            await dispatch(thunkEditMap(map.id, name));
            setValidationErrors([]);
            setEditName(false);
        }
    }

    return (
        <div className={classes.editNameContainer}>
            {validationErrors.length>0?
                <ul style={{listStyle:'none',padding:'0'}}>
                    {validationErrors.map(err => {
                        return <li key={err} className={classes.error}>{err}</li>
                    })}
                </ul>
            : null}
            <form onSubmit={handleSubmit}>
                <input
                    name='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        border:(validationErrors.length>0 ?
                            '1px solid #e33d3d':'1px solid rgb(221, 221, 221)')
                        }}
                    className={classes.editNameInput}
                >
                </input>
                <button className={classes.submitEditNameButton}>Submit</button>
            </form>
        </div>
    );
}

export default EditMapForm;
