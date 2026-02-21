
const useTimestamp = () => {

    const addTimestamp = async (pkcs7: string): Promise<string> => {
        const response = await fetch("/frontend/timestamp/pkcs7", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Real-IP": "1.2.3.4",
                "Host": window.location.hostname,
            },
            body: pkcs7,
        });

        if (!response.ok) {
            throw new Error(`Timestamp server xatolik: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data?.status !== 1) {
            throw new Error(`Timestamp xatolik: ${data?.message || "Noma'lum xatolik"}`);
        }

        if (!data?.pkcs7b64) {
            throw new Error(`pkcs7b64 topilmadi. Response: ${JSON.stringify(data)}`);
        }

        return data.pkcs7b64 as string;
    };

    return { addTimestamp };
};

export default useTimestamp;