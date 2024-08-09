export const chunkArray = (arr: any[], size: number) => {
    return arr.reduce((chunks: any, el: any, i: any) => {
        if (i % size === 0) {
            chunks.push([el]);
        } else {
            chunks[chunks.length - 1].push(el);
        }
        return chunks;
    }, []);
}