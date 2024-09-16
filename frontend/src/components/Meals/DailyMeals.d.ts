import * as React from "react";
type RootProps = {
    className?: string;
    children: React.ReactNode;
};
declare const Root: React.FC<RootProps>;
type HeaderProps = {
    className?: string;
    children: React.ReactNode;
};
declare const Header: React.FC<HeaderProps>;
type CurrentDateProps = {
    className?: string;
    date: Date;
};
declare const Date: React.FC<CurrentDateProps>;
type OptionContainerProps = {
    className?: string;
    children: React.ReactNode;
};
declare const OptionContainer: React.FC<OptionContainerProps>;
type OptionProps = {
    className?: string;
    to: "create" | "all" | "calendar";
    label: string;
    children: React.ReactNode;
};
declare const Option: React.FC<OptionProps>;
type DailyMealsProps = {
    className?: string;
};
declare const DailyMeals: React.FC<DailyMealsProps>;
export { Root, Header, Date, OptionContainer, Option, DailyMeals };
