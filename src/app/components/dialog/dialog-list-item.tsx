import styles from './dialog-list-item.module.scss';
import {Avatar, Badge, Button, Space} from 'antd';
import {ChatSession} from "@/app/store/chat-store";
import DeleteIcon from "@/app/icons/delete.svg";
import {useEffect, useState} from "react";

interface Props {
    session: ChatSession;
    selected: boolean;
    onClick: () => void;
    onClickDelete: () => void;
}

/**
 * 对话框列表对象元素
 * @constructor
 */
export function DialogListItem(props: Props) {
    const {session, selected} = props;
    const dialog = session.dialog;
    const date = new Date(dialog.timestamp);
    const timeString = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});

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
        <div className={`${styles.wrapper} ${selected ? styles.selected : ''}`} onClick={() => props.onClick()}>
            <div className={styles.left}>
                <Space size={24}>
                    {/* Badge 是 React 提供的组件，这里控制只有选中的才展示对话数 */}
                    <Badge count={props.selected ? dialog.count : 0} size={"small"} color={"#fca7a7"}>
                        <Avatar shape={"square"} src={dialog.avatar} size={40}/>
                    </Badge>
                </Space>
            </div>
            <div className={styles.right}>
                <div className={styles.line1}>
                    <p className={styles.title}>{dialog.title}</p>
                    <p className={styles.time}>{timeString}</p>
                </div>
                <div className={styles.line2}>
                    {dialog.subTitle}
                </div>
            </div>
            <div className={styles["chat-item-delete"]} onClickCapture={props.onClickDelete}>
                <DeleteIcon/>
            </div>
        </div>
    );
}