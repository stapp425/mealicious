import { type FC, type ReactNode } from "react";
import { Props as ButtonProps } from "./Button";
type PlaceholderProps = {
    className?: string;
    children: ReactNode;
    icon: ReactNode;
};
declare const Root: FC<PlaceholderProps>;
type MessageProps = {
    className?: string;
    children: ReactNode;
};
declare const Message: FC<MessageProps>;
type TipProps = {
    className?: string;
    children: ReactNode;
};
declare const Tip: FC<TipProps>;
declare const Action: FC<ButtonProps>;
export { Root, Message, Tip, Action };
