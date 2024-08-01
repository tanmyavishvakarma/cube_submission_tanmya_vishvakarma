import React, { useEffect, useState, useCallback } from 'react';
import './PhotoGrid.css';

interface Props {
    customerId: string;
}

const PhotoGrid: React.FC<Props> = ({ customerId }) => {
    const [photos, setPhotos] = useState<string[]>([]);
    const fetchPhotos = useCallback(() => {
        const newPhotos = Array.from({ length: 9 }, (_, i) =>
            `https://picsum.photos/200/200?random=${customerId}-${i}-${Date.now()}`
        );
        setPhotos(newPhotos);
    }, [customerId]);
    useEffect(() => {
        fetchPhotos();
        const interval = setInterval(fetchPhotos, 10000);
        return () => clearInterval(interval);
    }, [fetchPhotos]);
    return (
        <div className="photo-grid">
            {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`${index + 1}`} loading="lazy" />
            ))}
        </div>
    );
};
export default PhotoGrid;