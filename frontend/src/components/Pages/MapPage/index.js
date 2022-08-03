import Map from "../../Elements/Map";
import TemplateList from "../../Elements/TemplateList";

import classes from './MapPage.module.css';

const MapPage = () => {
    return (
        <div className={classes.pageWrapper}>
            <Map />
            <TemplateList />
        </div>
    );
}

export default MapPage;
