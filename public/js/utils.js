export const fetchData = async ({ url, options }) => {
    try {
        const res = await fetch(url, { ...options });
        const data = await res.json();
        if (res.ok)
            return { res, data };
    } catch (error) {
        console.log(error);
    }
}