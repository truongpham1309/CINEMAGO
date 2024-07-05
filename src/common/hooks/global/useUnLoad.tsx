import { useEffect } from 'react';

const clearSessionStorage = () => {
    sessionStorage.clear();
};

const useUnload = () => {
    useEffect(() => {
        const handleUnload = () => {
            clearSessionStorage();
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);
};

export default useUnload;