import { GenerateHistory } from "./GenerateHistory";
import { SCAN_DATA } from "../constants";
import { Link } from "react-router-dom";
export const GenerateHistoryScans = () => {
    return(
        <>
        <GenerateHistory 
        GENERATE_FROM={SCAN_DATA} 
        title="История сканирования QR-кодов"
        />
        <br/>
        <Link to="/">Вернуться назад</Link>
        </>
    )
}


