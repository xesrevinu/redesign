import { invoke } from '@tauri-apps/api/tauri';

import NxWelcome from './nx-welcome';

export function App() {
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const result = await invoke('greet', { name: 'World' });

    console.log(result);
  }

  return (
    <>
      <button type="button" onClick={() => greet()}>
        Greet
      </button>
      <div />
    </>
  );
}

export default App;
