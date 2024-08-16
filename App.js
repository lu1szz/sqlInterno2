import { SQLiteProvider } from 'expo-sqlite';
import { IniciarBD } from './databases/iniciarbd';
import { Index } from './index';


export default function App() {
  return (
    <SQLiteProvider databaseName="meusDados.db" onInit={IniciarBD}>
      <Index />
    </SQLiteProvider>
  );
};