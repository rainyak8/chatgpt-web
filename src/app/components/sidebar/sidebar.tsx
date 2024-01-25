import styles from "./sidebar.module.scss";
import ChatGPTIcon from "../../icons/chatgpt.svg";
import ChatIcon from "../../icons/chat.svg";
import RoleIcon from "../../icons/role.svg";
import MaxIcon from "../../icons/max.svg";
import MinIcon from "../../icons/min.svg";
import ExitIcon from "../../icons/exit.svg";
import SaleIcon from "../../icons/sale.svg";
import GitIcon from "../../icons/git.svg";

import {useNavigate} from "react-router-dom";
import {Path} from "@/app/constants";
import {IconButton} from "@/app/components/button/button";
import {useAppConfig} from "@/app/store/config";
import {useAccessStore} from "@/app/store/access";
import { useState, useEffect } from 'react';

export function SideBar() {

    const navigate = useNavigate();
    const config = useAppConfig();
    const access = useAccessStore();
    const [activeButton, setActiveButton] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        handleResize(); // 在组件挂载时执行一次

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        config.update((config) => (config.tightBorder = true));
    }, []);

    if (isMobile) {
        return null;
    }
    const handleButtonClick = (path: Path) => {
        navigate(path);
        setActiveButton(path);
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles["action-button"]}>
                <IconButton icon={<ExitIcon/>} backgroundColor={"#ff4e4e"} onClick={() => {
                    const confirmed = window.confirm('你是否确定退出登录？');
                    if (confirmed) {
                        access.goToLogin();
                    }
                }}/>
                <IconButton icon={<MinIcon/>} backgroundColor={"#f3c910"} onClick={() => {
                    config.update(
                        (config) => (config.tightBorder = false),
                    );
                }}/>
                <IconButton icon={<MaxIcon/>} backgroundColor={"#04c204"} onClick={() => {
                    config.update(
                        (config) => (config.tightBorder = true),
                    );
                }}/>
            </div>

            <div className={styles["sidebar-header"]}>
                <ChatGPTIcon/>
            </div>

            <div className={styles["sidebar-chat"] + (activeButton === Path.Chat ? ` ${styles.active}` : '')}
                 onClick={() => handleButtonClick(Path.Chat)}>
                <ChatIcon/>
            </div>

            <div className={styles["sidebar-role"] + (activeButton === Path.Role ? ` ${styles.active}` : '')}
                 onClick={() => handleButtonClick(Path.Role)}>
                <RoleIcon/>
            </div>

            <div className={styles["sidebar-mall"] + (activeButton === Path.Sale ? ` ${styles.active}` : '')}
                 onClick={() => handleButtonClick(Path.Sale)}>
                <SaleIcon/>
            </div>

            <div className={styles["sidebar-git"]}
                 onClick={() => {
                     window.open('https://github.com/rainyak8');
                 }}>
                <GitIcon/>
            </div>

        </div>
    )
}