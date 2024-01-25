// dialog-list.tsx
import styles from "./dialog-list.module.scss";
import {DialogListItem} from "./dialog-list-item";
import {DialogResizeableSidebar} from "@/app/components/dialog/dialog-resizeable-sidebar";
import {useNavigate} from "react-router-dom";
import {userChatStore} from "@/app/store/chat-store";
import {DialogHead} from "@/app/components/dialog/dialog-head";
import {useEffect, useState} from "react";

/**
 * 对话框列表
 */
export function DialogList() {
    const navigate = useNavigate();
    const chatStore = userChatStore();
    const [sessions, currentSessionIndex, selectSession, currentSession] = userChatStore(
        (state) => [
            state.sessions,
            state.currentSessionIndex,
            state.selectSession,
            state.currentSession]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            const isMobileNow = window.innerWidth < 600;
            setIsMobile(isMobileNow);
            if (isMobileNow) {
                selectSession(0);
                navigate(`/chat/${0}`, {state: {title: "ChatBot"}});
            } else if (sessions.length > 0) {
                selectSession(currentSessionIndex);
                navigate(`/chat/${currentSession().id}`, {
                    state: {title: currentSession().dialog.title},
                });
            }
        };

        handleResize(); // 在组件挂载时执行一次

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [navigate, selectSession, sessions, currentSessionIndex, currentSession]);

    if (isMobile) {
        return null;
    }

    return (
        <DialogResizeableSidebar>
            {/*头部操作*/}
            <DialogHead/>
            {/*对话列表*/}
            <div className={styles["dialog-list"]}>
                {sessions.map((session, index) => (
                    <DialogListItem
                        key={session.id}
                        session={session}
                        selected={currentSessionIndex === index}
                        onClick={() => {
                            // 点击时跳转到对应的界面，并传递必要参数信息
                            selectSession(index);
                            navigate(`/chat/${session.id}`, {state: {title: session.dialog.title}})
                        }}
                        onClickDelete={() => {
                            chatStore.deleteSession(index);
                        }}
                    />
                ))}
            </div>
        </DialogResizeableSidebar>
    );
}