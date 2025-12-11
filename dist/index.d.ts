/**
 * React Native Cloud Sync - Public API
 *
 * Generic cloud sync service for React Native apps with Firebase Firestore support.
 * Follows SOLID, DRY, KISS principles - no god class, fully reusable.
 *
 * Architecture:
 * - Domain: Interfaces and entities (business logic)
 * - Infrastructure: Service implementation (sync orchestration)
 *
 * Usage:
 *   import { CloudSyncService, ISyncAdapter } from '@umituz/react-native-cloud-sync';
 *
 *   // Create adapter for your entity type
 *   class MyEntityAdapter implements ISyncAdapter<MyEntity> { ... }
 *
 *   // Sync single entity type
 *   const result = await cloudSyncService.syncEntityType(adapter, userId);
 *
 *   // Sync multiple entity types
 *   const result = await cloudSyncService.syncAll({
 *     challenges: challengeAdapter,
 *     photos: photoAdapter,
 *   }, userId);
 */
export type { ISyncAdapter } from "./domain/interfaces/ISyncAdapter";
export type { SyncResult, EntitySyncResult, SyncOptions, } from "./domain/entities/SyncResult";
export { CloudSyncService, cloudSyncService, } from "./infrastructure/services/CloudSyncService";
//# sourceMappingURL=index.d.ts.map