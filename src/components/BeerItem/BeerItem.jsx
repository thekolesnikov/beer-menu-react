import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBeerStore from '../../store/store';
import styles from './BeerItem.module.css';

const BeerItem = ({ id, name }) => {
    const deleteSelectedBeer = useBeerStore(
        (state) => state.deleteSelectedBeer
    );
    const selectBeer = useBeerStore((state) => state.selectBeer);
    const [isActive, setIsActive] = useState(false);

    const rightClickBeer = (event, id) => {
        event.preventDefault();
        setIsActive(!isActive);
        if (isActive) {
            deleteSelectedBeer(id);
        } else {
            selectBeer(id);
        }
    };

    return (
        <Link
            to={`/beer/${id}`}
            onContextMenu={(event) => rightClickBeer(event, id)}
            className={isActive ? styles.beeritem_active : styles.beeritem}
        >
            <div className={styles.beer}>
                {id} - {name}
            </div>
        </Link>
    );
};

export default BeerItem;
