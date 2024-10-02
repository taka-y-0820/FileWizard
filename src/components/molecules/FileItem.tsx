import { Text } from "../atoms/Text";
import {
  FolderIcon,
  DocumentIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

interface FileItemProps {
  name: string;
  isDirectory: boolean;
  size: string;
  onClick: () => void;
}

function getFileIcon(name: string, isDirectory: boolean) {
  if (isDirectory) return FolderIcon;

  const extension = name.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return PhotoIcon;
    case "mp4":
    case "avi":
    case "mov":
      return FilmIcon;
    case "mp3":
    case "wav":
    case "ogg":
      return MusicalNoteIcon;
    case "js":
    case "ts":
    case "py":
    case "html":
    case "css":
      return CodeBracketIcon;
    case "zip":
    case "rar":
    case "7z":
      return ArchiveBoxIcon;
    default:
      return DocumentIcon;
  }
}

export function FileItem({ name, isDirectory, size, onClick }: FileItemProps) {
  const Icon = getFileIcon(name, isDirectory);

  return (
    <div
      className="p-1.5 border rounded hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
      onClick={onClick}
    >
      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <div className="flex-grow min-w-0 flex flex-col">
        <Text className="text-sm font-medium truncate">{name}</Text>
        <Text className="text-xs text-gray-500">
          {isDirectory ? "Directory" : size}
        </Text>
      </div>
    </div>
  );
}
