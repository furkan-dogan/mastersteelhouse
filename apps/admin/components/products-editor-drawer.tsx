'use client'

import type { ProductItem } from '@/lib/products-store'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { ProductEditorForm, type TechnicalDetailRow } from '@/components/product-editor-form'

type ProductsEditorDrawerProps = {
  open: boolean
  saving: boolean
  selectedProduct: ProductItem | null
  technicalDetailRows: TechnicalDetailRow[]
  onSave: () => void
  onClose: () => void
  onPatchProduct: (update: Partial<ProductItem>) => void
  onSetSelectedProductSlug: (slug: string) => void
  onOpenCoverPicker: () => void
  onOpenGalleryPicker: () => void
  onOpenFloorPlanPicker: (index: number) => void
  onRemoveGalleryImage: (index: number) => void
  onAddTechnicalDetailRow: () => void
  onUpdateTechnicalDetailRow: (rowId: string, patch: Partial<Omit<TechnicalDetailRow, 'id'>>) => void
  onRemoveTechnicalDetailRow: (rowId: string) => void
  onAddFloorPlan: () => void
  onUpdateFloorPlan: (index: number, patch: Partial<{ name: string; image: string }>) => void
  onRemoveFloorPlan: (index: number) => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
}

export function ProductsEditorDrawer({
  open,
  saving,
  selectedProduct,
  technicalDetailRows,
  onSave,
  onClose,
  onPatchProduct,
  onSetSelectedProductSlug,
  onOpenCoverPicker,
  onOpenGalleryPicker,
  onOpenFloorPlanPicker,
  onRemoveGalleryImage,
  onAddTechnicalDetailRow,
  onUpdateTechnicalDetailRow,
  onRemoveTechnicalDetailRow,
  onAddFloorPlan,
  onUpdateFloorPlan,
  onRemoveFloorPlan,
  onRequestDelete,
  onError,
}: ProductsEditorDrawerProps) {
  if (!open || !selectedProduct) return null

  return (
    <CmsEditorDrawer
      open={open}
      title={selectedProduct.name}
      subtitle="Urun Duzenle"
      widthClassName="max-w-4xl"
      saving={saving}
      onSave={onSave}
      onClose={onClose}
    >
      <ProductEditorForm
        selectedProduct={selectedProduct}
        technicalDetailRows={technicalDetailRows}
        onPatchProduct={onPatchProduct}
        onSetSelectedProductSlug={onSetSelectedProductSlug}
        onOpenCoverPicker={onOpenCoverPicker}
        onOpenGalleryPicker={onOpenGalleryPicker}
        onOpenFloorPlanPicker={onOpenFloorPlanPicker}
        onRemoveGalleryImage={onRemoveGalleryImage}
        onAddTechnicalDetailRow={onAddTechnicalDetailRow}
        onUpdateTechnicalDetailRow={onUpdateTechnicalDetailRow}
        onRemoveTechnicalDetailRow={onRemoveTechnicalDetailRow}
        onAddFloorPlan={onAddFloorPlan}
        onUpdateFloorPlan={onUpdateFloorPlan}
        onRemoveFloorPlan={onRemoveFloorPlan}
        onRequestDelete={onRequestDelete}
        onError={onError}
      />
    </CmsEditorDrawer>
  )
}
