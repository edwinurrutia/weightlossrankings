"use client";

interface FormActionsProps {
  onSave?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  saving?: boolean;
  deleting?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
  deleteLabel?: string;
  error?: string | null;
  message?: string | null;
}

export default function FormActions({
  onSave,
  onCancel,
  onDelete,
  saving,
  deleting,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  deleteLabel = "Delete",
  error,
  message,
}: FormActionsProps) {
  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </div>
      )}
      {message && !error && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {message}
        </div>
      )}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={saving || deleting}
              className="inline-flex items-center rounded-lg bg-brand-gradient px-4 py-2 text-sm font-bold text-white shadow-sm disabled:opacity-50"
            >
              {saving ? "Saving…" : saveLabel}
            </button>
          )}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={saving || deleting}
              className="inline-flex items-center rounded-lg border border-brand-violet/15 bg-white px-4 py-2 text-sm font-semibold text-brand-text-primary hover:bg-brand-violet/5 disabled:opacity-50"
            >
              {cancelLabel}
            </button>
          )}
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={saving || deleting}
            className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
          >
            {deleting ? "Deleting…" : deleteLabel}
          </button>
        )}
      </div>
    </div>
  );
}
