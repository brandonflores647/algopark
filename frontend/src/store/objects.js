// ==== Types ==== //

export const CREATE_MANY_OBJECT = "object/CREATE_MANY_OBJECT";

// ==== Actions ==== //

const actionCreateManyObjects = (payload) => {
    return {
        type: CREATE_MANY_OBJECT,
        payload
    }
}

// ==== Thunks ==== //

export const thunkCreateManyObjects = (objects) => async (dispatch) => {
    const response = await fetch (`/api/o/create_many`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objects)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreateManyObjects(data));
    }
}
