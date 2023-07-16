import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useBeerStore from '../../store/store.js';
import Loading from '../../components/Loading/Loading.jsx';
import styles from './BeerPage.module.css';

const BeerPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchBeers = useBeerStore((state) => state.fetchBeers);
    const beers = useBeerStore((state) => state.beers);
    const beer = beers.find((beer) => beer.id === +id);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (beers.length === 0) {
            fetchBeers(setIsLoading);
        }
    });

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {beer ? (
                        <div className={styles.beer}>
                            <button
                                className={styles.beer__button}
                                onClick={() => navigate(-1)}
                            >
                                Go back
                            </button>
                            <p className={styles.beer__name}>{beer.name}</p>
                            <p>{beer.description}</p>
                            <img
                                className={styles.beer__img}
                                src={beer.image_url}
                                alt="beerImg"
                            />
                        </div>
                    ) : (
                        <div>Beer not found</div>
                    )}
                </>
            )}
        </>
    );
};

export default BeerPage;
