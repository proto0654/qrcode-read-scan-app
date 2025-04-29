import { GenerateHistory } from "./GenerateHistory";
import { GENERATE_DATA } from "../constants";
import { Link } from "react-router-dom";
export const GenerateHistoryData = () => {
    return(
            <><GenerateHistory 
                GENERATE_FROM={GENERATE_DATA}
                title="История генерации QR-кодов"
            />
            <br/>
                <Link to="/">Вернуться назад</Link>
            </>
    )
}


