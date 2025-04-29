import { useState, useEffect } from 'react';
import { QRCodeSVG } from "qrcode.react";
import qr_style from "./qr_result.module.css";

export const GenerateHistory = ({ GENERATE_FROM, title })=>{
    const [data, setData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const storedData = localStorage.getItem(GENERATE_FROM);
        if (storedData) {
            try {
                setData(JSON.parse(storedData));
            } catch (e) {
                console.error('Ошибка при парсинге данных:', e);
                setData([]);
            }
        }
    }, [GENERATE_FROM]);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Проверяем при загрузке
        checkMobile();
        
        // Добавляем слушатель изменения размера окна
        window.addEventListener('resize', checkMobile);
        
        // Очищаем слушатель при размонтировании
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);
      
    return(
        <div className={qr_style.history_container}>
            <h2>{title}</h2>
            <div className={qr_style.history_grid}>
                {data && data.length > 0 ? data.map((item, index) => (
                    <div key={index} className={qr_style.history_item}>
                        <div className={qr_style.history_number}>{index + 1}.</div>
                        <QRCodeSVG value={item} size={isMobile ? 100 : 128} />
                        <div className={qr_style.history_text}>{item}</div>
                    </div>
                )) : <div className={qr_style.no_data}>Нет данных</div>}
            </div>
        </div>
    )
}

