// ==== Types ==== //

export const CREATE_MANY_OBJECT = "object/CREATE_MANY_OBJECT";
export const UPDATE_MANY_OBJECT = "object/UPDATE_MANY_OBJECT";

// ==== Actions ==== //

const actionCreateManyObjects = (payload) => {
    return {
        type: CREATE_MANY_OBJECT,
        payload
    }
}

const actionUpdateManyObjects = (payload) => {
    return {
        type: UPDATE_MANY_OBJECT,
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

export const thunkUpdateManyObjects = (mapId, newObjects, oldObjects) => async (dispatch) => {
    const response = await fetch (`/api/o/update_many`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mapId, newObjects, oldObjects})
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionUpdateManyObjects(data));
    }
}
