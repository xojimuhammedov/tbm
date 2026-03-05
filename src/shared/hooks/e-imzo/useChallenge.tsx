const useChallenge = () => {
  const addChallenge = async (): Promise<string> => {
    const response = await fetch("/frontend/challenge", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Real-IP": "1.2.3.4",
        Host: window.location.hostname,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Challenge server xatolik: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    if (data?.status !== 1) {
      throw new Error(
        `Challenge xatolik: ${data?.message || "Noma'lum xatolik"}`,
      );
    }

    if (!data?.challenge) {
      throw new Error(`Challenge topilmadi. Response: ${JSON.stringify(data)}`);
    }

    return data.challenge;
  };

  return addChallenge;
};

export default useChallenge;
