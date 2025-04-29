import { QrCodeGenerator } from './components/qr/QrCodeGenerator';
import { QrCodeScanner } from './components/qr/QrCodeScanner';
import { Navigation } from './components/navigation/Navigation';
import { GenerateHistoryData } from './components/qr/GenerateHistoryData';
import { GenerateHistoryScans } from './components/qr/GenerateHistoryScans';
import { Routes, Route } from 'react-router-dom';
import { Index } from './Index';

import Main_style from './Main.module.css';
const Layout = () => {
    return (
        <div className={Main_style.main_container}>
            <Navigation />
            
            <div>
                {/* Реализация роутинга для генератора и сканера QR-кодов */}
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="/generate" element={<QrCodeGenerator />} />
                <Route path="/scan" element={<QrCodeScanner />} />
                <Route path="/generate-history" element={<GenerateHistoryData />} />
                <Route path="/scan-history" element={<GenerateHistoryScans />} />
            </Routes>
            
            </div>

            <div>&nbsp;</div>
        </div>
    )
}
export default Layout;
