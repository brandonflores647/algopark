import { useState } from "react";

const EditMapForm = ({ mapName, setEditName }) => {
    const [name, setName] = useState(mapName);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('SUBMITTED')
        setEditName(false)
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
