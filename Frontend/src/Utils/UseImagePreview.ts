

import { useEffect, useState } from "react";

function useImagePreview(imageFile: File | null): string {
    const [imageSrc, setImageSrc] = useState<string>("");
    useEffect(() => {
        if (!imageFile) return;
        const reader = new FileReader();  
        reader.onloadend = () => {
            setImageSrc(reader.result as string);
        }
        reader.readAsDataURL(imageFile);
    }, [imageFile]);
    
    return imageSrc;
}
export default useImagePreview;