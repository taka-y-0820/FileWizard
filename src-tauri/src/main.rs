use std::fs::{self, File};
use std::path::Path;
use tauri::Manager;
use serde::{Serialize, Deserialize};
use walkdir::WalkDir;

#[derive(Debug, Serialize, Deserialize)]
struct FileInfo {
    name: String,
    path: String,
    is_dir: bool,
    size: u64,
}

#[tauri::command]
fn get_files(path: String) -> Vec<FileInfo> {
    WalkDir::new(path)
        .max_depth(1)
        .into_iter()
        .filter_map(|e| e.ok())
        .map(|entry| {
            let path = entry.path();
            FileInfo {
                name: path.file_name().unwrap_or_default().to_string_lossy().into_owned(),
                path: path.to_string_lossy().into_owned(),
                is_dir: path.is_dir(),
                size: path.metadata().map(|m| m.len()).unwrap_or(0),
            }
        })
        .collect()
}

#[tauri::command]
fn create_file_or_folder(path: String, is_folder: bool) -> Result<(), String> {
    if is_folder {
        fs::create_dir_all(path).map_err(|e| e.to_string())
    } else {
        File::create(path).map_err(|e| e.to_string()).map(|_| ())
    }
}

#[tauri::command]
fn delete_file_or_folder(path: String) -> Result<(), String> {
    let path = Path::new(&path);
    if path.is_dir() {
        fs::remove_dir_all(path).map_err(|e| e.to_string())
    } else {
        fs::remove_file(path).map_err(|e| e.to_string())
    }
}

#[tauri::command]
fn rename_file_or_folder(old_path: String, new_path: String) -> Result<(), String> {
    fs::rename(old_path, new_path).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_files,
            create_file_or_folder,
            delete_file_or_folder,
            rename_file_or_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}