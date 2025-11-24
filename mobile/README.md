# App Mobile - Tchê Fertilidade

## Objetivo
Aplicativo de campo para coleta de amostras, visualização básica de propriedades e autenticação. MVP inicial com login, registro e navegação.

## Stack
- Expo (React Native)
- TypeScript
- React Navigation
- Axios
- AsyncStorage (tokens / sessão)

## Estrutura
```
mobile/
  App.tsx
  package.json
  tsconfig.json
  app.json
  src/
    navigation/
      RootNavigator.tsx
      auth/AuthStack.tsx
      tabs/MainTabs.tsx
    screens/
      LoginScreen.tsx
      RegisterScreen.tsx
      DashboardScreen.tsx
      PropertiesScreen.tsx
    api/
      client.ts
    storage/
      authContext.tsx
      token.ts
    theme/
      colors.ts
    domain/ (futuro: tipos e lógica)
```

## Execução (Windows PowerShell)
```powershell
cd mobile
npm install -g expo-cli # se necessário
npm install
npm start
```
Escolha a plataforma pelo menu (web para teste rápido). Para Android use Expo Go ou emulador.

## Próximos Passos
1. Consumir endpoints reais de propriedades.
2. Adicionar tela de detalhes da propriedade.
3. Definir cache offline básico (fila de criação de amostras).
4. Integração com mapa (talhões) posteriormente.

## Variáveis
Alterar `baseURL` em `src/api/client.ts` conforme ambiente.

## Offline (Planejado)
- Estratégia: fila de operações (create sample) armazenada em AsyncStorage; sincronização quando online.

## Segurança
- Token JWT armazenado apenas em AsyncStorage (MVP). Futuro: Refresh token + proteção a replay.

