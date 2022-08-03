// ==== Types ==== //

const CREATE_MAP = "map/CREATE_MAP";
const GET_ALL_MAP = "map/GET_ALL_MAP";

// ==== Actions ==== //

const actionCreateMap = (map) => {
    return {
        type: CREATE_MAP,
        map
    }
}

const actionGetAllMaps = (maps) => {
    return {
        type: GET_ALL_MAP,
        maps
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
        return mapRes.id;
    }
}

export const thunkGetAllMaps = (userId) => async (dispatch) => {
    const response = await fetch (`/api/m/all/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const mapData = await response.json();
        dispatch(actionGetAllMaps(mapData.maps));
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

        case GET_ALL_MAP: {
            const maps = action.maps;
            maps.forEach(map => {
                newState[map.id] = map;
            });
            return newState;
        }

        default:
            return state;
    }
}

export default maps;
