"use client"

import { useEffect, useRef, useState } from "react"

import MediaPicker from "@/components/media-picker"

type MediaFieldProps = {
  value?: string
  onChange: (url: string) => void
  label?: string
  description?: string
  allowVideo?: boolean
  aspect?: number
  outputWidth?: number
  outputHeight?: number
  cropOnPick?: boolean
}

const videoPattern = /\.(mp4|webm|ogg)(\?.*)?$/i

const DEFAULT_OUTPUTS: Record<string, { width: number; height: number }> = {
  "16/9": { width: 1600, height: 900 },
  "4/3": { width: 1200, height: 900 },
  "1/1": { width: 900, height: 900 },
  "1.91/1": { width: 1200, height: 630 },
}

export default function MediaField({
  value = "",
  onChange,
  label,
  description,
  allowVideo = true,
  aspect = 4 / 3,
  outputWidth,
  outputHeight,
  cropOnPick = true,
}: MediaFieldProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCropOpen, setIsCropOpen] = useState(false)
  const [cropSource, setCropSource] = useState<string | null>(null)
  const [cropImage, setCropImage] = useState<HTMLImageElement | null>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [frameSize, setFrameSize] = useState({ width: 520, height: 520 / aspect })
  const [needsCenter, setNeedsCenter] = useState(false)
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    setError(null)
    try {
      const payload = new FormData()
      payload.append("file", file)
      const res = await fetch("/api/media", { method: "POST", body: payload })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Yükleme başarısız")
      }
      const nextUrl = data.item?.url || data.items?.[0]?.url
      if (nextUrl) {
        onChange(nextUrl)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız")
    } finally {
      setIsUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }
  }

  const isVideo = allowVideo && videoPattern.test(value)

  const openCropper = async (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      if (!result) return
      const img = new Image()
      img.onload = () => {
        setCropImage(img)
        setCropSource(result)
        setZoom(1)
        setOffset({ x: 0, y: 0 })
        setNeedsCenter(true)
        setIsCropOpen(true)
      }
      img.src = result
    }
    reader.readAsDataURL(file)
  }

  const openCropperFromUrl = async (url: string) => {
    try {
      setIsUploading(true)
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error("Görsel getirilemedi")
      }
      const blob = await res.blob()
      const file = new File([blob], `media-${Date.now()}`, { type: blob.type || "image/jpeg" })
      await openCropper(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel getirilemedi")
    } finally {
      setIsUploading(false)
    }
  }

  const clampOffset = (next: { x: number; y: number }, img: HTMLImageElement, frameWidth: number, frameHeight: number) => {
    const baseScale = Math.max(frameWidth / img.width, frameHeight / img.height)
    const displayWidth = img.width * baseScale * zoom
    const displayHeight = img.height * baseScale * zoom
    const minX = frameWidth - displayWidth
    const minY = frameHeight - displayHeight
    return {
      x: Math.min(0, Math.max(minX, next.x)),
      y: Math.min(0, Math.max(minY, next.y)),
    }
  }

  const resolveOutputSize = () => {
    if (outputWidth && outputHeight) return { width: outputWidth, height: outputHeight }
    const key =
      Math.abs(aspect - 16 / 9) < 0.02
        ? "16/9"
        : Math.abs(aspect - 4 / 3) < 0.02
        ? "4/3"
        : Math.abs(aspect - 1) < 0.02
        ? "1/1"
        : "1.91/1"
    return DEFAULT_OUTPUTS[key]
  }

  const confirmCrop = async () => {
    if (!cropImage) return
    setIsUploading(true)
    setError(null)
    try {
      const frameWidth = frameSize.width
      const frameHeight = frameSize.height
      const baseScale = Math.max(frameWidth / cropImage.width, frameHeight / cropImage.height)
      const scale = baseScale * zoom
      const cropX = -offset.x / scale
      const cropY = -offset.y / scale
      const cropW = frameWidth / scale
      const cropH = frameHeight / scale
      const output = resolveOutputSize()
      const canvas = document.createElement("canvas")
      canvas.width = output.width
      canvas.height = output.height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error("Canvas desteklenmiyor")
      }
      ctx.drawImage(cropImage, cropX, cropY, cropW, cropH, 0, 0, output.width, output.height)

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (!result) {
              reject(new Error("Kırpma başarısız"))
              return
            }
            resolve(result)
          },
          "image/webp",
          0.9
        )
      })
      const file = new File([blob], `crop-${Date.now()}.webp`, { type: blob.type })
      await handleUpload(file)
      setIsCropOpen(false)
      setCropSource(null)
      setCropImage(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kırpma başarısız")
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (!isCropOpen) return
    const measure = () => {
      if (!frameRef.current) return
      const rect = frameRef.current.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      setFrameSize({ width: rect.width, height: rect.height })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [isCropOpen, aspect])

  useEffect(() => {
    if (!cropImage || !needsCenter) return
    const frameWidth = frameSize.width
    const frameHeight = frameSize.height
    const baseScale = Math.max(frameWidth / cropImage.width, frameHeight / cropImage.height)
    const displayWidth = cropImage.width * baseScale
    const displayHeight = cropImage.height * baseScale
    setOffset({
      x: (frameWidth - displayWidth) / 2,
      y: (frameHeight - displayHeight) / 2,
    })
    setNeedsCenter(false)
  }, [cropImage, frameSize.width, frameSize.height, needsCenter])

  return (
    <div className="media-field">
      {(label || description) && (
        <div className="media-field-header">
          {label && <label>{label}</label>}
          {description && <p>{description}</p>}
        </div>
      )}
      <div
        className={`media-field-dropzone ${isDragActive ? "media-field-dropzone-active" : ""}`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragActive(true)
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragActive(false)
          const file = event.dataTransfer.files?.[0]
          if (file) {
            if (allowVideo && file.type.startsWith("video/")) {
              handleUpload(file)
            } else {
              openCropper(file)
            }
          }
        }}
      >
        <div className="media-field-preview">
          {value ? (
            isVideo ? (
              <video src={value} controls />
            ) : (
              <img src={value} alt="Seçili medya" />
            )
          ) : (
            <div className="media-field-placeholder">
              <strong>Medya seç</strong>
              <span>Sürükleyip bırak veya dosya seç</span>
            </div>
          )}
        </div>
        <div className="media-field-actions">
          <button type="button" className="admin-button admin-button-secondary" onClick={() => setIsPickerOpen(true)}>
            Galeriden Seç
          </button>
        <button type="button" className="admin-button" onClick={() => inputRef.current?.click()} disabled={isUploading}>
          {isUploading ? "Yükleniyor..." : "Dosya Yükle"}
        </button>
          {value && (
            <button type="button" className="admin-button-danger" onClick={() => onChange("")}>
              Temizle
            </button>
          )}
        </div>
        {error && <p className="media-field-error">{error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={allowVideo ? "image/*,video/*" : "image/*"}
          style={{ display: "none" }}
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) {
              if (allowVideo && file.type.startsWith("video/")) {
                handleUpload(file)
              } else {
                openCropper(file)
              }
            }
          }}
        />
      </div>

      {isCropOpen && cropSource && cropImage && (
        <div className="media-cropper">
          <div className="media-cropper-panel">
            <div className="media-cropper-header">
              <div>
                <h3>Görseli Kırp</h3>
                <p>İstediğiniz kadrajı ayarlayın.</p>
              </div>
              <button type="button" className="admin-button admin-button-secondary" onClick={() => setIsCropOpen(false)}>
                Kapat
              </button>
            </div>

            <div className="media-cropper-body">
              <div
                ref={frameRef}
                className="media-cropper-frame"
                style={{ aspectRatio: `${aspect}` }}
                onMouseDown={(event) => {
                  setIsDragging(true)
                  dragStart.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y }
                }}
                onMouseMove={(event) => {
                  if (!isDragging || !dragStart.current) return
                  const frameWidth = frameSize.width
                  const frameHeight = frameSize.height
                  const dx = event.clientX - dragStart.current.x
                  const dy = event.clientY - dragStart.current.y
                  const next = { x: dragStart.current.ox + dx, y: dragStart.current.oy + dy }
                  setOffset(clampOffset(next, cropImage, frameWidth, frameHeight))
                }}
                onMouseUp={() => {
                  setIsDragging(false)
                  dragStart.current = null
                }}
                onMouseLeave={() => {
                  setIsDragging(false)
                  dragStart.current = null
                }}
              >
                <img
                  src={cropSource}
                  alt="Kırp"
                  draggable={false}
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  }}
                />
              </div>
              <div className="media-cropper-controls">
                <label>
                  Yakınlaştır
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(event) => {
                      const nextZoom = Number(event.target.value)
                      setZoom(nextZoom)
                      const frameWidth = frameSize.width
                      const frameHeight = frameSize.height
                      setOffset((prev) => clampOffset(prev, cropImage, frameWidth, frameHeight))
                    }}
                  />
                </label>
                <div className="media-cropper-actions">
                  <button type="button" className="admin-button" onClick={confirmCrop} disabled={isUploading}>
                    {isUploading ? "Yükleniyor..." : "Kırp & Yükle"}
                  </button>
                  <button
                    type="button"
                    className="admin-button admin-button-secondary"
                    onClick={() => {
                      setIsCropOpen(false)
                      setCropSource(null)
                      setCropImage(null)
                    }}
                  >
                    Vazgeç
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MediaPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(url) => {
          if (cropOnPick && !videoPattern.test(url)) {
            openCropperFromUrl(url)
          } else {
            onChange(url)
          }
          setIsPickerOpen(false)
        }}
      />
    </div>
  )
}
