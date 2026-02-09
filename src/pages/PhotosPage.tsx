import { useState, useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";

// --- Types & Constants ---

interface PhotoData {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number; // bytes
  roomType: string;
  description: string;
}

const ROOM_TYPES = [
  "Living Room",
  "Dining Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
  "Office",
  "Exterior",
  "Garage",
  "Hallway",
  "Basement",
  "Attic",
  "Patio/Deck",
  "Other",
];

// Helper to format bytes to human readable string
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

// --- Sub-components ---

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12 text-teal-600 mb-4"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// --- Main PhotoCard Component ---

interface PhotoCardProps {
  photo: PhotoData;
  onUpdate: (id: string, field: keyof PhotoData, value: string) => void;
  onRemove: (id: string) => void;
}

function PhotoCard({ photo, onUpdate, onRemove }: PhotoCardProps) {
  return (
    <div className="group flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden">
      {/* Header / Actions can go here if needed, e.g. checkbox or move icon */}
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <img
          src={photo.previewUrl}
          alt={photo.name}
          className="h-full w-full object-cover"
        />
        <button
          onClick={() => onRemove(photo.id)}
          className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white opacity-0 hover:bg-black/70 group-hover:opacity-100 transition-opacity"
          title="Remove photo"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex flex-col p-3 gap-3">
        {/* File Info */}
        <div className="flex justify-between items-center text-xs text-gray-500 border-b border-gray-100 pb-2">
          <span className="truncate max-w-[70%]" title={photo.name}>
            {photo.name}
          </span>
          <span>{formatFileSize(photo.size)}</span>
        </div>

        {/* Room Type Dropdown */}
        <div>
          <select
            value={photo.roomType}
            onChange={(e) => onUpdate(photo.id, "roomType", e.target.value)}
            className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="" disabled>
              Select Room...
            </option>
            {ROOM_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div>
          <input
            type="text"
            value={photo.description}
            onChange={(e) => onUpdate(photo.id, "description", e.target.value)}
            placeholder="Enter description..."
            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---

import { useEffect } from "react";

export function PhotosPage() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showUpload, setShowUpload] = useState(false); // New state for showing upload area
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [photos]);

  // -- Handlers --

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newPhotos: PhotoData[] = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file), // create temporary URL
      name: file.name,
      size: file.size,
      roomType: "",
      description: "",
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    setShowUpload(false); // Close upload area/modal after selecting files
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input so same files can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const updatePhoto = (id: string, field: keyof PhotoData, value: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const photoToRemove = prev.find((p) => p.id === id);
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.previewUrl);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  // If we have photos, we show the grid state.
  // If we have NO photos, we check showUpload state.
  //   - If false: Show "Add Photos" button.
  //   - If true: Show Dropzone.

  return (
    <div
      className="mls-photos-main flex flex-1 flex-col overflow-hidden bg-gray-50 h-full w-full"
      id="photos-main-content"
    >
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* State 1: No photos & Not showing upload -> Initial "Add Photos" Button */}
        {photos.length === 0 && !showUpload && (
          <div className="flex h-full flex-col items-center justify-center">
            <button
              onClick={() => setShowUpload(true)}
              className="rounded bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Add Photos
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Upload photos to showcase the property.
            </p>
          </div>
        )}

        {/* State 2: No photos & Showing upload -> The Dropzone (Modal-like or Full screen) */}
        {photos.length === 0 && showUpload && (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative w-full max-w-3xl">
              {/* Close button for upload mode if user changed mind */}
              <button
                onClick={() => setShowUpload(false)}
                className="absolute -top-10 right-0 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>

              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors duration-200 ${
                  isDragging
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-300 bg-white hover:border-teal-400 hover:bg-gray-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick} // Clicking anywhere opens browse
              >
                <UploadIcon />
                <h3 className="mb-2 text-xl font-semibold text-gray-900 pointer-events-none">
                  Drag and drop your files
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent double triggering if parent has click handler
                    handleBrowseClick();
                  }}
                  className="mb-4 rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500"
                >
                  Browse Photos
                </button>
                <p className="text-xs text-gray-400 pointer-events-none">
                  Select up to 9 photos. JPEG, HEIF, or HEIC
                </p>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Has Photos -> Grid + Top Bar */}
        {photos.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Photos ({photos.length})
              </h2>
              {/* This Add Photos keeps the dropzone logic, maybe sidebar or modal later, for now just open system dialog */}
              <button
                type="button"
                onClick={handleBrowseClick}
                className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Add Photos
              </button>
            </div>

            {/* Draggable Area Wrapper for adding MORE photos via drag */}
            <div
              className={`rounded-xl border-2 border-dashed p-6 transition-colors duration-200 min-h-[200px] ${
                isDragging ? "border-teal-500 bg-teal-50" : "border-transparent"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {photos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    onUpdate={updatePhoto}
                    onRemove={removePhoto}
                  />
                ))}
              </div>

              {isDragging && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-xl">
                  <p className="text-xl font-semibold text-teal-700">
                    Drop files to add
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          accept="image/jpeg,image/heic,image/heif,image/png,image/webp"
          className="hidden"
        />
      </div>
    </div>
  );
}
