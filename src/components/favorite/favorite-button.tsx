// components/FavoriteButton.tsx
import { useState, useEffect } from 'react';
import { saveFavorite, removeFavorite, isFavorite } from '@utils/localStorage';

interface FavoriteButtonProps {
    itemId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ itemId }) => {
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        setIsSaved(isFavorite(itemId));
    }, [itemId]);

    const handleToggleFavorite = () => {
        if (isSaved) {
            removeFavorite(itemId);
        } else {
            saveFavorite(itemId);
        }
        setIsSaved(!isSaved);
    };

    return (
        <button onClick={handleToggleFavorite}>
            {isSaved ? 'Unsave' : 'Save'} Item
        </button>
    );
};

export default FavoriteButton;
