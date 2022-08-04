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
            if (user) {
                await dispatch(thunkGetAllMaps(user.id));
                setLoaded(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    if (!loaded) return null;

    return (
        <div className={classes.pageWrapper}>
            <Map />
            <TemplateList />
        </div>
    );
}

export default MapPage;
