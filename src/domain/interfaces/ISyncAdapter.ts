/**
 * Sync Adapter Interface
 *
 * SOLID Principles:
 * - Single Responsibility: Each adapter handles one entity type
 * - Interface Segregation: Minimal interface for sync operations
 * - Open/Closed: Easy to add new entity types without modifying existing code
 *
 * DRY: Generic sync logic in CloudSyncService, entity-specific logic in adapters
 * KISS: Simple interface with clear responsibilities
 */

/**
 * Generic Sync Adapter Interface
 * Each entity type implements this interface for sync operations
 *
 * @template T - The entity type to sync
 */
export interface ISyncAdapter<T> {
  /**
   * Get all local items
   */
  getAllLocal(): Promise<T[]>;

  /**
   * Get all Firebase items for a user
   */
  getAllFirebase(userId: string): Promise<T[]>;

  /**
   * Check if item exists in Firebase (by ID)
   */
  existsInFirebase(item: T, firebaseItems: T[]): boolean;

  /**
   * Get unique identifier for item comparison
   */
  getItemId(item: T): string;

  /**
   * Get display name for error messages
   */
  getItemDisplayName(item: T): string;

  /**
   * Create item in Firebase
   */
  createInFirebase(userId: string, item: T): Promise<void>;

  /**
   * Update item in Firebase
   */
  updateInFirebase(userId: string, item: T): Promise<void>;

  /**
   * Sync context name for error logging
   */
  getSyncContext(): string;
}

