import { Scanner } from '@yudiel/react-qr-scanner';
import { useState, useEffect } from 'react';
import qr_style from "./qr_result.module.css"
import { SCAN_DATA } from "../constants"
import { Link } from "react-router-dom";
export const QrCodeScanner = () => {
    console.log(SCAN_DATA);
    const [result, setResult] = useState('');
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isScanning, setIsScanning] = useState(true);
    
    // Определение мобильного устройства
    useEffect(() => {
        const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(checkMobile);
    }, []);
    
    const handleScan = (detectedCodes) => {
        if (!detectedCodes || detectedCodes.length === 0) return;
        
        // Берем первый распознанный код
        const detectedCode = detectedCodes[0];
        console.log('QR-код успешно отсканирован:', detectedCode.rawValue);
        setResult(detectedCode.rawValue);
        const prevData = localStorage.getItem(SCAN_DATA);
        if(prevData){
            try {
                // Пытаемся распарсить предыдущие данные как JSON
                const parsedData = JSON.parse(prevData);
                // Проверяем, является ли parsedData массивом
                if(Array.isArray(parsedData)){
                    localStorage.setItem(SCAN_DATA, JSON.stringify([...parsedData, detectedCode.rawValue]));
                } else {
                    // Если это не массив, создаем новый с текущим значением и предыдущим
                    localStorage.setItem(SCAN_DATA, JSON.stringify([parsedData, detectedCode.rawValue]));
                }
            } catch(e) {
                // Если не удалось распарсить JSON, значит это строка
                localStorage.setItem(SCAN_DATA, JSON.stringify([prevData, detectedCode.rawValue]));
            }
        } else {
            localStorage.setItem(SCAN_DATA, JSON.stringify([detectedCode.rawValue]));
        }
        setIsScanning(false);
    };
    
    const handleError = (error) => {
        console.error('Ошибка сканирования:', error?.message);
        setError(error);
    };
    
    const resetScanner = () => {
        setResult('');
        setError(null);
        setIsScanning(true);
    };
    
    // Объясняет ошибку пользователю на понятном языке
    const getErrorMessage = () => {
        if (!error) return null;
        
        if (error.name === 'NotAllowedError') {
            return 'Доступ к камере запрещен. Пожалуйста, разрешите доступ к камере в настройках браузера.';
        }
        
        if (error.name === 'NotFoundError') {
            return 'Камера не найдена на вашем устройстве.';
        }
        
        if (error.name === 'NotReadableError') {
            return 'Камера занята другим приложением или не может быть использована. Попробуйте закрыть другие приложения, использующие камеру, и обновить страницу.';
        }
        
        if (error.name === 'OverconstrainedError') {
            return 'Невозможно использовать указанные параметры камеры. Попробуйте сбросить настройки.';
        }
        
        return error.message || 'Произошла неизвестная ошибка при сканировании.';
    };
    
    if (result) {
        return (
            <div className={qr_style.result_container}>
                <h2>Сканирование QR-кода</h2>
                <h3 style={{ margin: '0 0 15px' }}>QR-код успешно отсканирован:</h3>
                
                <div className={qr_style.result_text}>
                    {result}
                </div>
                
                <button 
                    onClick={resetScanner} 
                    className={qr_style.result_button}
                >
                    Сканировать снова
                </button>
            </div>
        );
    }
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '10px' }}>
            <h2>Сканирование QR-кода</h2>
            {error ? (
                <div style={{ 
                    padding: '15px', 
                    background: '#ffebee', 
                    color: '#c62828',
                    borderRadius: '4px',
                    marginBottom: '20px'
                }}>
                    <p style={{ fontWeight: 'bold', marginTop: 0 }}>Ошибка: {error.name}</p>
                    <p>{getErrorMessage()}</p>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <button 
                            onClick={resetScanner}
                            style={{ 
                                padding: '8px 16px',
                                background: '#2196F3',
                                border: 'none',
                                borderRadius: '4px',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            Попробовать снова
                        </button>
                    </div>
                    
                    {isMobile && (
                        <div style={{ 
                            marginTop: '15px', 
                            padding: '10px', 
                            background: '#fff3cd', 
                            color: '#856404',
                            borderRadius: '4px' 
                        }}>
                            <p style={{ fontWeight: 'bold', marginTop: 0 }}>Совет для мобильных устройств:</p>
                            <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                                <li>Убедитесь, что вы используете HTTPS</li>
                                <li>Попробуйте Chrome или Safari</li>
                                <li>Проверьте разрешения камеры в настройках</li>
                                <li>Закройте другие приложения, использующие камеру</li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div style={{ 
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        marginBottom: '15px',
                        height: '400px' // Фиксированная высота для сканера
                    }}>
                        {isScanning && (
                            <Scanner
                                onScan={handleScan}
                                onError={handleError}
                                constraints={{
                                    facingMode: 'environment', // Всегда используем заднюю камеру
                                    width: { ideal: 1280 },
                                    height: { ideal: 720 }
                                }}
                                formats={[
                                    'aztec',
                                    'code_128',
                                    'code_39',
                                    'code_93',
                                    'codabar',
                                    'databar',
                                    'databar_expanded',
                                    'data_matrix',
                                    'ean_13',
                                    'ean_8',
                                    'itf',
                                    'qr_code',
                                    'upc_a',
                                    'upc_e',
                                    'linear_codes',
                                    'matrix_codes'
                                ]}
                                scanDelay={300}
                                allowMultiple={false}
                                styles={{
                                    container: {
                                        width: '100%',
                                        height: '100%'
                                    },
                                    video: {
                                        width: '100%',
                                        height: '100%'
                                    }
                                }}
                                components={{
                                    finder: false,
                                    audio: false 
                                }}
                            />
                        )}
                        
                        {!isScanning && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                background: '#000',
                                color: 'white',
                                fontSize: '16px'
                            }}>
                                Подготовка камеры...
                            </div>
                        )}
                    </div>
                </div>
            )}
            <br/>
            <Link to="/">Вернуться назад</Link>
        </div>
    );
};
