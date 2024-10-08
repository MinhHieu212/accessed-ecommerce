export interface CategoryDataProps {
  name: string | null;
  index: number | null;
}

export interface Category {
  level_1: CategoryDataProps;
  level_2: CategoryDataProps;
}

export interface Inventory {
  quantity: number | null;
  sku: string;
}

export interface PackageSize {
  length: number | null;
  width: number | null;
  height: number | null;
}

export interface Pricing {
  msrp: number | null;
  salePrice: number | null;
  price: number | null;
}

export interface ImageFile {
  file: File;
  url: string;
}

export interface FormData {
  name: string;
  description: string;
  sellingType: string;
  category: Category;
  inventory: Inventory;
  packages_weight: number | null;
  packages_size: PackageSize;
  pricing: Pricing;
  images: ImageFile[];
}

export interface ProductFormProps {
  formData: FormData;
  updateField: (field: string, value: any) => void;
  errors: any;
  startValidate: boolean;
}
