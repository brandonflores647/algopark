import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMapThunk } from '../../../store/session';
import Footer from './Footer';

import classes from './SplashPage.module.css';

const SplashPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
            await dispatch(setMapThunk(null));
        })();
    }, [])

    return (
        <div className={classes.splashWrapper}>
            <div className={classes.titleContainer}>
                <div className={classes.title}>
                    <h1>AlgoPark helps users visualize and interact with algorithms.</h1>
                    <span>Choose from pathfinding or sorting algorithms. Draw a path and watch dijkstras algorithm navigate through the obstacles you created. Hop into our sorting page to randomize a set of stacks and choose your speed. Watch the algorithm of your choosing sort those stacks in real time!</span>
                </div>
                <img src='/static/sortVisual1.png' alt='sort visual' width={'400px'}/>
            </div>

            <div className={classes.line}></div>

            <div className={classes.pathInfoContainer}>
                <div className={classes.pathInfo}>
                    <h2>Dijkstra's algorithm.</h2>
                    <span>Pick your start and end positions, draw some walls, create some traffic, and watch the algorithm find its way! Experiment with Dijkstra's pathfinding algorithm, visualize the shortest path and save different templates to your profile.</span>
                </div>
                <img src='/static/pathVisual1.gif' alt='path visual' width={'300px'}/>
            </div>

            <div className={classes.line}></div>

            <div className={classes.sortInfoContainer}>
                <div className={classes.sortInfo}>
                    <h2>Sorting algorithms.</h2>
                    <span>Choose a column amount, pick your algorithm, set your speed, and watch it sort! Visualize a sorting algorithm at the speed you desire. Watch what really happens frame by frame.</span>
                </div>
                <img src='/static/sortVisual2.gif' alt='path visual' width={'300px'}/>
            </div>

            <Footer />
        </div>
    );
}

export default SplashPage;
