import { useState, useEffect, useRef, ReactNode } from 'react';
import { AlertTriangle, Loader2, X } from 'lucide-react';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (inputValue?: string) => Promise<void> | void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
  input?: {
    label: string;
    placeholder?: string;
    required?: boolean;
    matchValue?: string;
    matchHint?: string;
  };
}

const variantStyles = {
  danger: {
    icon: 'bg-red-100 text-red-600',
    button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  },
  warning: {
    icon: 'bg-amber-100 text-amber-600',
    button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
  },
  default: {
    icon: 'bg-green-100 text-green-600',
    button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  },
};

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  input,
}: ConfirmModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const style = variantStyles[variant];

  useEffect(() => {
    if (open) {
      setInputValue('');
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, loading, onClose]);

  if (!open) return null;

  const canConfirm = !input?.required || inputValue.trim().length > 0;
  const matchValid = !input?.matchValue || inputValue === input.matchValue;

  const handleConfirm = async () => {
    if (!canConfirm || !matchValid) return;
    setLoading(true);
    try {
      await onConfirm(inputValue);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {variant !== 'default' && (
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${style.icon}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              {description && (
                <div className="mt-2 text-sm text-gray-600">{description}</div>
              )}
            </div>
          </div>

          {input && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {input.label}
              </label>
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={input.placeholder}
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canConfirm && matchValid) handleConfirm();
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm disabled:opacity-50 disabled:bg-gray-50"
              />
              {input.matchHint && (
                <p className="mt-1.5 text-xs text-gray-500">{input.matchHint}</p>
              )}
              {input.matchValue && inputValue.length > 0 && !matchValid && (
                <p className="mt-1.5 text-xs text-red-500">
                  Input does not match. Please type "{input.matchValue}" exactly.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !canConfirm || !matchValid}
            className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${style.button}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
