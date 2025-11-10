# @umituz/react-native-cloud-sync

Generic cloud sync service for React Native apps with Firebase Firestore support. Follows SOLID, DRY, KISS principles - no god class, fully reusable across hundreds of apps.

## Features

- ✅ **Generic & Reusable**: Works with any entity type via adapters
- ✅ **SOLID Principles**: Single Responsibility, Open/Closed, Interface Segregation
- ✅ **DRY**: No code duplication, generic sync algorithm
- ✅ **KISS**: Simple interface, easy to understand and use
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Parallel Sync**: Sync multiple entity types simultaneously
- ✅ **Error Handling**: Comprehensive error handling with callbacks
- ✅ **Progress Tracking**: Optional progress callbacks

## Installation

```bash
npm install @umituz/react-native-cloud-sync
```

## Usage

### 1. Create Sync Adapter for Your Entity

```typescript
import { ISyncAdapter } from '@umituz/react-native-cloud-sync';
import type { Challenge } from '@/types/photo_quest';

class ChallengeSyncAdapter implements ISyncAdapter<Challenge> {
  async getAllLocal(): Promise<Challenge[]> {
    return ChallengeStorage.getAll();
  }

  async getAllFirebase(userId: string): Promise<Challenge[]> {
    return challengeRepository.getAll(userId);
  }

  existsInFirebase(item: Challenge, firebaseItems: Challenge[]): boolean {
    return firebaseItems.some((fc) => fc.id === item.id);
  }

  getItemId(item: Challenge): string {
    return item.id;
  }

  getItemDisplayName(item: Challenge): string {
    return `challenge "${item.title}"`;
  }

  async createInFirebase(userId: string, item: Challenge): Promise<void> {
    await challengeRepository.create(userId, item);
  }

  async updateInFirebase(userId: string, item: Challenge): Promise<void> {
    await challengeRepository.update(userId, item.id, item);
  }

  getSyncContext(): string {
    return 'ChallengeSyncAdapter';
  }
}
```

### 2. Sync Single Entity Type

```typescript
import { cloudSyncService } from '@umituz/react-native-cloud-sync';

const adapter = new ChallengeSyncAdapter();
const result = await cloudSyncService.syncEntityType(adapter, userId);

console.log(`Synced: ${result.synced}, Errors: ${result.errors.length}`);
```

### 3. Sync Multiple Entity Types

```typescript
import { cloudSyncService } from '@umituz/react-native-cloud-sync';

const result = await cloudSyncService.syncAll(
  {
    challenges: new ChallengeSyncAdapter(),
    photos: new PhotoSyncAdapter(),
    achievements: new AchievementSyncAdapter(),
  },
  userId,
  {
    onError: (error, context) => {
      console.error(`Sync error in ${context}:`, error);
    },
    onProgress: (entityType, synced, total) => {
      console.log(`${entityType}: ${synced}/${total}`);
    },
  }
);

console.log(`Total synced: ${result.totalSynced}`);
console.log(`Total errors: ${result.totalErrors}`);
console.log(`Success: ${result.success}`);
```

## API Reference

### `ISyncAdapter<T>`

Interface that must be implemented for each entity type.

```typescript
interface ISyncAdapter<T> {
  getAllLocal(): Promise<T[]>;
  getAllFirebase(userId: string): Promise<T[]>;
  existsInFirebase(item: T, firebaseItems: T[]): boolean;
  getItemId(item: T): string;
  getItemDisplayName(item: T): string;
  createInFirebase(userId: string, item: T): Promise<void>;
  updateInFirebase(userId: string, item: T): Promise<void>;
  getSyncContext(): string;
}
```

### `CloudSyncService`

Main service class for sync operations.

#### `syncEntityType<T>(adapter, userId, options?)`

Sync a single entity type.

#### `syncAll(adapters, userId, options?)`

Sync multiple entity types in parallel.

### `SyncOptions`

Optional configuration for sync operations.

```typescript
interface SyncOptions {
  onError?: (error: Error, context: string) => void | Promise<void>;
  onProgress?: (entityType: string, synced: number, total: number) => void;
}
```

## Architecture

- **Domain Layer**: Interfaces and entities (business logic)
- **Infrastructure Layer**: Service implementation (sync orchestration)

No app-specific code, fully generic and reusable.

## License

MIT

