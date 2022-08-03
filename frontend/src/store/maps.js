// ==== Types ==== //

const CREATE_MAP = "map/CREATE_MAP";

// ==== Actions ==== //

const actionCreateMap = (map) => {
    return {
        type: CREATE_MAP,
        map
    }
}

// ==== Thunks ==== //

export const thunkCreateMap = (map) => async (dispatch) => {
    const response = await fetch (`/api/m/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(map)
    });

    if (response.ok) {
        const mapRes = await response.json();
        dispatch(actionCreateMap(mapRes));
    }
}

// ======== REDUCER ======== //
const maps = (state = {}, action) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case CREATE_MAP: {
            const map = action.map;
            newState[map.id] = { ...map };
            return newState
        }

        default:
            return state;
    }
}

export default maps;
