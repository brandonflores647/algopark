import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Map from "../../Elements/Map";
import TemplateList from "../../Elements/TemplateList";

import classes from './MapPage.module.css';
import { thunkGetAllMaps } from "../../../store/maps";

const MapPage = () => {
    const user = useSelector((state) => state.session.user);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
            if (loaded && user) {
                await dispatch(thunkGetAllMaps(user.id));
            }
        })();
        setLoaded(true);
    }, [dispatch, loaded]);

    return (
        <div className={classes.pageWrapper}>
            <Map />
            <TemplateList />
        </div>
    );
}

export default MapPage;
