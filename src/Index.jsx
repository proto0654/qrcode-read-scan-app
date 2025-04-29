import { Link } from 'react-router-dom';
import Main_style from './Main.module.css';

export const Index = () => {
    return (
        <div className={Main_style.index_container}>
            <h1>Добро пожаловать в QR-менеджер</h1>
            <div className={Main_style.instructions}>
                <h2>Инструкция по использованию</h2>
                <p>
                    Это приложение позволяет вам <Link to="/generate">генерировать QR-коды</Link> из текста и 
                    <Link to="/scan"> сканировать QR-коды</Link> с помощью камеры вашего устройства.
                </p>
                <p>
                    Вы можете просмотреть историю <Link to="/generate-history">сгенерированных QR-кодов</Link> и  
                    <Link to="/scan-history"> отсканированных QR-кодов</Link>.
                </p>
                <div className={Main_style.features}>
                    <h3>Возможности:</h3>
                    <ul>
                        <li>Генерация QR-кодов из любого текста</li>
                        <li>Сканирование QR-кодов с помощью камеры</li>
                        <li>История всех сгенерированных и отсканированных QR-кодов</li>
                        <li>Поддержка мобильных устройств</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
