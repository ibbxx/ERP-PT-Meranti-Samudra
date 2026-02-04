import { useSession } from "@/lib/useSession";
import type { Role, Permission } from "@/types/rbac";
import { Permissions, hasActionPermission, hasMenuPermission } from "@/types/rbac";

export function usePermission() {
    const { role } = useSession();

    /**
     * Check if the current user has a specific action permission
     */
    const can = (permission: Permission): boolean => {
        if (!role) return false;
        return hasActionPermission(role as Role, permission);
    };

    /**
     * Check if the current user can access a menu
     */
    const canAccessMenu = (permission: Permission): boolean => {
        if (!role) return false;
        return hasMenuPermission(role as Role, permission);
    }

    return {
        role,
        can,
        canAccessMenu,
        // Convenience aliases for common actions
        canCreateCall: role ? hasActionPermission(role as Role, Permissions.ACTION_CALL_CREATE) : false,
        canUpdateCallStatus: role ? hasActionPermission(role as Role, Permissions.ACTION_CALL_UPDATE_STATUS) : false,
        canUploadDocs: role ? hasActionPermission(role as Role, Permissions.ACTION_DOC_UPLOAD) : false,
        canAddCost: role ? hasActionPermission(role as Role, Permissions.ACTION_COST_ADD) : false,
        canWriteReport: role ? hasActionPermission(role as Role, Permissions.ACTION_DAILY_REPORT_WRITE) : false,
        canApproveSmall: role ? hasActionPermission(role as Role, Permissions.ACTION_APPROVE_SMALL) : false,
        canApproveLarge: role ? hasActionPermission(role as Role, Permissions.ACTION_APPROVE_LARGE) : false,
    };
}
