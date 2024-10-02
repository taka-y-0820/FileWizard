import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Layout } from "./components/templates/Layout";
import { Subtitle } from "./components/atoms/Text";
import { Input } from "./components/molecules/Input";
import { FileList } from "./components/organisms/FileList";
import { Button } from "./components/atoms/Button";
import { Dialog } from "./components/molecules/Dialog";

interface FileInfo {
  name: string;
  path: string;
  is_dir: boolean;
  size: number;
}

function getParentPath(path: string): string {
  const parts = path.split("/");
  if (parts.length > 1) {
    parts.pop();
    return parts.join("/") || "/";
  }
  return "/";
}

export default function App() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [currentPath, setCurrentPath] = useState("/");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);

  useEffect(() => {
    loadFiles(currentPath);
  }, [currentPath]);

  const loadFiles = async (path: string) => {
    try {
      const result = await invoke<FileInfo[]>("get_files", { path });
      setFiles(result);
    } catch (error) {
      console.error("Error loading files:", error);
    }
  };

  const formatSize = (size: number) => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
  };

  const handleFileClick = (file: FileInfo) => {
    if (file.is_dir) {
      setCurrentPath(file.path);
    } else {
      setSelectedFile(file);
    }
  };

  const handleCreateItem = async (isFolder: boolean) => {
    if (newItemName) {
      const newPath = `${currentPath}/${newItemName}`;
      try {
        await invoke("create_file_or_folder", { path: newPath, isFolder });
        loadFiles(currentPath);
        setIsCreateDialogOpen(false);
        setNewItemName("");
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
  };

  const handleDeleteItem = async (path: string) => {
    try {
      await invoke("delete_file_or_folder", { path });
      loadFiles(currentPath);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleRenameItem = async () => {
    if (selectedFile && newItemName) {
      const newPath = `${currentPath}/${newItemName}`;
      try {
        await invoke("rename_file_or_folder", {
          oldPath: selectedFile.path,
          newPath,
        });
        loadFiles(currentPath);
        setIsRenameDialogOpen(false);
        setNewItemName("");
        setSelectedFile(null);
      } catch (error) {
        console.error("Error renaming item:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Subtitle>Current Directory: {currentPath}</Subtitle>
        <div className="flex space-x-4">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Create New
          </Button>
          <Button onClick={() => setCurrentPath(getParentPath(currentPath))}>
            Go Up
          </Button>
        </div>
        <FileList
          files={files}
          onFileClick={handleFileClick}
          onDeleteClick={handleDeleteItem}
          onRenameClick={(file) => {
            setSelectedFile(file);
            setIsRenameDialogOpen(true);
          }}
          formatSize={formatSize}
        />
      </div>

      <Dialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        title="Create New Item"
      >
        <Input
          value={newItemName}
          onChange={setNewItemName}
          placeholder="Enter name"
          className="mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={() => handleCreateItem(false)}>Create File</Button>
          <Button onClick={() => handleCreateItem(true)}>Create Folder</Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
        title="Rename Item"
      >
        <Input
          value={newItemName}
          onChange={setNewItemName}
          placeholder="Enter new name"
          className="mb-4"
        />
        <div className="flex justify-end">
          <Button onClick={handleRenameItem}>Rename</Button>
        </div>
      </Dialog>
    </Layout>
  );
}
