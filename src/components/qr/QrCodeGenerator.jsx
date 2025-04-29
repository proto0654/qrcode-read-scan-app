import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"
import qr_style from "./qr_result.module.css"
import { GENERATE_DATA } from "../constants"
import { Link } from "react-router-dom";
export const QrCodeGenerator = () => {
    console.log(GENERATE_DATA);
    const [text, setText] = useState("Enter your text for QR")
    const [qrCode, setQrCode] = useState("https://www.google.com")
    const onClickHandler = () => {
        console.log("clicked")
        const prevData = localStorage.getItem(GENERATE_DATA);
        if(prevData){
            try {
                // Пытаемся распарсить предыдущие данные как JSON
                const parsedData = JSON.parse(prevData);
                // Проверяем, является ли parsedData массивом
                if(Array.isArray(parsedData)){
                    localStorage.setItem(GENERATE_DATA, JSON.stringify([...parsedData, text]));
                } else {
                    // Если это не массив, создаем новый с текущим значением и предыдущим
                    localStorage.setItem(GENERATE_DATA, JSON.stringify([parsedData, text]));
                }
            } catch(e) {
                // Если не удалось распарсить JSON, значит это строка
                localStorage.setItem(GENERATE_DATA, JSON.stringify([prevData, text]));
            }
        } else {
            localStorage.setItem(GENERATE_DATA, JSON.stringify([text]));
        }
        setQrCode(text)
    }
    const onChangeHandler = (e) => {
        console.log(e.target.value)
        setText(e.target.value)
    }
    return (
        <div className={qr_style.qr_container}>
            <h2>Генерация QR-кода</h2>
            <QRCodeSVG value={qrCode} />
            <input type="text" onChange={onChangeHandler} value={text} />
            <button className={qr_style.result_button} onClick={onClickHandler} type="button">Generate QR Code</button>
            <br/>
            <Link to="/">Вернуться назад</Link>
        </div>
    )
}

