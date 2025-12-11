"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudSyncService = exports.CloudSyncService = void 0;
// =============================================================================
// INFRASTRUCTURE LAYER - Services
// =============================================================================
var CloudSyncService_1 = require("./infrastructure/services/CloudSyncService");
Object.defineProperty(exports, "CloudSyncService", { enumerable: true, get: function () { return CloudSyncService_1.CloudSyncService; } });
Object.defineProperty(exports, "cloudSyncService", { enumerable: true, get: function () { return CloudSyncService_1.cloudSyncService; } });
//# sourceMappingURL=index.js.map