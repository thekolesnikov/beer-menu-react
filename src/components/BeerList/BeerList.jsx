import { useState, useEffect } from 'react';
import BeerItem from '../BeerItem/BeerItem';
import useBeerStore from '../../store/store.js';
import Loading from '../Loading/Loading';
import styles from './BeerList.module.css';

const BeerList = () => {
    const fetchBeers = useBeerStore((state) => state.fetchBeers);
    const beers = useBeerStore((state) => state.beers);
    const selectedBeers = useBeerStore((state) => state.selectedBeers);
    const deleteSelectedBeers = useBeerStore(
        (state) => state.deleteSelectedBeers
    );

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (beers.length === 0) {
            fetchBeers(setIsLoading);
        }
    }, [beers.length, fetchBeers]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={styles.beerlist}>
                    <div>
                        {beers.slice(0, 15).map((beer) => (
                            <BeerItem
                                id={beer.id}
                                key={beer.id}
                                name={beer.name}
                            />
                        ))}
                        v
                    </div>
                    {selectedBeers.length >= 1 ? (
                        <button
                            className={styles.beerlist__button}
                            onClick={deleteSelectedBeers}
                        >
                            Delete
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            )}
        </>
    );
};

export default BeerList;
