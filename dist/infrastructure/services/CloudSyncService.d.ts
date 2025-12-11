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
import type { SyncResult, EntitySyncResult, SyncOptions } from "../../domain/entities/SyncResult";
/**
 * Generic Cloud Sync Service
 *
 * Works with any entity type through adapters.
 * No app-specific code, fully reusable across hundreds of apps.
 */
export declare class CloudSyncService {
    /**
     * Sync a single entity type using its adapter
     *
     * @template T - Entity type
     * @param adapter - Sync adapter for the entity type
     * @param userId - User ID for Firebase operations
     * @param options - Optional sync options
     * @returns Sync result for this entity type
     */
    syncEntityType<T>(adapter: ISyncAdapter<T>, userId: string, options?: SyncOptions): Promise<EntitySyncResult>;
    /**
     * Sync multiple entity types in parallel
     *
     * @param adapters - Map of entity type name to adapter
     * @param userId - User ID for Firebase operations
     * @param options - Optional sync options
     * @returns Complete sync result for all entities
     */
    syncAll(adapters: Record<string, ISyncAdapter<any>>, userId: string, options?: SyncOptions): Promise<SyncResult>;
}
/**
 * Singleton instance
 */
export declare const cloudSyncService: CloudSyncService;
//# sourceMappingURL=CloudSyncService.d.ts.map