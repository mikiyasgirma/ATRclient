import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useStore } from "../store/store";
import Lottie from "react-lottie";
import successAnimation from "../lotties/sucess_animation.json";
import failedAnimation from "../lotties/failed_animation.json";

export function CustomToast() {
  const { showToast, toggleToast, toastMessage, toastType } = useStore(
    (state) => state
  );
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: toastType == "SUCCESS" ? successAnimation : failedAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Dialog open={showToast} onOpenChange={() => toggleToast("", toastType)}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <div className="text-center">
              <Lottie options={defaultOptions} height={248} width={248} />
              <p
                className={`${
                  toastType == "SUCCESS" ? "text-primary" : "text-red-500"
                }  font-bold text-[24px]`}
              >
                {toastMessage}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
