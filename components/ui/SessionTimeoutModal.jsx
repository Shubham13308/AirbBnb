
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SessionTimeoutModal({ open, onClose }) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    onClose();
    localStorage.removeItem("token"); 
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Timed Out</DialogTitle>
          <DialogDescription>
            Your session has expired. Please log in again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleLoginRedirect}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
