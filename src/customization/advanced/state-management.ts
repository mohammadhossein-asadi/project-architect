import { TemplateConfig } from '../../types';

export interface StateManagementOptions {
  type: 'redux' | 'mobx' | 'zustand' | 'recoil' | 'jotai';
  persist?: boolean;
  devtools?: boolean;
}

export const configureStateManagement = async (
  template: TemplateConfig,
  options: StateManagementOptions
): Promise<TemplateConfig> => {
  const newTemplate = { ...template };

  switch (options.type) {
    case 'redux':
      newTemplate.dependencies = {
        ...newTemplate.dependencies,
        '@reduxjs/toolkit': '^1.9.5',
        'react-redux': '^8.1.2',
      };
      if (options.persist) {
        newTemplate.dependencies['redux-persist'] = '^6.0.0';
      }
      break;

    case 'mobx':
      newTemplate.dependencies = {
        ...newTemplate.dependencies,
        'mobx': '^6.10.0',
        'mobx-react-lite': '^4.0.3',
      };
      break;

    case 'zustand':
      newTemplate.dependencies = {
        ...newTemplate.dependencies,
        'zustand': '^4.4.1',
      };
      if (options.persist) {
        newTemplate.dependencies['zustand/middleware'] = '^4.4.1';
      }
      break;

    case 'recoil':
      newTemplate.dependencies = {
        ...newTemplate.dependencies,
        'recoil': '^0.7.7',
      };
      break;

    case 'jotai':
      newTemplate.dependencies = {
        ...newTemplate.dependencies,
        'jotai': '^2.3.1',
      };
      break;
  }

  // Add example store setup
  if (options.type === 'redux') {
    newTemplate.files.push({
      path: 'src/store/index.ts',
      content: `import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice';
${options.persist ? "import { persistStore, persistReducer } from 'redux-persist';" : ''}
${options.persist ? "import storage from 'redux-persist/lib/storage';" : ''}

${options.persist ? `
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, counterSlice.reducer);
` : ''}

export const store = configureStore({
  reducer: {
    counter: ${options.persist ? 'persistedReducer' : 'counterSlice.reducer'},
  },
  ${options.devtools ? 'devTools: true' : 'devTools: false'},
});

${options.persist ? 'export const persistor = persistStore(store);' : ''}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`
    });
  }

  return newTemplate;
};