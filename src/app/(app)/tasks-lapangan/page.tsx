"use client";

import { useState } from "react";
import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import Modal from "@/components/Modal";
import { useTasks } from "@/hooks/useTasks";
import type { FieldTask } from "@/hooks/useTasks";
import { usePermission } from "@/hooks/usePermission";
import { Permissions } from "@/types/rbac";

export default function Page() {
  const { tasks, updateTask } = useTasks();
  const { can } = usePermission();
  const [modal, setModal] = useState<{ open: boolean; task: FieldTask | null }>({
    open: false,
    task: null
  });

  const canUpdate = can(Permissions.ACTION_TASK_STATUS_UPDATE);

  const handleStatusUpdate = (status: FieldTask["status"]) => {
    if (!modal.task) return;
    updateTask({ ...modal.task, status });
    setModal({ open: false, task: null });
  };

  return (
    <AccessGate permission={Permissions.MENU_TASKS_LAPANGAN}>
      <PageShell
        title="Tasks Lapangan"
        description="Daily field assignments and status tracking."
        chips={
          <div className="flex gap-2">
            <Badge tone="info">Field Support</Badge>
            <Badge tone="neutral">Queue: {tasks.filter(t => t.status !== "COMPLETED").length}</Badge>
          </div>
        }
      >
        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink mb-6">Assigned Tasks</h2>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-wrap items-center justify-between rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold text-ink">{task.title}</div>
                    <Badge tone={task.priority === "HIGH" ? "danger" : "neutral"}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-ink/70">{task.description}</div>
                  <div className="text-xs text-ink/40">
                    Due: {task.dueDate} · {task.location}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <Badge tone={
                    task.status === "COMPLETED" ? "success" :
                      task.status === "IN_PROGRESS" ? "info" : "warning"
                  }>
                    {task.status.replace("_", " ")}
                  </Badge>

                  {task.status !== "COMPLETED" && (
                    <button
                      className="btn-secondary text-xs"
                      onClick={() => setModal({ open: true, task })}
                      disabled={!canUpdate}
                      title={!canUpdate ? "No permission" : ""}
                    >
                      Update Status
                    </button>
                  )}
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center p-8 text-ink/50 bg-ink/5 rounded-2xl">
                No field tasks assigned.
              </div>
            )}
          </div>
        </Card>

        {/* Status Update Modal */}
        <Modal
          open={modal.open && modal.task !== null}
          title="Update Task Status"
          onClose={() => setModal({ open: false, task: null })}
          actions={
            <button className="btn-secondary" onClick={() => setModal({ open: false, task: null })}>
              Cancel
            </button>
          }
        >
          <p className="text-ink/80 mb-4">
            Change status for <strong>{modal.task?.title}</strong>:
          </p>
          <div className="flex gap-3">
            <button
              className="btn-primary w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handleStatusUpdate("IN_PROGRESS")}
            >
              In Progress
            </button>
            <button
              className="btn-primary w-full bg-green-600 hover:bg-green-700"
              onClick={() => handleStatusUpdate("COMPLETED")}
            >
              Mark Completed
            </button>
          </div>
        </Modal>

      </PageShell>
    </AccessGate>
  );
}
