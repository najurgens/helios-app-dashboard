export interface MenuItem {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;
    expanded?: boolean;
    children?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    visible?: boolean;
}