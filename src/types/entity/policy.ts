import { PolicyCategory } from "./policy-category";

export interface Policy {
    policyId: string;
    name: string;
    description: string;
    key: string;
    policyCategoryId: string;
}

export interface PolicyWithCategory extends Policy {
    policyCategory: PolicyCategory;
}