import { PermissionCategory } from "./permission-category";

export interface Permission {
    permissionId: string;
    name: string;
    description: string;
    key: string;
    permissionCategoryId: string;
}

export interface PermissionWithCategory extends Permission {
    permissionCategory: PermissionCategory;
}