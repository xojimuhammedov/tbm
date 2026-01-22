

const DocumentHeader = () => {
    return (
        <div className="flex justify-between items-center w-full mb-4 ">
                    <div className="relative   ">
                        <img
                            src="/public/images/tbm_logo_doc.png"
                            alt="TBM Globus"
                            className="object-contain w-full h-full"
                        />
                    </div>
            <div className="text-right max-w-[300px]">
                <p className="text-[#0070C0] text-[11px] mb-5 text-center font-bold leading-tight">
                    “O‘zbekiston telekommunikatsiya tarmoqlarini boshqarish respublika markazi” davlat unitar korxonasi
                </p>
                <p className="text-[#0070C0] text-[11px] text-center font-bold  leading-tight">
                    “Republican telecommunications management center of Uzbekistan” government unitary enterprise
                </p>
            </div>
        </div>
    );
};

export default DocumentHeader;