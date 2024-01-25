import React, { useState, useEffect } from 'react';
import styles from './dialog-head.module.scss'
import {userChatStore} from "@/app/store/chat-store";
import {useNavigate} from "react-router-dom";

export function DialogHead(){
    const navigate = useNavigate();
    const chatStore = userChatStore();
    const [sessions, currentSessionIndex, selectSession] = userChatStore(
        (state) => [
            state.sessions,
            state.currentSessionIndex,
            state.selectSession]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

/*    if (isMobile) {
        return null;
    }*/

    return (
        <div className={styles["dialog-head"]}>
            <div className={styles["dialog-search-box"]}>
                <input type="button" value={"👉 进入技术博客"} onClick={() => window.open('https://www.rainyak.me/')}/>
            </div>
            <div className={styles["dialog-search-add"]} onClick={() => {
                let session = chatStore.openSession();
                // 点击时跳转到对应的界面，并传递必要参数信息
                selectSession(0)
                navigate(`/chat/${session.id}`, {state: {title: session.dialog.title}})
            }}></div>
        </div>
    );
}