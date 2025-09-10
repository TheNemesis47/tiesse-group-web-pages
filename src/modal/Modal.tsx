import { useEffect, useRef, type FC, type ReactNode } from "react";

type Props = {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    /** Larghezza maggiore per testi legali */
    wide?: boolean;
};

export const Modal: FC<Props> = ({ open, title, onClose, children, wide }) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const lastActive = useRef<Element | null>(null);

    // Blocca lo scroll della pagina e gestisci ESC + Trap del focus
    useEffect(() => {
        if (!open) return;

        lastActive.current = document.activeElement;
        document.body.classList.add("modal-open"); // overflow hidden

        const dialog = dialogRef.current;
        if (dialog) {
            // Focus al dialog
            requestAnimationFrame(() => dialog.focus());
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            }
            if (e.key === "Tab") {
                // Trap del focus
                const focusable = dialog?.querySelectorAll<HTMLElement>(
                    'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
                );
                if (!focusable || focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.classList.remove("modal-open");
            // Ritorna il focus all’elemento precedente
            (lastActive.current as HTMLElement | null)?.focus?.();
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="modal-backdrop" onClick={onClose} aria-hidden="true">
            <div
                className={`modal ${wide ? "modal-wide" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                tabIndex={-1}
                ref={dialogRef}
                // Evita di chiudere cliccando dentro al contenuto
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button
                        className="modal-close"
                        type="button"
                        aria-label="Chiudi"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};
