import {
    CREATE_MANY_OBJECT,
    UPDATE_MANY_OBJECT
} from './objects';

// ==== Types ==== //

const CREATE_MAP = "map/CREATE_MAP";
const GET_ALL_MAP = "map/GET_ALL_MAP";
const EDIT_MAP = "map/EDIT_MAP";
const DELETE_MAP = "map/DELETE_MAP";

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

const actionEditMap = (map) => {
    return {
        type: EDIT_MAP,
        map
    }
}

const actionDeleteMap = (mapId) => {
    return {
        type: DELETE_MAP,
        mapId
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

export const thunkEditMap = (mapId, name) => async (dispatch) => {
    const response = await fetch (`/api/m/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mapId, name })
    });

    if (response.ok) {
        const mapData = await response.json();
        if (mapData.errors) return;
        dispatch(actionEditMap(mapData));
    }
}

export const thunkDeleteMap = (mapId) => async (dispatch) => {
    const response = await fetch (`/api/m/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mapId })
    });

    if (response.ok) {
        dispatch(actionDeleteMap(mapId));
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

        case EDIT_MAP: {
            const mapId = action.map.id;
            newState[mapId].name = action.map.name;
            return newState;
        }

        case DELETE_MAP: {
            const mapId = action.mapId;
            delete newState[mapId];
            return newState;
        }

        case CREATE_MANY_OBJECT: {
            const mapId = action.payload.mapId;
            const objects = action.payload.objects;
            newState[mapId].objects = objects;
            return newState;
        }

        case UPDATE_MANY_OBJECT: {
            const mapId = action.payload.mapId;
            const objects = action.payload.newObjects;
            newState[mapId].objects = objects;
            return newState;
        }

        default:
            return state;
    }
}

export default maps;
