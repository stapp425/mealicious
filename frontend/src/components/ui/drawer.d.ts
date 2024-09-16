import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
declare const Drawer: {
    ({ shouldScaleBackground, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerTrigger: React.ForwardRefExoticComponent<any>;
declare const DrawerPortal: React.FC<import("@radix-ui/react-dialog").DialogPortalProps>;
declare const DrawerClose: React.ForwardRefExoticComponent<any>;
declare const DrawerOverlay: React.ForwardRefExoticComponent<any>;
declare const DrawerContent: React.ForwardRefExoticComponent<any>;
declare const DrawerHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerTitle: React.ForwardRefExoticComponent<any>;
declare const DrawerDescription: React.ForwardRefExoticComponent<any>;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, };
