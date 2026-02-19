import { useEffect, useState } from 'react'
import { useEImzo } from 'use-eimzo'

type Cert = {
    disk: string;
    path: string;
    name: string;
    alias: string;
    serialNumber: string;
    validFrom: string;
    validTo: string;
    CN: string;
    TIN: string;
    UID: string;
    O: string;
    T: string;
    type: string;
};

export const MyComponent = () => {
    const { listAllKeys, signKey, install } = useEImzo()
    const [keys, setKeys] = useState<Cert[]>([])
    const [pkcs7, setPkcs7] = useState<string | null>(null)
    const [fileBase64, setFileBase64] = useState<string | null>(null);


    useEffect(() => {
        const init = async () => {
            try {
                await install() // API keys va E-IMZO ni ishga tushirish
                const allKeys = await listAllKeys()
                setKeys(allKeys)
            } catch (err) {
                console.error('E-IMZO init xatolik:', err)
            }
        }
        init()
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // "data:application/pdf;base64,..." qismini olib tashlab, faqat sof Base64 ni olamiz
                const base64String = (reader.result as string).split(',')[1];
                setFileBase64(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignKey = async (cert: Cert) => {
        if (!fileBase64) {
            alert("Iltimos, avval faylni tanlang!");
            return;
        }
        try {
            // 'my-challenge-string' o'rniga faylning Base64 kodi ketadi
            const result = await signKey(cert, fileBase64);
            setPkcs7(result);
            console.log("Imzolangan PKCS#7 paket:", result);
        } catch (err) {
            console.error("Imzolashda xatolik:", err);
        }
    }


    return (
        <div style={{ padding: '20px' }}>
            <h1>E-IMZO Hujjat Imzolash</h1>

            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>1-qadam: Faylni tanlang</h3>
                <input type="file" onChange={handleFileChange} />
                {fileBase64 && <p style={{ color: 'green' }}>Fayl yuklandi va Base64 ga o'girildi.</p>}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>2-qadam: Kalitni tanlang va imzolang</h3>
                {keys.length === 0 && <p>Kalitlar yuklanmoqda yoki E-IMZO topilmadi...</p>}
                {keys.map((cert) => (
                    <div key={cert.serialNumber} style={{ marginBottom: '10px', borderBottom: '1px dotted' }}>
                        <p><strong>F.I.SH:</strong> {cert.CN} <br/>
                            <strong>STIR:</strong> {cert.TIN}</p>
                        <button
                            disabled={!fileBase64}
                            onClick={() => handleSignKey(cert)}
                        >
                            Ushbu kalit bilan imzolash
                        </button>
                    </div>
                ))}
            </div>

            {pkcs7 && (
                <div>
                    <h3>Natija (PKCS#7):</h3>
                    <textarea
                        readOnly
                        value={pkcs7}
                        style={{ width: '100%', height: '150px', fontFamily: 'monospace' }}
                    />
                    <p><i>Bu kodni backendga yuborib, imzoni va hujjatni validatsiya qilishingiz mumkin.</i></p>
                </div>
            )}
        </div>
    )
}