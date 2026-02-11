"use client"

import { useEffect, useRef, useState } from "react"

type MediaItem = {
  _id: string
  url: string
  originalName: string
  mimeType: string
  size: number
  createdAt: string
}

export default function MediaGallery() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 12
  const inputRef = useRef<HTMLInputElement | null>(null)

  const loadItems = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/media", { cache: "no-store" })
      const data = await res.json()
      if (data.ok) {
        setItems(data.items)
      } else {
        setError(data.error || "Medya yüklenemedi")
      }
    } catch {
      setError("Medya yüklenemedi")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleFiles = (files: FileList | File[]) => {
    const list = Array.from(files).filter((file) => file.size > 0)
    if (!list.length) return
    setPendingFiles(list)
  }

  const handleUpload = async () => {
    if (!pendingFiles.length) return
    setIsUploading(true)
    setError(null)

    try {
      const payload = new FormData()
      pendingFiles.forEach((file) => payload.append("files", file))
      const res = await fetch("/api/media", { method: "POST", body: payload })
      const data = await res.json()
      if (!data.ok) {
        throw new Error(data.error || "Yükleme başarısız")
      }
      await loadItems()
      setPendingFiles([])
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id))
        setSelectedItem((prev) => (prev?._id === id ? null : prev))
      }
    } catch {
      setError("Silme başarısız")
    }
  }

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const pageItems = items.slice(startIndex, startIndex + pageSize)

  return (
    <section className="admin-section">
      <div className="admin-page-header" style={{ marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0 }}>Medya Galerisi</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
            Fotoğraf ve video yükleyin, içeriklerde kullanın.
          </p>
        </div>
        <span className="admin-pill">{items.length} medya</span>
      </div>

      <div
        className={`media-dropzone ${isDragActive ? "media-dropzone-active" : ""}`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragActive(true)
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragActive(false)
          if (event.dataTransfer.files?.length) {
            handleFiles(event.dataTransfer.files)
          }
        }}
      >
        <div>
          <strong>Dosyaları sürükleyip bırak</strong>
          <p>PNG, JPG, WEBP, MP4 (maks 20MB)</p>
        </div>
        <button type="button" className="admin-button admin-button-secondary" onClick={() => inputRef.current?.click()}>
          Dosya Seç
        </button>
        <input
          ref={inputRef}
          type="file"
          name="files"
          multiple
          accept="image/*,video/*"
          onChange={(event) => {
            if (event.target.files?.length) {
              handleFiles(event.target.files)
            }
          }}
          style={{ display: "none" }}
        />
      </div>

      {pendingFiles.length > 0 && (
        <div className="media-queue">
          <div>
            <strong>{pendingFiles.length} dosya seçildi</strong>
            <p>Yüklemek için butona bas.</p>
          </div>
          <button className="admin-button" type="button" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Yükleniyor..." : "Yüklemeyi Başlat"}
          </button>
        </div>
      )}

      {error && <p style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</p>}

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          <div className="media-grid media-grid-fixed">
            {pageItems.map((item) => (
              <div key={item._id} className="media-card media-card-compact">
                <button
                  type="button"
                  className="media-card-button"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="media-thumb">
                    {item.mimeType.startsWith("video/") ? (
                      <video src={item.url} />
                    ) : (
                      <img src={item.url} alt={item.originalName} loading="lazy" />
                    )}
                  </div>
                </button>
                <div className="media-meta">
                  <strong>{item.originalName}</strong>
                  <span>{Math.round(item.size / 1024)} KB</span>
                </div>
                <div className="media-actions">
                  <button
                    type="button"
                    className="admin-button admin-button-secondary"
                    onClick={() => navigator.clipboard.writeText(item.url)}
                  >
                    URL Kopyala
                  </button>
                  <button type="button" className="admin-button-danger" onClick={() => handleDelete(item._id)}>
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="media-pagination">
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Önceki
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Sonraki
            </button>
          </div>
        </>
      )}

      {selectedItem && (
        <div className="media-modal" onClick={() => setSelectedItem(null)}>
          <div className="media-modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="media-modal-header">
              <div>
                <h3>{selectedItem.originalName}</h3>
                <p>{Math.round(selectedItem.size / 1024)} KB</p>
              </div>
              <button type="button" className="admin-button admin-button-secondary" onClick={() => setSelectedItem(null)}>
                Kapat
              </button>
            </div>
            <div className="media-preview">
              {selectedItem.mimeType.startsWith("video/") ? (
                <video src={selectedItem.url} controls />
              ) : (
                <img src={selectedItem.url} alt={selectedItem.originalName} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
