import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export interface ModalProps {
  open: boolean;
  onClose: VoidFunction;
  title?: string;
  description?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  content,
  footer
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose} data-slot="modal">
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {content}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
