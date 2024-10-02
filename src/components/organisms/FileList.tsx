import { FileItem } from "../molecules/FileItem";
import { Button } from "../atoms/Button";

interface FileInfo {
  name: string;
  path: string;
  is_dir: boolean;
  size: number;
}

interface FileListProps {
  files: FileInfo[];
  onFileClick: (file: FileInfo) => void;
  onDeleteClick: (path: string) => void;
  onRenameClick: (file: FileInfo) => void;
  formatSize: (size: number) => string;
}

export function FileList({
  files,
  onFileClick,
  onDeleteClick,
  onRenameClick,
  formatSize,
}: FileListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <div key={file.path} className="border rounded p-4">
          <FileItem
            name={file.name}
            isDirectory={file.is_dir}
            size={formatSize(file.size)}
            onClick={() => onFileClick(file)}
          />
          <div className="mt-2 flex justify-end space-x-2">
            <Button onClick={() => onDeleteClick(file.path)}>Delete</Button>
            <Button onClick={() => onRenameClick(file)}>Rename</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
