
use tauri_plugin_store;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build()) 
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    clock_work_lib::run()
}
