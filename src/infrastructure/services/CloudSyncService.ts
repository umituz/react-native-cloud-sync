/**
 * Cloud Sync Service
 *
 * Generic cloud sync service that works with any entity type via adapters.
 * Follows SOLID, DRY, KISS principles - no god class, no code duplication.
 *
 * Architecture:
 * - Uses adapter pattern for entity-specific logic
 * - Generic sync algorithm works with any adapter
 * - Single Responsibility: Only handles sync orchestration
 * - Open/Closed: Add new entities by creating adapters, no service modification
 */

import type { ISyncAdapter } from "../../domain/interfaces/ISyncAdapter";
import type {
  SyncResult,
  EntitySyncResult,
  SyncOptions,
} from "../../domain/entities/SyncResult";

/**
 * Generic Cloud Sync Service
 *
 * Works with any entity type through adapters.
 * No app-specific code, fully reusable across hundreds of apps.
 */
export class CloudSyncService {
  /**
   * Sync a single entity type using its adapter
   *
   * @template T - Entity type
   * @param adapter - Sync adapter for the entity type
   * @param userId - User ID for Firebase operations
   * @param options - Optional sync options
   * @returns Sync result for this entity type
   */
  async syncEntityType<T>(
    adapter: ISyncAdapter<T>,
    userId: string,
    options?: SyncOptions,
  ): Promise<EntitySyncResult> {
    const result: EntitySyncResult = {
      synced: 0,
      errors: [],
    };

    try {
      // Get local items
      const localItems = await adapter.getAllLocal();

      // Get existing Firebase items
      let firebaseItems: T[] = [];
      try {
        firebaseItems = await adapter.getAllFirebase(userId);
      } catch (error) {
        // No existing Firebase items (first sync) - continue
      }

      // Sync each item
      const total = localItems.length;
      for (let i = 0; i < localItems.length; i++) {
        const item = localItems[i];

        try {
          const exists = adapter.existsInFirebase(item, firebaseItems);

          if (exists) {
            await adapter.updateInFirebase(userId, item);
          } else {
            await adapter.createInFirebase(userId, item);
          }

          result.synced++;

          // Progress callback
          if (options?.onProgress) {
            options.onProgress(adapter.getSyncContext(), result.synced, total);
          }
        } catch (error: any) {
          const errorMsg = `Failed to sync ${adapter.getItemDisplayName(item)}: ${error.message}`;
          result.errors.push(errorMsg);

          // Error callback
          if (options?.onError) {
            const syncError = error instanceof Error ? error : new Error(errorMsg);
            await options.onError(syncError, adapter.getSyncContext());
          }
        }
      }
    } catch (error: any) {
      const errorMsg = `Failed to load local ${adapter.getSyncContext()}: ${error.message}`;
      result.errors.push(errorMsg);

      if (options?.onError) {
        const syncError = error instanceof Error ? error : new Error(errorMsg);
        await options.onError(syncError, adapter.getSyncContext());
      }
    }

    return result;
  }

  /**
   * Sync multiple entity types in parallel
   *
   * @param adapters - Map of entity type name to adapter
   * @param userId - User ID for Firebase operations
   * @param options - Optional sync options
   * @returns Complete sync result for all entities
   */
  async syncAll(
    adapters: Record<string, ISyncAdapter<any>>,
    userId: string,
    options?: SyncOptions,
  ): Promise<SyncResult> {
    const result: SyncResult = {
      success: true,
      results: {},
      totalSynced: 0,
      totalErrors: 0,
      errors: [],
    };

    // Sync all entity types in parallel
    const syncPromises = Object.entries(adapters).map(
      async ([entityType, adapter]) => {
        const entityResult = await this.syncEntityType(adapter, userId, options);
        result.results[entityType] = entityResult;
        result.totalSynced += entityResult.synced;
        result.totalErrors += entityResult.errors.length;
        result.errors.push(...entityResult.errors);
      },
    );

    await Promise.all(syncPromises);

    result.success = result.totalErrors === 0;

    return result;
  }
}

/**
 * Singleton instance
 */
export const cloudSyncService = new CloudSyncService();

