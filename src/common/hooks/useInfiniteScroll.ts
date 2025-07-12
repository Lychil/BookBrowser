import { useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
    onLoadMore: () => void;
    hasMore: boolean;
    loading: boolean;
    threshold?: number;
}

export default function useInfiniteScroll({ onLoadMore, hasMore, loading, threshold = 100 }: useInfiniteScrollProps) {
    const observerRef = useRef<IntersectionObserver>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            },
            {
                root: null,
                rootMargin: `${threshold}px`,
                threshold: 0.1
            }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [onLoadMore, hasMore, loading, threshold]);

    return { triggerRef };
}