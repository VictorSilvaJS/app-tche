import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = 'tche_offline_queue';

export interface OfflineOperation {
  id: string; // uuid
  type: string; // e.g. 'CREATE_SAMPLE'
  payload: any;
  createdAt: number;
}

export async function enqueue(op: OfflineOperation) {
  const list = await getQueue();
  list.push(op);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(list));
}

export async function getQueue(): Promise<OfflineOperation[]> {
  const raw = await AsyncStorage.getItem(QUEUE_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export async function clearQueue() {
  await AsyncStorage.removeItem(QUEUE_KEY);
}

export async function flushQueue(processor: (op: OfflineOperation) => Promise<void>) {
  const list = await getQueue();
  const remaining: OfflineOperation[] = [];
  for (const op of list) {
    try {
      await processor(op);
    } catch {
      remaining.push(op); // mantém se falha
    }
  }
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
}