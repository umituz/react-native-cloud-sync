/**
 * Sync Result Entity
 *
 * Represents the result of a sync operation for a single entity type
 */

export interface EntitySyncResult {
  synced: number;
  errors: string[];
}

/**
 * Complete sync result for all entities
 */
export interface SyncResult {
  success: boolean;
  results: Record<string, EntitySyncResult>;
  totalSynced: number;
  totalErrors: number;
  errors: string[];
}

/**
 * Options for sync operations
 */
export interface SyncOptions {
  /**
   * Optional error handler for sync errors
   */
  onError?: (error: Error, context: string) => void | Promise<void>;

  /**
   * Optional progress callback
   */
  onProgress?: (entityType: string, synced: number, total: number) => void;
}

